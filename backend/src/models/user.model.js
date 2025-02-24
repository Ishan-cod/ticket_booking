import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phonenumber: {
      type: String,
      required: true,
    },
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tickets",
        default: [],
      },
    ],
    payment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payments",
        default: [],
      },
    ],
    refreshToken: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
