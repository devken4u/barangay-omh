import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const AnnouncementSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AnnouncementModel =
  models?.Announcement || model("Announcement", AnnouncementSchema);
export default AnnouncementModel;
