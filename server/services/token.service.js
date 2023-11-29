import jwt from "jsonwebtoken";

export const generateSignature = async (payload) => {
  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  return {
    access_token,
    refresh_token,
  };
};
