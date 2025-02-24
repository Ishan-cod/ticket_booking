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
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    route: [
      {
        stationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "stations",
        },
        arrivalTime: {
          type: String,
          required: true,
        },
        departureTime: {
          type: String,
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
