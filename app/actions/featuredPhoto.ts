"use server";
import { createFeaturedPhoto } from "@/db/featuredPhoto/featuredPhoto";
import { revalidatePath } from "next/cache";

export async function createFeaturedPhotoAction({
  url,
  public_id,
  uploaded_by,
}: {
  url: string;
  public_id: string;
  uploaded_by: string;
}) {
  await createFeaturedPhoto({ url, public_id, uploaded_by });
  revalidatePath("/admin/dashboard/featured-photo");
}
