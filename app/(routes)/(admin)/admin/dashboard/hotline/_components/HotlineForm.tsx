"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PhoneCall, Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useActionState, useRef } from "react";
import { createHotlineAction } from "@/app/actions/hotline";
import { HotlineFormType } from "../_types/hotline";
import toast from "react-hot-toast";

function HotlineForm({
  addOptimisticHotline,
}: {
  addOptimisticHotline: (action: HotlineFormType) => void;
}) {
  const form = useRef<HTMLFormElement | null>(null);

  const [hotlineState, hotlineAction, isHotlineActionPending] = useActionState(
    async (_: any, formData: FormData) => {
      if (form.current) form.current.reset();
      //   addOptimisticHotline({
      //     label: formData.get("label") as string,
      //     number: formData.get("number") as string,
      //     _id: Math.random().toString(),
      //   });
      return await createHotlineAction({
        label: formData.get("label") as string,
        number: formData.get("number") as string,
      })
        .then(() => {
          toast.success("Hotline successfully saved.", {
            duration: 4000,
          });
        })
        .catch(() => {
          toast.error("Hotline failed to save.", {
            duration: 4000,
          });
        });
    },
    null
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isHotlineActionPending} variant="outline">
          {isHotlineActionPending && <Loader className="animate-spin" />}
          <PhoneCall />
          Add Hotline
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Hotline Number</DialogTitle>
          <DialogDescription>
            Enter the hotline's number and label
          </DialogDescription>
        </DialogHeader>
        <form
          ref={form}
          action={hotlineAction}
          className="flex flex-col gap-2"
          id="hotline-form"
        >
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              required={true}
              name="label"
              placeholder="Enter hotline label"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hotline">Hotline</Label>
            <Input
              required={true}
              name="number"
              placeholder="Enter hotline number"
            />
          </div>
        </form>
        <DialogFooter>
          <Button
            disabled={isHotlineActionPending}
            type="submit"
            form="hotline-form"
          >
            {isHotlineActionPending && <Loader className="animate-spin" />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default HotlineForm;
