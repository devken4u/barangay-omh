"use client";

import { Article } from "@/types";
import ArticleCard from "./ArticleCard";
import { useActionState, useEffect, startTransition, useState } from "react";
import { getAllPublishedArticlesAction } from "@/app/actions/article";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

function ArticleList({ admin = false }: { admin?: boolean }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const [articles, getArticleAction, isPending] = useActionState(async () => {
    return await getAllPublishedArticlesAction({
      limit: 15,
      skip: currentPage * 15,
      titleFilter,
    });
  }, null);

  useEffect(() => {
    startTransition(() => {
      getArticleAction();
    });
  }, [titleFilter, currentPage]);

  return (
    <div className="flex flex-col gap-4 p-4 pt-0 grow overflow-hidden">
      <div className="pt-2">
        <Input
          value={titleFilter}
          onChange={(e) => {
            setTitleFilter(e.target.value);
          }}
          placeholder="Search article name..."
        />
      </div>
      <div>Total articles: {articles?.total}</div>
      {!isPending && articles?.data && articles?.data.length > 0 && (
        <div className="space-x-2">
          <Button
            disabled={currentPage === 0 ? true : false}
            size="sm"
            onClick={() => {
              setCurrentPage((prev) => {
                return prev - 1;
              });
            }}
          >
            Prev
          </Button>
          <Button
            disabled={articles?.pages === currentPage + 1 ? true : false}
            size="sm"
            onClick={() => {
              setCurrentPage((prev) => {
                return prev + 1;
              });
            }}
          >
            Next
          </Button>
        </div>
      )}
      {isPending && <Loader className="animate-spin shrink-0" />}
      {(!articles?.data || articles?.data.length < 1) && !isPending && (
        <p>Empty</p>
      )}
      {articles?.data && (
        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-4 overflow-y-auto">
          {(articles?.data as Article[]).map((article) => {
            return (
              <ArticleCard admin={admin} key={article._id} article={article} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ArticleList;
