import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/database_connection.js";

dotenv.config({
    path : "../env"
})

const PORT = process.env.PORT || 8002

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER is listening on http://localhost:${PORT}`);
        
    })
})