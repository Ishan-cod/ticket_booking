import { configDotenv } from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./src/db/connectdb.js";

configDotenv({
  path: "./env",
});


connectDB()
.then(() => {
  app
    .listen(process.env.PORT, () => {
      console.log(`Server listening on http://localhost:${process.env.PORT} `);
    })
    
})
.catch((error) => {
  console.log("MONGODB connection error");
  console.log(error);
  
  
})
