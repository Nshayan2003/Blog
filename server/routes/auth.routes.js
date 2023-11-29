import express from "express";
import {
  login,
  logout,
  refresh,
  signUp,
} from "../controllers/auth.controller.js";
import { Authenticate } from "../middlewares/auth.js";
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.get("/refresh", refresh);

router.post("/logout", Authenticate, logout);

export default router;
