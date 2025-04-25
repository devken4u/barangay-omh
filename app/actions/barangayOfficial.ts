"use server";

import { uploadImage } from "@/lib/cloudinary";
import { createBarangayOfficial } from "@/db/barangayOfficial/barangayOfficial";
import { CreateLog } from "@/db/log/log";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

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
