import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
} from "react";
import { deleteAnnouncementAction } from "@/app/actions/announcement";
import toast from "react-hot-toast";

function AnnouncementDelete({
  id,
  setIsOpen,
}: {
  id: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
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
    <div>
      <p className="text-sm text-muted-foreground">
        Deleting this announcement means permanently erasing in the database.
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
            startTransition(() => announcementAction());
          }}
        >
          {isPending && <Loader className="animate-spin" />}
          Continue
        </Button>
      </div>
    </div>
  );
}

export default AnnouncementDelete;
