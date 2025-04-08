"use server";

import FeaturedPhotoModel from "../models/featured_photo";
import { connectDB } from "../connection/connection";
import { FeaturedPhoto } from "@/types";

export async function getFeaturedPhotos(): Promise<FeaturedPhoto[] | null> {
  try {
    await connectDB();
    return await FeaturedPhotoModel.find().sort({ numerical_order: "asc" });
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

    const lastItemNumericalOrder = await FeaturedPhotoModel.findOne()
      .sort({
        numerical_order: -1,
      })
      .select("numerical_order");

    await FeaturedPhotoModel.create({
      url,
      public_id,
      uploaded_by,
      numerical_order: lastItemNumericalOrder
        ? lastItemNumericalOrder.numerical_order + 1
        : 1,
    });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function increaseOrder(id: string) {
  // check if total items is greater than one
  const totalItems = await FeaturedPhotoModel.countDocuments();
  if (totalItems < 2) {
    return false;
  }

  // check if the item's order is first already
  const firstItem: FeaturedPhoto = await FeaturedPhotoModel.findOne().sort({
    numerical_order: "asc",
  });
  if (firstItem._id.toString() === id) {
    return false;
  }

  const currentItem = await FeaturedPhotoModel.findById(id);

  const items: FeaturedPhoto[] = await FeaturedPhotoModel.find().sort({
    numerical_order: "asc",
  });

  const index = items.findIndex((item) => item._id.toString() === id);

  const currentNumericalOrder = currentItem.numerical_order;
  const futureNumericalOrder = items[index - 1].numerical_order;

  await FeaturedPhotoModel.findByIdAndUpdate(items[index - 1]._id, {
    numerical_order: -1,
  });

  await FeaturedPhotoModel.findByIdAndUpdate(id, {
    numerical_order: futureNumericalOrder,
  });

  await FeaturedPhotoModel.findByIdAndUpdate(items[index - 1]._id, {
    numerical_order: currentNumericalOrder,
  });

  return true;
}

export async function decreaseOrder(id: string) {}
