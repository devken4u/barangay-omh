"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useActionState, useRef } from "react";
import { updateAnnouncementAction } from "@/app/actions/announcement";
import toast from "react-hot-toast";
import { Announcement } from "../announcement-table/columns";

function AnnouncementEdit({
  announcement,
  open,
  setIsOpen,
}: {
  announcement: Announcement;
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [announcementState, announcementAction, isAnnouncementActionPending] =
    useActionState(async (_: any, formData: FormData) => {
      return await updateAnnouncementAction({
        id: announcement._id,
        description: formData.get("description") as string,
      })
        .then(() => {
          toast.success("Announcement successfully edited.", {
            duration: 4000,
          });
        })
        .catch(() => {
          toast.error("Announcement failed to edit.", {
            duration: 4000,
          });
        });
    }, null);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Announcement</DialogTitle>
          <DialogDescription>Edit announcement's description</DialogDescription>
        </DialogHeader>
        <form action={announcementAction} id="hotline-form">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              required
              defaultValue={announcement.description}
              className="w-full resize-none border rounded-md p-2 text-sm"
              rows={5}
              placeholder="Enter announcement description"
              name="description"
              id="description"
            />
          </div>
        </form>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
              }
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={isAnnouncementActionPending}
            type="submit"
            form="hotline-form"
          >
            {isAnnouncementActionPending && <Loader className="animate-spin" />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AnnouncementEdit;
