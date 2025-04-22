import { getAllPublishedArticles } from "@/db/article/article";
import { Article } from "@/types";
import ArticleCard from "./ArticleCard";

async function ArticleList() {
  const articles = await getAllPublishedArticles();
  const data: Article[] = JSON.parse(JSON.stringify(articles));

  return (
    <div className="grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {data.map((article: Article) => {
        return <ArticleCard key={article._id} article={article} />;
      })}
    </div>
  );
}

export default ArticleList;
