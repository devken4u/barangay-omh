import { formateDateV1 } from "@/lib/utils";
import { Article } from "@/types";
import { ImageIcon } from "lucide-react";

function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      className="border p-4 rounded-md block hover:cursor-pointer"
      href={`/article/${article._id}`}
      target="_blank"
    >
      {article.image_url ? (
        <div className="w-full h-52">
          <img className="size-full" src={article.image_url} />
        </div>
      ) : (
        <div className="w-full h-52">
          <ImageIcon className="size-full text-gray-400" />
        </div>
      )}
      <p className="font-bold">{article.title ? article.title : "Untitled"}</p>
      <p className="text-sm">Author: {article.created_by}</p>
      <p className="text-sm">
        Published date: {formateDateV1(article.published_date)}
      </p>
    </a>
  );
}

export default ArticleCard;
