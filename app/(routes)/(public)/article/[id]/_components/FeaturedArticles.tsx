import { getFeaturedArticles } from "@/db/article/article";
import { Article } from "@/types";
import { Image } from "lucide-react";

async function FeaturedArticles({
  orientation = "v",
  limit = 10,
  skip = 0,
}: {
  orientation?: "v" | "h";
  limit?: number;
  skip?: number;
}) {
  const articles: Article[] = await getFeaturedArticles({ limit, skip });

  if (orientation === "v") {
    return (
      <div className="w-80 space-y-6 shrink-0">
        {articles.length > 0 &&
          articles.map((article) => {
            return (
              <a
                key={article._id}
                className="cursor-pointer group block"
                href={`/article/${article._id}`}
              >
                <div className="w-full h-36">
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt="article-picture"
                      className="size-full object-cover object-top"
                    />
                  ) : (
                    <Image className="size-full text-gray-400" />
                  )}
                </div>
                <p className="font-semibold group-hover:underline">
                  {article.title}
                </p>
              </a>
            );
          })}
      </div>
    );
  }
  return (
    <div className="grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-8 overflow-y-auto p-4">
      {articles.length > 0 &&
        articles.map((article) => {
          return (
            <a
              key={article._id}
              className="cursor-pointer group block"
              href={`/article/${article._id}`}
            >
              <div className="w-full h-64">
                {article.image_url ? (
                  <img
                    src={article.image_url}
                    alt="article-picture"
                    className="size-full object-cover object-top"
                  />
                ) : (
                  <Image className="size-full text-gray-400" />
                )}
              </div>
              <p className="font-semibold group-hover:underline">
                {article.title}
              </p>
            </a>
          );
        })}
    </div>
  );
}

export default FeaturedArticles;
