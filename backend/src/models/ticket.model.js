import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema({
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "trains",
    required: true,
  },
  berth:{
    type:String,
    required:true
  },
  quota:{
    type:String,
    required:true
  },
  foodOpt:{
    type:Boolean,
    required:true
  }
},{timestamps:true});


export const Ticket = mongoose.model("Ticket", ticketSchema);
