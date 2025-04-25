import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
} from "react";
import { deleteBarangayOfficialPositionAction } from "@/app/actions/barangayOfficialPosition";
import toast from "react-hot-toast";

function BarangayPositionDelete({
  id,
  setIsOpen,
}: {
  id: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [positionState, positionAction, isPending] = useActionState(
    async (_: any) => {
      return await deleteBarangayOfficialPositionAction(id)
        .then(() => {
          toast.success("Barangay position successfully deleted.", {
            duration: 4000,
          });
        })
        .catch(() => {
          toast.error("Barangay position failed to delete.", {
            duration: 4000,
          });
        });
    },
    null
  );

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Deleting this position means permanently erasing in the database.
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
            startTransition(() => positionAction());
          }}
        >
          {isPending && <Loader className="animate-spin" />}
          Continue
        </Button>
      </div>
    </div>
  );
}

export default BarangayPositionDelete;
