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

app.use(express.static("./public"))

app.use(cookieParser())


// Route declaration
import ticketRoute from "./routes/ticket.route.js"


app.use("/api/v1/ticket", ticketRoute)


export {app}