import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const WebsiteSettingsSchema = new Schema({
  enableChatbot: {
    type: Boolean,
    default: false,
  },
});

const WebsiteSettingsModel =
  models?.WebsiteSettings || model("WebsiteSettings", WebsiteSettingsSchema);
export default WebsiteSettingsModel;
