import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

function DeleteArticle({ id }: { id: string }) {
  return (
    <div>
      <Button variant="destructive">
        <Trash2 />
      </Button>
    </div>
  );
}

export default DeleteArticle;
