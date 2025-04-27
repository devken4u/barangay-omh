"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import { startTransition, useActionState, useState } from "react";
import toast from "react-hot-toast";
import { deleteBarangayOfficialAction } from "@/app/actions/barangayOfficial";
import { Official } from "@/types";

function BarangayOfficialDelete({ official }: { official: Official }) {
  const [open, setOpen] = useState(false);

  const [positionState, positionAction, isPending] = useActionState(
    async (_: any) => {
      return await deleteBarangayOfficialAction(official)
        .then(() => {
          toast.success("Barangay official successfully deleted.", {
            duration: 4000,
          });
        })
        .catch(() => {
          toast.error("Barangay official failed to delete.", {
            duration: 4000,
          });
        });
    },
    null
  );

  return (
    <div>
      <Button
        disabled={isPending}
        variant="destructive"
        size="sm"
        onClick={() => {
          setOpen(true);
        }}
      >
        {isPending && <Loader className="animate-spin" />}
        <Trash />
      </Button>
      <ResponsiveDialog
        isOpen={open}
        setIsOpen={setOpen}
        title="Delete barangay official?"
      >
        <div>
          <p className="text-sm text-muted-foreground">
            Deleting this position means permanently erasing in the database.
          </p>
          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              onClick={() => {
                setOpen(false);
                startTransition(() => positionAction());
              }}
            >
              {isPending && <Loader className="animate-spin" />}
              Continue
            </Button>
          </div>
        </div>
      </ResponsiveDialog>
    </div>
  );
}

export default BarangayOfficialDelete;
