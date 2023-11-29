import asyncHandler from "express-async-handler";
import createError from "http-errors";
import User from "../models/User.js";

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) return next(createError(404, "User not found"));

  res.status(200).json(user);
});
