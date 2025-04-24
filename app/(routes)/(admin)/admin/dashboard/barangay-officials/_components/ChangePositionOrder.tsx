"use client";

import { Button } from "@/components/ui/button";
import { OfficialPosition } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useActionState } from "react";
import { startTransition } from "react";
import {
  movePositionOrderUpAction,
  movePositionOrderDownAction,
} from "@/app/actions/barangayOfficialPosition";
import toast from "react-hot-toast";

function ChangePositionOrder({
  officialPosition,
}: {
  officialPosition: OfficialPosition;
}) {
  const [upState, upAction, upPending] = useActionState(async () => {
    return await movePositionOrderUpAction(officialPosition._id).then(() => {
      toast.success("Position order updated");
    });
  }, null);

  const [downState, downAction, downPending] = useActionState(async () => {
    return await movePositionOrderDownAction(officialPosition._id).then(() => {
      toast.success("Position order updated");
    });
  }, null);

  return (
    <div className="space-x-4">
      <Button
        disabled={upPending}
        size="sm"
        onClick={() => {
          startTransition(() => {
            upAction();
          });
        }}
      >
        <ChevronUp className="size-6" />
      </Button>
      <Button
        disabled={downPending}
        size="sm"
        onClick={() => {
          startTransition(() => {
            downAction();
          });
        }}
      >
        <ChevronDown className="size-6" />
      </Button>
    </div>
  );
}

export default ChangePositionOrder;
