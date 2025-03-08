import { Router } from "express";
import { showAllBookedTicket } from "../controllers/ticket.controller.js";
import { APICALLS } from "../controllers/user.controller.js";


const router = Router();



router.route("/getTickets").get(showAllBookedTicket);
router.route("/apicall").get(APICALLS)



export default router;