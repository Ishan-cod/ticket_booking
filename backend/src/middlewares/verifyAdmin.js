import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const verifyAdmin = asyncHandler(async (req, res, next) => {
  const accesstoken = req.cookies.accessToken;
  if (!accesstoken)
    throw new ApiError(401, "Unauthorized access, Please Relogin");

  const decodedToken = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET);

  if (!decodedToken)
    throw new ApiError(500, "Interval server error, Token undecoded");

  const userID = decodedToken._id;
  const user = await User.findById(userID);
  if (!user.isAdmin) throw new ApiError(403, "Admin access denied");

  req.body.userid = userID;
  next();
});

export { verifyAdmin };
