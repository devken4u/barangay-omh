"use server";

import {
  enableChatbot,
  disableChatbot,
} from "@/db/websiteSettings/websiteSettings";

export async function enableChatbotAction() {
  try {
    await enableChatbot();
    return true;
  } catch (error) {
    throw error;
  }
}
export async function disableChatbotAction() {
  try {
    await disableChatbot();
    return true;
  } catch (error) {
    throw error;
  }
}
