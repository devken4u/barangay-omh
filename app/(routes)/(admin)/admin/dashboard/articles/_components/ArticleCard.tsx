import { formateDateV1 } from "@/lib/utils";
import { Article } from "@/types";
import { ImageIcon } from "lucide-react";

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="border">
      {article.image_url ? (
        <div>
          <img src={article.image_url} />
        </div>
      ) : (
        <div>
          <ImageIcon />
        </div>
      )}
      <p>{article.title}</p>
      <p>{article.created_by}</p>
      <p>{formateDateV1(article.published_date)}</p>
    </div>
  );
}

export default ArticleCard;
