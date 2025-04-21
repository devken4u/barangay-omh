"use server";

import {
  getPublishedUserArticles,
  getUnpublishedUserArticles,
  createArticle,
  updateTitle,
  updateSubTitle,
  updateBody,
  publishArticle,
  unPublishArticle,
  updateArticleImage,
  removeArticleImage,
  getArticleById,
} from "@/db/article/article";
import { auth } from "@/auth";
import { CreateLog } from "@/db/log/log";
import { revalidatePath } from "next/cache";
import { deleteImage } from "@/lib/cloudinary";

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

//

export async function updateTitleAction(title: string, id: string) {
  try {
    const article = await updateTitle(title, id);
    revalidatePath(`/admin/dashboard/article/${id}`);
    if (article) return true;
    return false;
  } catch (error) {
    return false;
  }
}

export async function updateSubTitleAction(sub_title: string, id: string) {
  try {
    const article = await updateSubTitle(sub_title, id);
    revalidatePath(`/admin/dashboard/article/${id}`);
    if (article) return true;
    return false;
  } catch (error) {
    return false;
  }
}

export async function updateBodyAction(body: string, id: string) {
  try {
    const article = await updateBody(body, id);
    revalidatePath(`/admin/dashboard/article/${id}`);
    if (article) return true;
    return false;
  } catch (error) {
    return false;
  }
}

export async function publishArticleAction(id: string) {
  try {
    const session = await auth();
    const article = await publishArticle(id);
    if (article) {
      await CreateLog({
        action: "UPDATE",
        message: "Published an article.",
        email: session?.user.email!,
      });
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function unPublishArticleAction(id: string) {
  try {
    const session = await auth();
    const article = await unPublishArticle(id);
    if (article) {
      await CreateLog({
        action: "UPDATE",
        message: "Unpublished an article.",
        email: session?.user.email!,
      });
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function updateArticleImageAction(
  image_url: string,
  public_id: string,
  id: string
) {
  try {
    const session = await auth();
    const currentArticle = await getArticleById(session?.user.email!, id);
    if (currentArticle?.public_id) {
      const result = await deleteImage(currentArticle?.public_id);
      if (!result) {
        throw new Error("Image deletion in cloudinary failed.");
      }
    }
    const article = await updateArticleImage(image_url, public_id, id);
    revalidatePath(`/admin/dashboard/article/${id}`);
    if (article) return true;
    return false;
  } catch (error) {
    return false;
  }
}

export async function removeArticleImageAction(public_id: string, id: string) {
  try {
    const result = await deleteImage(public_id);
    if (!result) {
      throw new Error("Image deletion in cloudinary failed.");
    }
    const article = await removeArticleImage(id);
    revalidatePath(`/admin/dashboard/article/${id}`);
    if (article) return true;
    return false;
  } catch (error) {
    return false;
  }
}
