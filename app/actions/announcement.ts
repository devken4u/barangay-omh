"use server";

import { createAnnouncement } from "@/db/announcement/announcement";
import { auth } from "@/auth";
import { CreateLog } from "@/db/log/log";
import { revalidatePath } from "next/cache";

export async function createAnnouncementAction({
  description,
}: {
  description: string;
}) {
  try {
    const session = await auth();
    await createAnnouncement({
      description,
      created_by: session?.user.email!,
    });
    await CreateLog({
      action: "CREATE",
      message: "Created a new announcement.",
      email: session?.user.email!,
    });
    revalidatePath("/admin/dashboard/announcement");
    return true;
  } catch (error) {
    return false;
  }
}
