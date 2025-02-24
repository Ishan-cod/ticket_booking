import mongoose, {Schema} from "mongoose";

const paymentSchema = new Schema({
    paymentUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    ticketDetail:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"ticket",
        required: true
    },
    amount:{
        type:String,
        required:true,
    }
},{timestamps:true})


export const Payment = mongoose.model("Payment", paymentSchema)