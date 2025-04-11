import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader } from "lucide-react";
import { startTransition, useActionState } from "react";
import { deleteAnnouncementAction } from "@/app/actions/announcement";
import toast from "react-hot-toast";

function AnnouncementDelete({ id }: { id: string }) {
  const [announcementState, announcementAction, isPending] = useActionState(
    async (_: any) => {
      return await deleteAnnouncementAction(id)
        .then(() => {
          toast.success("Announcement successfully deleted.", {
            duration: 4000,
          });
        })
        .catch(() => {
          toast.error("Announcement failed to delete.", {
            duration: 4000,
          });
        });
    },
    null
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending} variant="destructive" className="w-full">
          <Trash2 className="text-background" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            hotline in the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={isPending}
              onClick={() => {
                startTransition(() => announcementAction());
              }}
            >
              {isPending && <Loader className="animate-spin" />}
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AnnouncementDelete;
