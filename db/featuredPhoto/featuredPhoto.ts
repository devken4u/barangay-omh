"use server";

import FeaturedPhotoModel from "../models/featured_photo";
import { connectDB } from "../connection/connection";
import { FeaturedPhoto } from "@/types";

export async function getFeaturedPhotos(): Promise<FeaturedPhoto[] | null> {
  try {
    await connectDB();
    return await FeaturedPhotoModel.find();
  } catch (error) {
    return null;
  }
}

export async function createFeaturedPhoto({
  url,
  public_id,
  uploaded_by,
}: {
  url: string;
  public_id: string;
  uploaded_by: string;
}) {
  try {
    await connectDB();
    await FeaturedPhotoModel.create({
      url,
      public_id,
      uploaded_by,
    });
    return true;
  } catch (error) {
    return error;
  }
}
