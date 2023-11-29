import bcrypt from "bcrypt";

export const validatePassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (enteredPassword, userPassword) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};
