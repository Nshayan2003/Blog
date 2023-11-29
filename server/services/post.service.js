import Post from "../models/Post.js";

export const createPost = async (body) => {
  return await Post.create(body);
};
