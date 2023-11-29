import express from "express";
import { Authenticate } from "../middlewares/auth.js";
import {
  addNewPost,
  deletePost,
  editPost,
  getPostById,
  getPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.use(Authenticate);
router.post("/", upload.single("image"), addNewPost);

router.get("/user", getUserPosts);
router.patch("/like", likePost);
router.patch("/:id", upload.single("image"), editPost);
router.delete("/:id", deletePost);

export default router;
