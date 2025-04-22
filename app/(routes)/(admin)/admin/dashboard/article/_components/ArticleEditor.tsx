"use client";
import { useEffect, useState, useRef } from "react";
import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";
import { Image, ChartNoAxesGantt, X, Loader } from "lucide-react";
import { Article } from "@/types";
import ArticleEditorSaveState from "./ArticleEditorSaveState";
import { useActionState } from "react";
import {
  updateTitleAction,
  updateSubTitleAction,
  updateBodyAction,
  publishArticleAction,
  unPublishArticleAction,
  removeArticleImageAction,
} from "@/app/actions/article";
import { startTransition } from "react";
import { formatDateV2 } from "@/lib/utils";
import ArticleImageUpload from "./ArticleImageUpload";

function ArticleEditor({ article }: { article: Article }) {
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const subTitleRef = useRef<HTMLTextAreaElement | null>(null);
  const [hasSubtitle, setHasSubtitle] = useState(() => {
    if (article.sub_title) return true;
    return false;
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["blockquote"],
    ],
  };

  function adjustHeight(element: HTMLTextAreaElement) {
    if (element) {
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    }
  }

  const [title, setTitle] = useState(article.title);
  const titleTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const [titleState, titleAction, isTitleActionPending] = useActionState(
    async () => {
      return await updateTitleAction(title, article._id);
    },
    null
  );

  const [subTitle, setSubTitle] = useState(article.sub_title);
  const subTitleTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const [subTitleState, subTitleAction, isSubTitleActionPending] =
    useActionState(async () => {
      return await updateSubTitleAction(subTitle, article._id);
    }, null);

  const [body, setBody] = useState(article.body);
  const bodyTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const [bodyState, bodyAction, isBodyActionPending] = useActionState(
    async () => {
      return await updateBodyAction(body, article._id);
    },
    null
  );

  const [publishedState, publishAction, isPublishActionPending] =
    useActionState(async () => {
      return await publishArticleAction(article._id).then(() => {
        window.location.reload();
      });
    }, null);

  const [unPublishedState, unPublishAction, isUnPublishActionPending] =
    useActionState(async () => {
      return await unPublishArticleAction(article._id).then(() => {
        window.location.reload();
      });
    }, null);

  const [removeImageState, removeImageAction, isRemoveImageActionPending] =
    useActionState(async () => {
      return await removeArticleImageAction(article.public_id, article._id);
    }, null);

  useEffect(() => {
    if (article.title !== title) {
      if (titleTimeoutId.current) clearTimeout(titleTimeoutId.current);
      titleTimeoutId.current = setTimeout(() => {
        startTransition(() => {
          titleAction();
        });
      }, 400);
    }
  }, [title]);

  useEffect(() => {
    if (article.sub_title !== subTitle) {
      if (subTitleTimeoutId.current) clearTimeout(subTitleTimeoutId.current);
      subTitleTimeoutId.current = setTimeout(() => {
        startTransition(() => {
          subTitleAction();
        });
      }, 400);
    }
  }, [subTitle]);

  useEffect(() => {
    if (article.body !== body) {
      if (bodyTimeoutId.current) clearTimeout(bodyTimeoutId.current);
      bodyTimeoutId.current = setTimeout(() => {
        startTransition(() => {
          bodyAction();
        });
      }, 400);
    }
  }, [body]);

  return (
    <div className="space-y-6 px-2 w-6xl mx-auto max-w-full">
      <div className="flex gap-2 items-center justify-end">
        <ArticleEditorSaveState
          isLoading={
            isTitleActionPending ||
            isSubTitleActionPending ||
            isBodyActionPending
          }
        />
        {article.is_published ? (
          <Button
            size="sm"
            disabled={isUnPublishActionPending}
            onClick={() => {
              startTransition(() => {
                unPublishAction();
              });
            }}
          >
            {isPublishActionPending && <Loader className="animate-spin" />}
            Unpublish
          </Button>
        ) : (
          <Button
            size="sm"
            disabled={isPublishActionPending}
            onClick={() => {
              startTransition(() => {
                publishAction();
              });
            }}
          >
            {isPublishActionPending && <Loader className="animate-spin" />}
            Publish
          </Button>
        )}
      </div>
      {article.image_url && (
        <div className="w-full h-[25rem] relative">
          <Button
            disabled={isRemoveImageActionPending}
            onClick={() => {
              startTransition(() => {
                removeImageAction();
              });
            }}
            className="absolute right-2 top-2"
            variant="destructive"
            size="sm"
          >
            {isRemoveImageActionPending && <Loader className="animate-spin" />}
            Remove
          </Button>
          <img
            src={article.image_url}
            className="size-full object-cover object-center"
          />
        </div>
      )}
      <div className="space-x-2">
        <ArticleImageUpload id={article._id} />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setHasSubtitle(true);
          }}
        >
          <ChartNoAxesGantt />
          Add Subtitle
        </Button>
      </div>
      <textarea
        defaultValue={title}
        maxLength={150}
        rows={1}
        onChange={(e) => {
          setTitle(e.target.value);
          adjustHeight(titleRef.current!);
        }}
        ref={titleRef}
        placeholder="Article Title..."
        className="overflow-hidden  text-4xl font-bold outline-none border-none bg-transparent min-w-[100px] mb-6 w-full max-h-[none] resize-none"
      ></textarea>
      {hasSubtitle && (
        <div className="flex">
          <textarea
            defaultValue={subTitle}
            maxLength={150}
            rows={1}
            onChange={(e) => {
              setSubTitle(e.target.value);
              adjustHeight(titleRef.current!);
            }}
            ref={subTitleRef}
            placeholder="Subtitle..."
            className="overflow-hidden text-2xl font-bold outline-none border-none bg-transparent min-w-[100px] mb-6 w-full max-h-[none] resize-none"
          ></textarea>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSubTitle("");
              setHasSubtitle(false);
            }}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}
      <div className="space-y-2">
        <Editor
          value={body}
          onTextChange={(e) => {
            setBody(e.htmlValue || "");
          }}
          showHeader={false}
          modules={modules}
        />
        <p className="text-sm">
          <strong>Author:</strong> {article.created_by}
        </p>
        {article.published_date && article.is_published && (
          <p className="text-sm">
            <strong>Published Date: </strong>
            {formatDateV2(article.published_date)}
          </p>
        )}
        <p className="text-sm">
          <strong>Last updated:</strong> {formatDateV2(article.updatedAt)}
        </p>
      </div>
    </div>
  );
}

export default ArticleEditor;
