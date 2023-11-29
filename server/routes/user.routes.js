import express from "express";
import { getUserProfile } from "../controllers/user.controller.js";
import { Authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.use(Authenticate);
router.get("/profile", getUserProfile);
router.put("/profile");
router.get("/");

export default router;
