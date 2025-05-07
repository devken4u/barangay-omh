"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useActionState, useRef, useState } from "react";
import { createQueueAction } from "@/app/actions/queue";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

function QueueAdd() {
  const form = useRef<HTMLFormElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [state, action, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      if (form.current) form.current.reset();
      return await createQueueAction({
        person_name: formData.get("person_name") as string,
      })
        .then(() => {
          toast.success("Queue successfully added.");
        })
        .catch(() => {
          toast.error("Queue failed to add.");
        });
    },
    null
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={isPending} variant="outline">
          {isPending && <Loader className="animate-spin" />}
          Add Queue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Queue</DialogTitle>
        </DialogHeader>
        <form ref={form} action={action} id="queue-form">
          <div className="space-y-2">
            <Label htmlFor="person_name">Person Name</Label>
            <Input
              required
              className="w-full resize-none border rounded-md p-2 text-sm"
              placeholder="Enter person name"
              name="person_name"
              id="person_name"
            />
          </div>
        </form>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            disabled={isPending}
            type="submit"
            form="queue-form"
          >
            {isPending && <Loader className="animate-spin" />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QueueAdd;
