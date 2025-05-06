import React from "react";
import { redirect } from "next/navigation";
import { getPublishedArticleById } from "@/db/article/article";
import mongoose from "mongoose";
import { Article } from "@/types";
import { formatDateV2 } from "@/lib/utils";
import FeaturedArticles from "./_components/FeaturedArticles";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return redirect("/");

  const article: Article = await getPublishedArticleById(id);

  if (article) {
    return (
      <div className="flex container mx-auto space-x-6 mb-4">
        <div className=" px-2 grow ">
          {article.image_url && (
            <div className="h-96 mb-8">
              <img
                src={article.image_url}
                alt="article-picture"
                className="size-full object-contain"
              />
            </div>
          )}
          {article.title && (
            <h1 className="font-bold text-3xl">{article.title}</h1>
          )}
          {article.sub_title && (
            <h2 className="font-semibold text-xl mt-2">{article.sub_title}</h2>
          )}
          {article.body && (
            <div
              className="mt-8"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          )}
          <div className="mt-4 font-mono">
            {article.created_by && (
              <p className="text-sm">Author: {article.created_by}</p>
            )}
            {article.published_date && (
              <p className="text-sm">
                Published at: {formatDateV2(article.published_date)}
              </p>
            )}
          </div>
          <div className="mt-8">
            <div className="block lg:hidden">
              <FeaturedArticles limit={10} orientation="h" />
            </div>
            <FeaturedArticles limit={6} skip={10} orientation="h" />
          </div>
        </div>
        <div className="hidden lg:block">
          <FeaturedArticles limit={10} />
        </div>
      </div>
    );
  }
  return redirect("/");
}

export default page;
