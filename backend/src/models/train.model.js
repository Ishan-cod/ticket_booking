import mongoose, { Schema } from "mongoose";


const trainschema = new Schema(
  {
    trainname: {
      type: String,
      required: true,
    },
    trainnumber: {
      type: String,
      required: true,
      unique: true,
    },
    traintype: {
      type: String,
      required: true,
    },
    start: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stations",
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stations",
      required: true,
    },
    route: [
      {
        stationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "stations",
        },
        arrivalTime: {
          type: String, //18:01
          required: true,
        },
        departureTime: {
          type: String,//15:08
          required: true,
        },
      },
      
    ],
  },
  {
    timestamps: true,
  }
);

export const Train = mongoose.model("Train", trainschema);
