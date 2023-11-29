import dontenv from "dotenv";
dontenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUNINARY_COULD_NAME,
  api_key: process.env.CLOUNINARY_API_KEY,
  api_secret: process.env.CLOUNINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image.path, {
      folder: "blog",
    });

    const uploadedImage = {
      id: result.public_id,
      url: result.secure_url,
    };
    return uploadedImage;
  } catch (error) {
    console.error("Failed to upload images:", error);
    throw error;
  }
};

export default cloudinary;
