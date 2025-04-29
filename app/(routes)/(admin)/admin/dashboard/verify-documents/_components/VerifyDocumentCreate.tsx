"use client";

import { useState, useActionState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Label } from "@/components/ui/label";
import { DocumentType } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createVerifiedDocumentAction } from "@/app/actions/verifiedDocument";
import { Loader } from "lucide-react";
import QRCode from "qrcode";

function VerifyDocumentCreate({
  documentTypes,
}: {
  documentTypes: DocumentType[];
}) {
  const [open, setOpen] = useState(false);

  const [state, action, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      return await createVerifiedDocumentAction({
        document_type: formData.get("type") as string,
        owner_name: formData.get("owner") as string,
        remarks: formData.get("remarks") as string,
      }).then(async (verifiedLink: string) => {
        const dataUrl = await QRCode.toDataURL(verifiedLink, {
          width: 500,
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${formData.get("owner")}-${formData.get("type")}.png`;
        link.click();
        setOpen(false);
      });
    },
    null
  );

  return (
    <div>
      <Button
        disabled={isPending}
        onClick={() => {
          setOpen(true);
        }}
        variant="outline"
      >
        {isPending && <Loader className="animate-spin" />}
        Verify Document
      </Button>
      <ResponsiveDialog
        isOpen={open}
        setIsOpen={setOpen}
        title="Verify a document"
      >
        <form action={action} id="verify-document-form" className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="owner">Document Owner</Label>
            <Input
              required
              name="owner"
              id="owner"
              placeholder="Enter document owner name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="type">Document Type</Label>
            <Select required name="type">
              <SelectTrigger className="w-full" id="type">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {documentTypes &&
                    documentTypes.map((type) => {
                      return (
                        <SelectItem key={type._id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="remarks">Remarks</Label>
            <textarea
              placeholder="Remarks"
              name="remarks"
              id="remarks"
              className="w-full p-2 border text-sm resize-none"
              rows={3}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => {
                setOpen(false);
              }}
              type="button"
              size="sm"
              variant="destructive"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              form="verify-document-form"
              size="sm"
            >
              {isPending && <Loader className="animate-spin" />}
              Verify
            </Button>
          </div>
        </form>
      </ResponsiveDialog>
    </div>
  );
}

export default VerifyDocumentCreate;
