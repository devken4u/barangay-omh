import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function ArticleLink({
  title,
  id,
  isSelected = false,
}: {
  title?: string;
  id: string;
  isSelected?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start", {
        "bg-accent text-accent-foreground": isSelected,
      })}
    >
      <Link
        href={`/admin/dashboard/article/${id}`}
        className="flex items-center gap-2 size-full"
      >
        <FileText className="size-5" />
        {title ? title : "Untitled"}
      </Link>
    </Button>
  );
}

export default ArticleLink;
