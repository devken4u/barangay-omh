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
import { Megaphone, Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useActionState, useRef } from "react";
import { createAnnouncementAction } from "@/app/actions/announcement";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

function AnnouncementForm() {
  const form = useRef<HTMLFormElement | null>(null);

  const [announcementState, announcementAction, isAnnouncementActionPending] =
    useActionState(async (_: any, formData: FormData) => {
      if (form.current) form.current.reset();
      return await createAnnouncementAction({
        description: formData.get("description") as string,
      })
        .then(() => {
          toast.success("Announcement successfully saved.", {
            duration: 4000,
          });
        })
        .catch(() => {
          toast.success("Announcement failed to save.", {
            duration: 4000,
          });
        });
    }, null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isAnnouncementActionPending} variant="outline">
          {isAnnouncementActionPending && <Loader className="animate-spin" />}
          <Megaphone />
          Add New Announcement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Announcement</DialogTitle>
          <DialogDescription>
            Enter the announcement's description
          </DialogDescription>
        </DialogHeader>
        <form ref={form} action={announcementAction} id="hotline-form">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              required
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

export default AnnouncementForm;
