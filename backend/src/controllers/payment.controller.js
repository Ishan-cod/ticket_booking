import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/ApiError.js"
import { Payment } from "../models/payment.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const ShowPaymentdetails = asyncHandler(async (req,res) => {

    // Problem frontend will not send the username to get payment detail else user can get any username payment detail --> FIX it 

    const username = req.body;
    
    if(!username)
        throw new ApiError(400, "Username Required")


    
    const userId = await User.findOne({
        username:username
    })

    if(!userId)
        throw new ApiError(400, "User donot exists")

    const paymentDetail = await Payment.find({
        paymentUser:userId
    })

    if(!paymentDetail)
        throw new ApiError(400, "Payment cannot be fetched ")

    if(paymentDetail.size() == 0)
        throw new ApiResponse(200, "User has zero purchases")

    const numberOfPayments = paymentDetail.size()

    throw new ApiResponse(200, `Number of payment found ${numberOfPayments}`, paymentDetail)

})



export {ShowPaymentdetails}