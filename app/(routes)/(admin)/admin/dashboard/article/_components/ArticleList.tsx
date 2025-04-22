"use client";

import {
  getPublishedUserArticlesAction,
  getUnpublishedUserArticlesAction,
  createArticleAction,
} from "@/app/actions/article";
import ArticleLink from "./ArticleLink";
import { Article } from "@/types";
import { useActionState, useState } from "react";
import { useEffect } from "react";
import { startTransition } from "react";
import { Input } from "@/components/ui/input";
import { FilePlus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { redirect } from "next/navigation";

function ArticleList({ selected }: { selected: string }) {
  const [searchString, setSearchString] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const [createArticleState, createArticle, isCreateArticleStatePending] =
    useActionState(async () => {
      await createArticleAction().then((article: Article) => {
        redirect(`/admin/dashboard/article/${article._id}`);
      });
    }, null);

  const [publishedState, publishedUserArticlesAction, isPublishedStatePending] =
    useActionState(async () => {
      return await getPublishedUserArticlesAction(searchString);
    }, null);

  const [
    unPublishedState,
    unPublishedUserArticlesAction,
    isUnPublishedStatePending,
  ] = useActionState(async () => {
    return await getUnpublishedUserArticlesAction(searchString);
  }, null);

  useEffect(() => {
    startTransition(() => {
      publishedUserArticlesAction();
      unPublishedUserArticlesAction();
    });
  }, []);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchString(value);

    clearTimeout((window as any).searchTimeout);
    (window as any).searchTimeout = setTimeout(() => {
      startTransition(() => {
        publishedUserArticlesAction();
        unPublishedUserArticlesAction();
      });
    }, 400);
  }

  return (
    <>
      {isOpen ? (
        <div className="border-r min-w-72 w-72 py-2 px-4 flex flex-col absolute bg-background z-50 top-0 left-0 h-full lg:static">
          <div className="flex items-center gap-2">
            <Input
              value={searchString}
              onChange={handleSearch}
              placeholder="Search..."
              className="rounded-full"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <PanelLeft className="size-5" />
            </Button>
          </div>
          <div className="border-y my-4 py-2">
            <Button
              disabled={isCreateArticleStatePending}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                startTransition(() => {
                  createArticle();
                });
              }}
            >
              {isCreateArticleStatePending && (
                <Loader className="animate-spin" />
              )}
              <FilePlus /> New Draft
            </Button>
          </div>
          <div className="grow overflow-y-auto overflow-x-hidden">
            <div className="text-muted-foreground">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="cursor-pointer">
                    <h1 className="font-semibold">
                      MY DRAFTS({unPublishedState ? unPublishedState.length : 0}
                      )
                    </h1>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="max-h-80 overflow-y-auto space-y-1 overflow-x-hidden">
                      {isUnPublishedStatePending && !unPublishedState && (
                        <div className="space-y-1">
                          <Skeleton className="w-full h-6" />
                          <Skeleton className="w-full h-6" />
                          <Skeleton className="w-full h-6" />
                        </div>
                      )}
                      {unPublishedState &&
                        unPublishedState.map((article: Article) => {
                          return (
                            <ArticleLink
                              isSelected={article._id === selected}
                              id={article._id}
                              title={article.title}
                              key={article._id}
                            />
                          );
                        })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="text-muted-foreground">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="cursor-pointer">
                    <h1 className="font-semibold">
                      PUBLISHED({publishedState ? publishedState.length : 0})
                    </h1>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="max-h-80 overflow-y-auto space-y-1 overflow-x-hidden">
                      {isPublishedStatePending && !publishedState && (
                        <div className="space-y-1">
                          <Skeleton className="w-full h-6" />
                          <Skeleton className="w-full h-6" />
                          <Skeleton className="w-full h-6" />
                        </div>
                      )}
                      {publishedState &&
                        publishedState.map((article: Article) => {
                          return (
                            <ArticleLink
                              isSelected={article._id === selected}
                              id={article._id}
                              title={article.title}
                              key={article._id}
                            />
                          );
                        })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-2">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
            <PanelLeft className="size-5" />
          </Button>
        </div>
      )}
    </>
  );
}

export default ArticleList;
