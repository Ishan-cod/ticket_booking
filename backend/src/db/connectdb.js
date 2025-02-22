import mongoose from "mongoose";
export const connectDB = async function(){
    try {

        const db = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(db.connections);
        

    } catch (error) {
       throw error.message
        
    }
}