"use server";

import {
  createAnnouncement,
  deleteAnnouncement,
  deleteAnnouncements,
  updateAnnouncement,
} from "@/db/announcement/announcement";
import { auth } from "@/auth";
import { CreateLog } from "@/db/log/log";
import { revalidatePath } from "next/cache";
import { Announcement } from "../(routes)/(admin)/admin/dashboard/announcement/announcement-table/columns";

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

export async function deleteAnnouncementsAction(announcements: Announcement[]) {
  try {
    const session = await auth();

    const ids = announcements.map((announcement) => {
      return announcement._id;
    });

    await deleteAnnouncements(ids);
    await CreateLog({
      action: "DELETE",
      message: "Deleted announcements.",
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
