import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import bcrypt from "bcryptjs"




const registerUser = asyncHandler(async (req , res) => {
    const {fullname,username,password,phonenumber} = req.body
    
    if(!fullname || !username || !password || !phonenumber)
        throw new ApiError(400, "All authentications required")


    


    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = await User.create({
        fullname : fullname,
        username : username,
        password : hashedPassword,
    })
    

    


})