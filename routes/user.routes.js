import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  sendOtp,
  servercheck,
} from "../controllers/auth.controller.js";
import {
  changePassword,
  deleteProfile,
  getUserProfile,
  updateProfile,
} from "../controllers/userprofile.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(servercheck);
router.route("/register").post(registerUser);
router.route("/send-otp").post(sendOtp);
router.route("/login").post(loginUser);
router.route("/profile").get(auth, getUserProfile);
router.route("/update-profile").post(auth, updateProfile);
router.route("/delete-profile").post(auth, deleteProfile);
router.route("/logout").post(auth, logoutUser);
router.route("/getcurrentuser").post(auth, getCurrentUser);
router.route("/update-password").post(auth, changePassword);

export default router;
