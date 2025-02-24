import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI)

        console.log(`MONGO_DB connected successfully \n ${connectionInstance.connection.host}`);
        
    } catch (error) {
        throw new ApiError(500, "DATABASE connection failed", [{error}])
    }
}



export default connectDB