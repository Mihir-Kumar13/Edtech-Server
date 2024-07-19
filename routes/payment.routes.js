import { Router } from "express";
import { servercheck } from "../controllers/auth.controller.js";

const router = Router();

router.route("/").post(servercheck);
export default router;
