import asyncHandler from "express-async-handler";
import createError from "http-errors";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const addComment = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { postId, commentText } = req.body;
  if (!postId || !commentText)
    return next(createError(400, "Please add your comment and your post id."));

  const post = await Post.findById(postId);

  if (!post) return next(createError(404, "Post not found!"));

  const newComment = await Comment.create({
    user: userId,
    post: postId,
    commentText,
    replies: [],
  });

  // Populate the 'user' field in the newComment object
  await Comment.populate(newComment, {
    path: "user",
    select: "_id name email avatar",
  });

  post.comments.push(newComment);
  await post.save();

  res.status(201).json(newComment);
});

export const getComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postId })
    .sort({ createdAt: "desc" })
    .populate("user", "_id name avatar email");

  if (comments.length === 0) return next(createError(404, "No comments found"));

  res.status(200).json(comments);
});

export const getComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findOne({
    _id: req.params.commentId,
    post: req.params.postId,
  });

  if (!comment) return next(createError(404, "No comment found."));

  res.status(200).json(comment);
});

export const upadteComment = asyncHandler(async (req, res, next) => {
  const { commentText } = req.body;

  const comment = await Comment.findOne({
    _id: req.params.commentId,
    post: req.params.postId,
  }).populate("user", "_id name avatar");

  if (!comment) return next(createError(404, "No comment found."));

  comment.commentText = commentText;
  comment.updatedAt = new Date();

  await comment.save();

  res.status(200).json(comment);
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findOneAndRemove({
    _id: req.params.commentId,
    post: req.params.postId,
  });

  if (!comment) return next(createError(404, "No comment found."));

  res.status(200).json(comment);
});
