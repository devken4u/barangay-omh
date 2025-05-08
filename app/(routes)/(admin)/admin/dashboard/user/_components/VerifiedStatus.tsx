"use client";

import { User } from "@/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useState, useEffect, startTransition } from "react";
import { updateAccountStatusAction } from "@/app/actions/user";
import toast from "react-hot-toast";

function VerifiedStatus({ row }: { row: User }) {
  const [status, setStatus] = useState(String(row.is_verified));
  const [state, action, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      const is_verified =
        (formData.get("status") as string) === "true" ? true : false;
      return await updateAccountStatusAction({
        id: row._id,
        is_verified,
      }).then(() => {
        toast.success("Account status updated.");
      });
    },
    null
  );

  return (
    <Select
      disabled={isPending}
      value={status}
      onValueChange={(value) => {
        const formData = new FormData();
        formData.append("status", value);
        startTransition(() => {
          action(formData);
        });
        setStatus(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Account status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="true">
          <span className="text-green-500 font-semibold">Verified</span>
        </SelectItem>
        <SelectItem value="false">
          <span className="text-red-500 font-semibold">Unverified</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default VerifiedStatus;
