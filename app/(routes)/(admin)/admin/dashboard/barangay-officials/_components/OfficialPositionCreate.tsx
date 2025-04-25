"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useActionState, useState } from "react";
import { createOfficialPositionAction } from "@/app/actions/barangayOfficialPosition";
import { startTransition } from "react";
import { Label } from "@/components/ui/label";

function OfficialPositionCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const [state, action, isPending] = useActionState(async () => {
    await createOfficialPositionAction(title).then(() => {
      setTitle("");
      setIsOpen(false);
    });
  }, null);

  return (
    <div>
      <div>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          variant="outline"
        >
          {isPending && <Loader className="animate-spin" />}
          Add Position
        </Button>
      </div>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Enter position title"
      >
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
              Add
            </Button>
          </div>
        </div>
      </ResponsiveDialog>
    </div>
  );
}

export default OfficialPositionCreate;
