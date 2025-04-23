"use client";

import { getAllPublishedArticles } from "@/db/article/article";
import { Article } from "@/types";
import ArticleCard from "./ArticleCard";
import { useActionState, useEffect } from "react";
import { getAllPublishedArticlesAction } from "@/app/actions/article";
import { useState } from "react";

function ArticleList() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {}, []);

  return (
    <>
      {data && (
        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {data.map((article: Article) => {
            return <ArticleCard key={article._id} article={article} />;
          })}
        </div>
      )}
    </>
  );
}

export default ArticleList;
