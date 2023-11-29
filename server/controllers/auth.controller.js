import asyncHandler from "express-async-handler";
import createError from "http-errors";
import {
  comparePassword,
  validatePassword,
} from "../services/valitate.service.js";
import { createUser, findUser } from "../services/user.service.js";
import { generateSignature } from "../services/token.service.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return next("All fileds are required!");

  const existUser = await findUser(email);
  if (existUser) return next(400, "User Alreday exist");

  const hashPassword = await validatePassword(password);

  const user = await createUser({
    name,
    email,
    password: hashPassword,
  });

  res.status(200).json(user);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next("All fileds are required!");

  const user = await findUser(email);
  if (!user) return next(createError(404, "Invalid credientials"));

  const hasPassword = await comparePassword(password, user.password);
  if (!hasPassword) return next(createError(400, "Invalid credientials"));

  const signature = await generateSignature({
    _id: user._id,
  });

  const { access_token, refresh_token } = signature;
  res.cookie("blogJWT", refresh_token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    access_token,
    user,
  });
});

export const refresh = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.blogJWT) return next(createError(401, "Unauthorized"));

  const refreshToken = cookies.blogJWT;
  const decoded = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const foundUser = await User.findById(decoded._id);

  if (!foundUser) return next(createError(401, "Unauthorized"));

  const signature = await generateSignature({
    _id: foundUser._id,
  });

  const { access_token } = signature;

  res.status(200).json({
    accessToken: access_token,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.blogJWT) return next(createError(204, "No content"));

  res.clearCookie("blogJWT", {
    httpOnly: true,
  });
  res.status(200).json({ message: "Logout successfully done." });
});
