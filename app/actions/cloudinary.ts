"use server";

import { uploadImage } from "@/lib/cloudinary";

export async function uploadImageAction(_: any, formData: FormData) {
  const file = formData.get("file") as File;
  if (!(file instanceof File)) {
    throw new Error("No file uploaded or invalid file.");
  }
  const image = await uploadImage(file);

  if (image) {
    return {
      status: "success",
      image,
    };
  } else {
    return {
      status: "failed",
      image: null,
    };
  }
}
