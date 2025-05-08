import { connectDB } from "../connection/connection";
import WebsiteSettingsModel from "../models/websiteSettings";

export async function enableChatbot() {
  try {
    await connectDB();
    const preferences = await WebsiteSettingsModel.findOne();
    if (!preferences) {
      return await WebsiteSettingsModel.create({
        enableChatbot: true,
      });
    } else {
      return await WebsiteSettingsModel.findByIdAndUpdate(preferences._id, {
        enableChatbot: true,
      });
    }
  } catch (error) {
    throw error;
  }
}
export async function disableChatbot() {
  try {
    await connectDB();
    const preferences = await WebsiteSettingsModel.findOne();
    if (!preferences) {
      return await WebsiteSettingsModel.create({
        enableChatbot: false,
      });
    } else {
      return await WebsiteSettingsModel.findByIdAndUpdate(preferences._id, {
        enableChatbot: false,
      });
    }
  } catch (error) {
    throw error;
  }
}

export async function getChatbotPreference() {
  try {
    await connectDB();
    const preferences = await WebsiteSettingsModel.findOne();
    if (!preferences) {
      await WebsiteSettingsModel.create({});
      return false;
    }
    return preferences.enableChatbot;
  } catch (error) {
    throw error;
  }
}
