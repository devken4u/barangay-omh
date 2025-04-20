"use server";

import {
  getPublishedUserArticles,
  getUnpublishedUserArticles,
  createArticle,
} from "@/db/article/article";
import { auth } from "@/auth";
import { CreateLog } from "@/db/log/log";

export async function getPublishedUserArticlesAction(filter: string) {
  try {
    const session = await auth();
    const articles = await getPublishedUserArticles(
      session?.user.email!,
      filter
    );
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    throw error;
  }
}
export async function getUnpublishedUserArticlesAction(filter: string) {
  try {
    const session = await auth();
    const articles = await getUnpublishedUserArticles(
      session?.user.email!,
      filter
    );
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    throw error;
  }
}

export async function createArticleAction() {
  try {
    const session = await auth();
    const article = await createArticle({
      created_by: session?.user.email!,
    });
    await CreateLog({
      email: session?.user.email!,
      action: "CREATE",
      message: "Created a new article.",
    });
    return JSON.parse(JSON.stringify(article));
  } catch (error) {
    throw error;
  }
}
