import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { AddTrain } from "../controllers/train.controller.js";



const router = Router();

router.route("/addTrains").post(verifyAdmin, AddTrain)




export default router;