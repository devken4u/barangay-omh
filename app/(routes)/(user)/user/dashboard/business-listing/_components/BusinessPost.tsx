"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useActionState, useState } from "react";
import { createBusinessRequestAction } from "@/app/actions/business";
import toast from "react-hot-toast";

function BusinessPost() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      return await createBusinessRequestAction({
        business_address: formData.get("business_address") as string,
        business_contact: formData.get("business_contact") as string,
        business_description: formData.get("business_description") as string,
        business_name: formData.get("business_name") as string,
      }).then(() => {
        setIsOpen(false);
        toast.success("Business Approval Pending");
      });
    },
    null
  );

  return (
    <div>
      <div>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          variant="outline"
        >
          {isPending && <Loader className="animate-spin" />}
          Post Business
        </Button>
      </div>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Post Business"
      >
        <div className="overflow-y-auto gap-2 space-y-2">
          <form action={action} className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="business_name">Business Name</Label>
              <Input
                required
                placeholder="Enter business name"
                id="business_name"
                name="business_name"
              />
            </div>
            <div className="space-y-1 w-full">
              <Label htmlFor="business_address">Business Address</Label>
              <Input
                required
                placeholder="Enter business address"
                id="business_address"
                name="business_address"
              />
            </div>
            <div className="space-y-1 w-full">
              <Label htmlFor="business_description">Business Description</Label>
              <textarea
                required
                rows={3}
                className="max-w-full overflow-x-auto resize-none w-full p-2 text-sm border"
                placeholder="Enter business description"
                id="business_description"
                name="business_description"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="business_contact">Business Contact</Label>
              <Input
                required
                placeholder="Enter business contact"
                id="business_contact"
                name="business_contact"
              />
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending && <Loader className="animate-spin" />}
              Post Business
            </Button>
          </form>
        </div>
      </ResponsiveDialog>
    </div>
  );
}

export default BusinessPost;
