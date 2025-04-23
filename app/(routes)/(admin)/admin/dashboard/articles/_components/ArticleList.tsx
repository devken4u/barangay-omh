"use client";

import { Article } from "@/types";
import ArticleCard from "./ArticleCard";
import { useActionState, useEffect, startTransition } from "react";
import { getAllPublishedArticlesAction } from "@/app/actions/article";

function ArticleList() {
  const [articles, getArticleAction, isPending] = useActionState(async () => {
    return await getAllPublishedArticlesAction({
      limit: 0,
      skip: 0,
      titleFilter: "",
    });
  }, null);

  useEffect(() => {
    startTransition(() => {
      getArticleAction();
    });
  }, []);

  return (
    <>
      {articles && articles.length && (
        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {(articles as Article[]).map((article) => {
            return <ArticleCard key={article._id} article={article} />;
          })}
        </div>
      )}
    </>
  );
}

export default ArticleList;
