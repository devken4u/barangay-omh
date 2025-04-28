"use server";

import { uploadImage } from "@/lib/cloudinary";
import {
  createBarangayOfficial,
  deleteBarangayOfficial,
  updateBarangayOfficial,
} from "@/db/barangayOfficial/barangayOfficial";
import { CreateLog } from "@/db/log/log";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { Official } from "@/types";
import { deleteImage } from "@/lib/cloudinary";

export async function createBarangayOfficialAction(_: any, formData: FormData) {
  try {
    const session = await auth();
    const file = formData.get("file") as File;
    const image = await uploadImage(file);

    if (image) {
      const official = await createBarangayOfficial({
        image_url: image.secure_url,
        public_id: image.public_id,
        name: formData.get("name") as string,
        position: formData.get("position") as string,
        titles: formData.get("titles") as string,
      });
      await CreateLog({
        email: session?.user.email!,
        action: "CREATE",
        message: "Created a new barangay official.",
      });
      revalidatePath("/admin/dashboard/barangay-officials");
      if (official) return true;
    } else {
      const official = await createBarangayOfficial({
        name: formData.get("name") as string,
        position: formData.get("position") as string,
        titles: formData.get("titles") as string,
      });
      await CreateLog({
        email: session?.user.email!,
        action: "CREATE",
        message: "Created a new barangay official.",
      });
      revalidatePath("/admin/dashboard/barangay-officials");
      if (official) return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
}

export async function deleteBarangayOfficialAction(official: Official) {
  try {
    const session = await auth();
    if (official.public_id) {
      await deleteImage(official.public_id);
    }
    await deleteBarangayOfficial(official._id);
    await CreateLog({
      email: session?.user.email!,
      action: "CREATE",
      message: "Created a new barangay official.",
    });
    revalidatePath("/admin/dashboard/barangay-officials");
    return true;
  } catch (error) {
    throw error;
  }
}

export async function editBarangayOfficialAction(formData: FormData) {
  try {
    const session = await auth();
    const file = formData.get("file") as File;
    const currentPublicId = formData.get("currentPublicId");

    if (currentPublicId && file) {
      await deleteImage(currentPublicId as string);
    }

    let image = null;
    if (file) {
      image = await uploadImage(file);
    }

    if (image) {
      const official = await updateBarangayOfficial({
        image_url: image.secure_url,
        public_id: image.public_id,
        name: formData.get("name") as string,
        position: formData.get("position") as string,
        titles: formData.get("titles") as string,
        id: formData.get("id") as string,
      });
      await CreateLog({
        email: session?.user.email!,
        action: "UPDATE",
        message: "Updated a barangay official.",
      });
      revalidatePath("/admin/dashboard/barangay-officials");
      if (official) return true;
    } else {
      const official = await updateBarangayOfficial({
        name: formData.get("name") as string,
        position: formData.get("position") as string,
        titles: formData.get("titles") as string,
        id: formData.get("id") as string,
      });
      await CreateLog({
        email: session?.user.email!,
        action: "UPDATE",
        message: "Updated a barangay official.",
      });
      revalidatePath("/admin/dashboard/barangay-officials");
      if (official) return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
}
