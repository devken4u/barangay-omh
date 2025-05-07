"use client";

import { Button } from "@/components/ui/button";
import { Queue } from "@/types";
import { useActionState, startTransition } from "react";
import { deleteQueueAction } from "@/app/actions/queue";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

function QueueDelete({ row }: { row: Queue }) {
  const [state, action, isPending] = useActionState(async () => {
    return await deleteQueueAction(row._id).then(() => {
      toast.success("Removed");
    });
  }, null);

  return (
    <Button
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          action();
        });
      }}
      variant="destructive"
      size="sm"
    >
      {isPending && <Loader className="animate-spin" />}
      Remove
    </Button>
  );
}

export default QueueDelete;
