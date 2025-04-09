"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(file: File) {
  // Convert file to base64 for Cloudinary
  const buffer = await file.arrayBuffer();
  const base64Image = Buffer.from(buffer).toString("base64");
  const dataUri = `data:${file.type};base64,${base64Image}`;

  try {
    // upload image here
    const image = await cloudinary.uploader.upload(dataUri, {
      folder: "featured_photos",
      unique_filename: false,
    });
    return image;
  } catch (error) {
    return null;
  }
}

export async function deleteImage(public_id: string) {
  const image = await cloudinary.uploader.destroy(public_id);
  if (image.result === "ok") {
    return true;
  }
  return false;
}
