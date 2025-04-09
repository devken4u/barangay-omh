"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { useActionState } from "react";
import { deleteHotlineAction } from "@/app/actions/hotline";
import { startTransition } from "react";

function HotlineDelete({ _id }: { _id: string }) {
  const [hotlineState, hotlineAction, isPending] = useActionState(
    async (_: any) => {
      return await deleteHotlineAction({ _id })
        .then(() => {
          console.log("success");
        })
        .catch(() => {
          console.log("failed");
        });
    },
    null
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isPending}
          className="rounded-full size-8"
          variant="destructive"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            hotline in the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={isPending}
              onClick={() => {
                startTransition(() => hotlineAction());
              }}
            >
              {isPending && <Loader className="animate-spin" />}
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default HotlineDelete;
