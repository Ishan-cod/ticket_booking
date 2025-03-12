import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { AddStation } from "../controllers/station.controller.js";


const router = Router();


router.route("/addStation").post(verifyAdmin,AddStation)



export default router