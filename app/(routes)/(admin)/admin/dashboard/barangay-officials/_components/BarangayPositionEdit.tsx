"use client";

import React, {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useState,
} from "react";
import { OfficialPosition } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { updateOfficialPositionAction } from "@/app/actions/barangayOfficialPosition";
import toast from "react-hot-toast";

function BarangayPositionEdit({
  position,
  setIsOpen,
}: {
  position: OfficialPosition;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [title, setTitle] = useState(position.title);
  const [state, action, isPending] = useActionState(async () => {
    await updateOfficialPositionAction(title, position._id).then(() => {
      setIsOpen(false);
      toast.success("Position updated");
    });
  }, null);

  return (
    <div className="space-y-2">
      <form
        className="space-y-1"
        id="barangay-official-position-form"
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(() => {
            action();
          });
        }}
      >
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter position title"
          required={true}
        />
      </form>
      <div className="flex gap-2 justify-end">
        <Button
          onClick={() => {
            setIsOpen(false);
          }}
          variant="destructive"
          size="sm"
        >
          Cancel
        </Button>
        <Button
          disabled={isPending}
          type="submit"
          form="barangay-official-position-form"
          size="sm"
        >
          {isPending && <Loader className="animate-spin" />}
          Update
        </Button>
      </div>
    </div>
  );
}

export default BarangayPositionEdit;
