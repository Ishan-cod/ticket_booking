import mongoose,{Schema} from "mongoose";

const stationSchema = new Schema({
    stationName:{
        type:String,
        required: true,
        trim: true
    },
    stationCode:{
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    }
},{timestamps:true})



export const Station = mongoose.model("Station", stationSchema); 