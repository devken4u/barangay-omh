import mongoose from "mongoose";
import { connectDB } from "../connection/connection";
import ArticleModel from "../models/article";
import { Article } from "@/types";

export async function createArticle({ created_by }: { created_by: string }): Promise<Article | null> {
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

export async function getUnpublishedUserArticles(email: string, filter: string): Promise<Article[]>{
  try {
    await connectDB();
    const articles = await ArticleModel.find({created_by: email, is_published: false, title: { $regex: filter, $options: 'i' }}).sort({ createdAt: "desc" });;
    return articles;
  } catch (error) {
    throw error;
  }
}

export async function getPublishedUserArticles(email: string, filter: string): Promise<Article[]>{
  try {
    await connectDB();
    const articles = await ArticleModel.find({created_by: email, is_published: true, title: { $regex: filter, $options: 'i' }}).sort({ createdAt: "desc" });;
    return articles;
  } catch (error) {
    throw error;
  }
}