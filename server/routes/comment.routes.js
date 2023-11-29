import express from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
import { Authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:postId", getComments);
router.use(Authenticate);
router.post("/", addComment);

export default router;
