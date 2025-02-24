import mongoose,{Schema} from "mongoose";

const seatAvailabilitySchema = new Schema({
    trainDetail:{
        type:mongoose.Schema.Types.ObjectId,
        ref:trains,
        required:true
    },
    stationDetail:{
        type:mongoose.Schema.Types.ObjectId,
        ref:stations,
        required:true
    },
    seatAvailable:{
        type:Number,
        required:true
    }
})


export const Seat = mongoose.model("Seat", seatAvailabilitySchema);