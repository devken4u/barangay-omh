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
import { Loader, Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { updateHotlineAction } from "@/app/actions/hotline";
import { HotlineFormType } from "../_types/hotline";
import toast from "react-hot-toast";

function HotlineEditForm({ hotline }: { hotline: HotlineFormType }) {
  const [hotlineState, hotlineAction, isHotlineActionPending] = useActionState(
    async (_: any, formData: FormData) => {
      if (
        hotline.label == (formData.get("label") as string) &&
        hotline.number == (formData.get("number") as string)
      )
        return;

      return await updateHotlineAction({
        _id: hotline._id,
        label: formData.get("label") as string,
        number: formData.get("number") as string,
      })
        .then(() => {
          toast.success("Hotline successfully updated.", {
            duration: 4000,
          });
        })
        .catch(() => {
          toast.success("Hotline failed to update.", {
            duration: 4000,
          });
        });
    },
    null
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={isHotlineActionPending}
          className="rounded-full size-8"
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edi Hotline Number</DialogTitle>
          <DialogDescription>Edit hotline's number and label</DialogDescription>
        </DialogHeader>
        <form
          action={hotlineAction}
          className="flex flex-col gap-2"
          id="hotline-form"
        >
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              disabled={isHotlineActionPending}
              defaultValue={hotline.label}
              required={true}
              name="label"
              placeholder="Enter hotline label"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hotline">Hotline</Label>
            <Input
              disabled={isHotlineActionPending}
              defaultValue={hotline.number}
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

export default HotlineEditForm;
