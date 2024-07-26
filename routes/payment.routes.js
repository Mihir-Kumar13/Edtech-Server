import { Router } from "express";
import { servercheck } from "../controllers/auth.controller.js";
import { auth, isStudent } from "../middlewares/auth.middleware.js";
import {
  capturePayment,
  verifySignature,
} from "../controllers/payment.controller.js";

const router = Router();

router.route("/").post(servercheck);
router.route("/buy").post(auth, isStudent, capturePayment);
router.route("/verify").post(auth, isStudent, verifySignature);
export default router;
