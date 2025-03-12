import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { loginUser, registerAdmin, registerUser } from "../controllers/user.controller.js";

const router = Router();
router.route("/registerUser").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/admin_Register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerAdmin
);

router.route("/login").post(loginUser)



export default router