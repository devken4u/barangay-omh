import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocumentType } from "@/types";
import { Loader } from "lucide-react";
import { Dispatch, startTransition, useActionState, useState } from "react";
import { editDocumentTypeAction } from "@/app/actions/documentType";
import toast from "react-hot-toast";

function DocumentTypeEdit({
  setIsOpen,
  documentType,
}: {
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  documentType: DocumentType;
}) {
  const [name, setName] = useState(documentType.name);
  const [state, action, isPending] = useActionState(async () => {
    await editDocumentTypeAction({
      name,
      id: documentType._id,
    }).then(() => {
      setIsOpen(false);
      toast.success("Document type updated");
    });
  }, null);

  return (
    <div className="space-y-2">
      <form
        className="space-y-1"
        id="document-type-form"
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(() => {
            action();
          });
        }}
      >
        <Label htmlFor="title">Name</Label>
        <Input
          id="title"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
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
          form="document-type-form"
          size="sm"
        >
          {isPending && <Loader className="animate-spin" />}
          Update
        </Button>
      </div>
    </div>
  );
}

export default DocumentTypeEdit;
