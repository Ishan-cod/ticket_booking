import express from "express"
import cors from "cors"
import cookieParser from "cookie-Parser"
const app = express()

// adding app middleware
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use("/public",express.static("./public"))

app.use(cookieParser())


// Route declaration
import ticketRoute from "./routes/ticket.route.js"
import userRoute from "./routes/user.route.js"
import trainRoute from "./routes/train.route.js"


app.use("/ticket", ticketRoute)
app.use("/user", userRoute)
app.use("/train", trainRoute)


export {app}