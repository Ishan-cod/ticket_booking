import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessTokenRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new ApiError(500, "Cannot get the user");

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  // console.log("Access Token generated : \n",accessToken);
  // console.log("\n");

  // console.log("refresh Token \n", refreshToken);

  if (!accessToken || !refreshToken)
    throw new ApiError(500, "Internal server error Token cannot be generated");

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// ********* Registering user (normal user) *********

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, password, phonenumber } = req.body;

  if ([username, fullname, password].some((field) => field?.trim() === ""))
    throw new ApiError(400, "All fields require");

  if (!phonenumber) throw new ApiError(400, "Phone number not provided");

  const existedUser = await User.findOne({
    username: username,
  });

  if (existedUser) throw new ApiError(400, "User already exist");

  const avatarLocalFilePath = req.files?.avatar[0].path;

  if (!avatarLocalFilePath) throw new Error("Avatar local path not fetched");

  const avatar = await uploadOnCloudinary(avatarLocalFilePath);

  if (avatar) console.log("File uploaded successfully on cloudinary");
  else {
    throw new ApiError(500, "File upload unsuccessfull");
  }

  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    isAdmin: false,
    avatar: avatar.url,
    password,
    phonenumber,
  });

  const createdUser = await User.findOne({
    username: username,
  }).select("-password");

  if (!createdUser) throw new ApiError(500, "Error while creating User");

  res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", createdUser));
});

// *************** Register admin *************
const registerAdmin = asyncHandler(async (req, res) => {
  const { username, fullname, password, phonenumber } = req.body;

  if ([username, fullname, password].some((field) => field?.trim() === ""))
    throw new ApiError(400, "All fields require");

  if (!phonenumber) throw new ApiError(400, "Phone number not provided");

  const existedUser = await User.findOne({
    username: username,
  });

  if (existedUser) throw new ApiError(400, "User already exist");

  const avatarLocalFilePath = req.files?.avatar[0].path;

  if (!avatarLocalFilePath) throw new Error("Avatar local path not fetched");

  const avatar = await uploadOnCloudinary(avatarLocalFilePath);

  if (avatar) console.log("File uploaded successfully on cloudinary");
  else {
    throw new ApiError(500, "File upload unsuccessfull");
  }

  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    isAdmin: true,
    avatar: avatar.url,
    password,
    phonenumber,
  });

  const createdUser = await User.findOne({
    username: username,
  }).select("-password");

  if (!createdUser) throw new ApiError(500, "Error while creating User");

  res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", createdUser));
});

// *********** Login user *************
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username: username,
  });

  if (!user) throw new ApiError(402, "User donot exist in database");

  const passwordCheck = user.isPasswordCorrect(password);

  if (!passwordCheck) throw new ApiError(401, "Unauthorized access");

  const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(
    user._id
  );

  // console.log("Access Token generated : \n",accessToken);
  // console.log("\n");

  // console.log("refresh Token \n", refreshToken);

  const options = {
    httpOnly: true,
    secure: true,
  };

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "User Logged in successfully",
      data: { loggedInUser },
    });
});

// ****** LOGOUT USER *********
const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookie
});

// Tester API fetcher
const APICALLS = asyncHandler(async (req, res) => {
  try {
    const response = await fetch("https://api.github.com/users/Ishan-cod");
    const data = await response.json();
    res.json(data); // Send data to frontend
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

export { APICALLS, registerUser, loginUser, registerAdmin };
