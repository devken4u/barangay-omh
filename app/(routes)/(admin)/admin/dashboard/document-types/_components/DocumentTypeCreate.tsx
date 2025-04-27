"use client";

import { useTransition, useActionState, useState } from "react";
import { createDocumentTypeAction } from "@/app/actions/documentType";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

function DocumentTypeCreate() {
  const [open, setOpen] = useState(false);
  const [state, action, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      return await createDocumentTypeAction({
        name: formData.get("name") as string,
      }).then(() => {
        toast.success("New document type created");
        setOpen(false);
      });
    },
    null
  );

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        disabled={isPending}
        variant="outline"
      >
        {isPending && <Loader className="animate-spin" />}
        Create Document Type
      </Button>
      <ResponsiveDialog
        isOpen={open}
        setIsOpen={setOpen}
        title="Create document type"
      >
        <form action={action} className="space-y-1">
          <Label htmlFor="name">Document type</Label>
          <Input
            name="name"
            id="name"
            required
            placeholder="Enter document type name"
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                setOpen(false);
              }}
              size="sm"
              variant="destructive"
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending && <Loader className="animate-spin" />}
              Create
            </Button>
          </div>
        </form>
      </ResponsiveDialog>
    </div>
  );
}

export default DocumentTypeCreate;
