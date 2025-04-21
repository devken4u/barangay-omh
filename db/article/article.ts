import mongoose from "mongoose";
import { connectDB } from "../connection/connection";
import ArticleModel from "../models/article";
import { Article } from "@/types";

export async function createArticle({
  created_by,
}: {
  created_by: string;
}): Promise<Article | null> {
  try {
    await connectDB();
    const newArticle = await ArticleModel.create({
      created_by,
    });
    if (newArticle) return newArticle;
    return null;
  } catch (error) {
    throw error;
  }
}

export async function isUnpublishedArticleEmpty(email: string) {
  try {
    await connectDB();
    const articles = await ArticleModel.find({ email, is_published: false });
    if (articles.length) return false;
    return true;
  } catch (error) {
    throw error;
  }
}

export async function getRecentUnpublishedArticle(email: string) {
  try {
    await connectDB();
    const article = await ArticleModel.findOne({
      email,
      is_published: false,
    }).sort({ createdAt: "desc" });
    return article;
  } catch (error) {
    throw error;
  }
}

export async function getArticleById(
  email: string,
  id: string
): Promise<Article | null> {
  try {
    await connectDB();
    const article = await ArticleModel.findById({ email, _id: id });
    return article;
  } catch (error) {
    throw error;
  }
}

export async function isArticleValid(id: string) {
  try {
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    const article = await ArticleModel.findById(id);
    if (article) return true;
    return false;
  } catch (error) {
    throw error;
  }
}

export async function getUnpublishedUserArticles(
  email: string,
  filter: string
): Promise<Article[]> {
  try {
    await connectDB();
    const articles = await ArticleModel.find({
      created_by: email,
      is_published: false,
      title: { $regex: filter, $options: "i" },
    }).sort({ createdAt: "desc" });
    return articles;
  } catch (error) {
    throw error;
  }
}

export async function getPublishedUserArticles(
  email: string,
  filter: string
): Promise<Article[]> {
  try {
    await connectDB();
    const articles = await ArticleModel.find({
      created_by: email,
      is_published: true,
      title: { $regex: filter, $options: "i" },
    }).sort({ createdAt: "desc" });
    return articles;
  } catch (error) {
    throw error;
  }
}

//

export async function updateTitle(
  title: string,
  id: string
): Promise<Article | null> {
  try {
    await connectDB();
    const article = await ArticleModel.findByIdAndUpdate(id, {
      title,
    });
    return article;
  } catch (error) {
    throw error;
  }
}

export async function updateSubTitle(
  sub_title: string,
  id: string
): Promise<Article | null> {
  try {
    await connectDB();
    const article = await ArticleModel.findByIdAndUpdate(id, {
      sub_title,
    });
    return article;
  } catch (error) {
    throw error;
  }
}

export async function updateBody(
  body: string,
  id: string
): Promise<Article | null> {
  try {
    await connectDB();
    const article = await ArticleModel.findByIdAndUpdate(id, {
      body,
    });
    return article;
  } catch (error) {
    throw error;
  }
}
export async function publishArticle(id: string): Promise<Article | null> {
  try {
    await connectDB();
    const article = await ArticleModel.findByIdAndUpdate(id, {
      is_published: true,
      published_date: new Date(),
    });
    return article;
  } catch (error) {
    throw error;
  }
}
export async function unPublishArticle(id: string): Promise<Article | null> {
  try {
    await connectDB();
    const article = await ArticleModel.findByIdAndUpdate(id, {
      is_published: false,
    });
    return article;
  } catch (error) {
    throw error;
  }
}

export async function updateArticleImage(
  image_url: string,
  public_id: string,
  id: string
): Promise<Article | null> {
  try {
    await connectDB();
    const article = await ArticleModel.findByIdAndUpdate(id, {
      image_url,
      public_id,
    });
    return article;
  } catch (error) {
    throw error;
  }
}

export async function removeArticleImage(id: string): Promise<Article | null> {
  try {
    await connectDB();
    const article = await ArticleModel.findByIdAndUpdate(id, {
      image_url: "",
      public_id: "",
    });
    return article;
  } catch (error) {
    throw error;
  }
}
