import AnnouncementModel from "../models/announcement";
import { connectDB } from "../connection/connection";

export async function getAnnouncements() {
  try {
    await connectDB();
    const announcements = await AnnouncementModel.find();
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
