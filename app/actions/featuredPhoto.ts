"use server";

import { createFeaturedPhoto } from "@/db/featuredPhoto/featuredPhoto";
import { revalidatePath } from "next/cache";
import { CreateLog } from "@/db/log/log";
import { auth } from "@/auth";

export async function createFeaturedPhotoAction({
  url,
  public_id,
  uploaded_by,
}: {
  url: string;
  public_id: string;
  uploaded_by: string;
}) {
  const session = await auth();

  await createFeaturedPhoto({ url, public_id, uploaded_by });
  await CreateLog({
    action: "CREATE",
    email: session?.user.email!,
    message: "Uploaded a new featured photo.",
  });
  revalidatePath("/admin/dashboard/featured-photo");
}
