import { Router } from "express";
import { showAllticket } from "../controllers/ticket.controller.js";


const router = Router();



router.route("/getTickets").get(showAllticket);



export default router;