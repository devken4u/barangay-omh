"use client";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useActionState } from "react";
import { updateAnnouncementAction } from "@/app/actions/announcement";
import toast from "react-hot-toast";
import { Announcement } from "../announcement-table/columns";

function AnnouncementEdit({
  announcement,
  setIsOpen,
}: {
  announcement: Announcement;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [announcementState, announcementAction, isAnnouncementActionPending] =
    useActionState(async (_: any, formData: FormData) => {
      if (announcement.description === formData.get("description")) {
        return;
      }
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
      <div className="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={isAnnouncementActionPending}
          type="submit"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          {isAnnouncementActionPending && <Loader className="animate-spin" />}
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AnnouncementEdit;
