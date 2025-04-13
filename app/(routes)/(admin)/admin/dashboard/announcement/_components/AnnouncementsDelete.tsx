"use client";

import { deleteAnnouncementsAction } from "@/app/actions/announcement";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { startTransition, useActionState, useState } from "react";
import { Announcement } from "../announcement-table/columns";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import toast from "react-hot-toast";
import { Table } from "@tanstack/react-table";

function AnnouncementsDelete({
  table,
  announcements,
}: {
  table: any;
  announcements: Announcement[];
}) {
  const [deleteState, deleteAction, isPending] = useActionState(async () => {
    table?.resetRowSelection();
    await deleteAnnouncementsAction(announcements)
      .then(() => {
        toast.success("Announcements are successfully deleted.", {
          duration: 4000,
        });
      })
      .catch(() => {
        toast.error("Announcements delete failed.", {
          duration: 4000,
        });
      });
  }, null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        disabled={isPending}
        size="sm"
        variant="destructive"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {isPending && <Loader className="animate-spin" />}
        Delete Selected
      </Button>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Delete announcements?"}
      >
        <div>
          <p className="text-sm text-muted-foreground">
            Deleting these announcements means permanently erasing in the
            database.
          </p>
          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              onClick={() => {
                setIsOpen(false);
                startTransition(() => deleteAction());
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

export default AnnouncementsDelete;
