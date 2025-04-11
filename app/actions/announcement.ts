"use server";

import {
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
} from "@/db/announcement/announcement";
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

export async function deleteAnnouncementAction(id: string) {
  try {
    const session = await auth();
    await deleteAnnouncement(id);
    await CreateLog({
      action: "DELETE",
      message: "Deleted an announcement.",
      email: session?.user.email!,
    });
    revalidatePath("/admin/dashboard/announcement");
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateAnnouncementAction({
  id,
  description,
}: {
  id: string;
  description: string;
}) {
  try {
    const session = await auth();
    await updateAnnouncement({
      id,
      description,
    });
    await CreateLog({
      action: "UPDATE",
      message: "Updated an announcement.",
      email: session?.user.email!,
    });
    revalidatePath("/admin/dashboard/announcement");
    return true;
  } catch (error) {
    return false;
  }
}
