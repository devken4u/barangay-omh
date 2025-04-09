"use server";

import { createFeaturedPhoto } from "@/db/featuredPhoto/featuredPhoto";
import { revalidatePath } from "next/cache";
import { CreateLog } from "@/db/log/log";
import { auth } from "@/auth";
import {
  increaseOrder,
  decreaseOrder,
  toggleFeaturedPhotoVisibility,
  deleteFeaturedPhoto,
} from "@/db/featuredPhoto/featuredPhoto";
import { deleteImage } from "@/lib/cloudinary";

export async function createFeaturedPhotoAction({
  url,
  public_id,
  uploaded_by,
}: {
  url: string;
  public_id: string;
  uploaded_by: string;
}) {
  try {
    const session = await auth();

    await createFeaturedPhoto({ url, public_id, uploaded_by });
    await CreateLog({
      action: "CREATE",
      email: session?.user.email!,
      message: "Uploaded a new featured photo.",
    });
    revalidatePath("/admin/dashboard/featured-photo");
    return true;
  } catch (error) {
    return false;
  }
}
export async function increaseOrderAction(id: string) {
  try {
    const session = await auth();
    await increaseOrder(id);
    await CreateLog({
      action: "UPDATE",
      email: session?.user.email!,
      message: "Updated the numerical order of a featured photo.",
    });
    revalidatePath("/admin/dashboard/featured-photo");
    return {
      success: true,
      action: "increase",
    };
  } catch (error) {
    throw error;
  }
}
export async function decreaseOrderAction(id: string) {
  try {
    const session = await auth();
    await decreaseOrder(id);
    await CreateLog({
      action: "UPDATE",
      email: session?.user.email!,
      message: "Updated the numerical order of a featured photo.",
    });
    revalidatePath("/admin/dashboard/featured-photo");
    return {
      success: true,
      action: "decrease",
    };
  } catch (error) {
    throw error;
  }
}
export async function toggleFeaturedPhotoVisibilityAction(id: string) {
  try {
    const session = await auth();
    await toggleFeaturedPhotoVisibility(id);
    await CreateLog({
      action: "UPDATE",
      email: session?.user.email!,
      message: "Updated the visibility of a featured photo.",
    });
    revalidatePath("/admin/dashboard/featured-photo");
    return {
      success: true,
      action: "visibility",
    };
  } catch (error) {
    throw error;
  }
}
export async function deleteFeaturedPhotoAction(id: string, public_id: string) {
  try {
    const session = await auth();
    const result = await deleteImage(public_id);
    if (!result) {
      throw new Error("Image deletion in cloudinary failed.");
    }
    await deleteFeaturedPhoto(id);
    await CreateLog({
      action: "DELETE",
      email: session?.user.email!,
      message: "Deleted a featured photo.",
    });
    revalidatePath("/admin/dashboard/featured-photo");
    return {
      success: true,
      action: "delete",
    };
  } catch (error) {
    throw error;
  }
}
