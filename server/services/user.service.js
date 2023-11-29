import User from "../models/User.js";

export const createUser = async (body) => {
  return await User.create(body);
};

export const findUser = async (email) => {
  return await User.findOne({ email });
};

export const findUserWithId = async (id) => {
  return await User.findById(id);
};
