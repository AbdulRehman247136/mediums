import { v2 as cloudinary, ConfigOptions } from "cloudinary";

const cloudinaryConfig: ConfigOptions = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
};

if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
  throw new Error("❌ Missing one or more Cloudinary environment variables");
}

cloudinary.config(cloudinaryConfig);

export default cloudinary;
