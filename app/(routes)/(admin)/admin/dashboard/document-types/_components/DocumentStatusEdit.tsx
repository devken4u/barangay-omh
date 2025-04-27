import { DocumentType } from "@/types";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startTransition, useActionState, useEffect, useState } from "react";
import { setDocumentStatusAction } from "@/app/actions/documentType";
import toast from "react-hot-toast";

function DocumentStatusEdit({ row }: { row: DocumentType }) {
  const [status, setStatus] = useState(row.is_disabled ? "1" : "0");
  const [state, action, isPending] = useActionState(async () => {
    await setDocumentStatusAction({
      status: status === "1" ? true : false,
      id: row._id,
    }).then(() => {
      toast.success("Document status updated");
    });
  }, null);

  useEffect(() => {
    const currentStatus = status === "1" ? true : false;
    if (!(currentStatus === row.is_disabled)) {
      startTransition(() => {
        action();
      });
    }
  }, [status]);

  return (
    <Select
      disabled={isPending}
      value={status}
      onValueChange={(value) => {
        setStatus(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={"0"}>Enabled</SelectItem>
          <SelectItem value={"1"}>Disabled</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default DocumentStatusEdit;
