import AnnouncementModel from "../models/announcement";
import { connectDB } from "../connection/connection";

export async function getAnnouncements(params?: {limit?: number}) {
  try {
    await connectDB();
    const announcements = await AnnouncementModel.find().sort({
      createdAt: "desc",
    }).limit(params?.limit ? params.limit : 0);
    return announcements;
  } catch (error) {
    throw error;
  }
}

export async function createAnnouncement({
  description,
  created_by,
}: {
  description: string;
  created_by: string;
}) {
  try {
    await connectDB();
    const announcement = await AnnouncementModel.create({
      description,
      created_by,
    });
    return announcement;
  } catch (error) {
    throw error;
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    await connectDB();
    const deletedAnnouncement = await AnnouncementModel.findByIdAndDelete(id);
    return deletedAnnouncement;
  } catch (error) {
    return error;
  }
}

export async function deleteAnnouncements(ids: string[]) {
  try {
    await connectDB();
    await AnnouncementModel.deleteMany({ _id: { $in: ids } });
  } catch (error) {
    throw error;
  }
}

export async function updateAnnouncement({
  id,
  description,
}: {
  id: string;
  description: string;
}) {
  try {
    const editedAnnouncement = AnnouncementModel.findByIdAndUpdate(id, {
      description,
    });
    return editedAnnouncement;
  } catch (error) {
    throw error;
  }
}
