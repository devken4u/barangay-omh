"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteArticleAction } from "@/app/actions/article";
import { useActionState } from "react";
import { redirect } from "next/navigation";
import { startTransition } from "react";

function ArticleDelete({ id }: { id: string }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [state, action, isPending] = useActionState(async () => {
    await deleteArticleAction(id).then(() => {
      redirect("/admin/dashboard/article");
    });
  }, null);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setIsDeleteOpen(true);
        }}
        className="flex hover:cursor-pointer"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
        <span className="text-destructive">Delete</span>
      </Button>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title={"Delete article?"}
      >
        <div>
          <p className="text-sm text-muted-foreground">
            Deleting this article means permanently erasing in the database.
          </p>
          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              onClick={() => {
                setIsDeleteOpen(false);
                startTransition(() => {
                  action();
                });
              }}
            >
              {isPending && <Loader className="animate-spin" />}
              Continue
            </Button>
          </div>
        </div>
      </ResponsiveDialog>
    </>
  );
}

export default ArticleDelete;
