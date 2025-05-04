"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { ImageUp, Loader, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createJobAction } from "@/app/actions/job";

function JobCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [state, action, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      return await createJobAction(formData).then(() => {
        setPreview(null);
        setIsOpen(false);
        toast.success("Job Opening Approval Pending");
      });
    },
    null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const MAX_SIZE_MB = 20; // adjust as needed
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    if (!file) return;

    if (file.size > MAX_SIZE_BYTES) {
      toast.error(`File is too large. Max size is ${MAX_SIZE_MB}MB.`, {
        duration: 4000,
      });
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

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
          Post Job Opening
        </Button>
      </div>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Post Job Opening"
      >
        <div className="overflow-y-auto gap-2 space-y-2">
          <div className="flex justify-center">
            {preview ? (
              <div className="bg-secondary rounded-md overflow-hidden relative p-2 size-60">
                <img
                  src={preview}
                  alt="Preview"
                  className="size-full object-contain"
                />
                <Button
                  disabled={isPending}
                  onClick={() => setPreview(null)}
                  className="rounded-full absolute right-2 top-2 size-7"
                  variant="destructive"
                >
                  <X className="size-5" />
                </Button>
              </div>
            ) : (
              <Label
                htmlFor="file"
                className="bg-secondary rounded-md overflow-hidden  cursor-pointer size-60"
              >
                <div className="size-full">
                  <div className="flex flex-col justify-center items-center size-full text-gray-400">
                    <ImageUp className="size-20" />
                    <div>COMPANY LOGO</div>
                  </div>
                </div>
              </Label>
            )}
          </div>
          <form action={action} className="space-y-2">
            <Input
              id="file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
              name="file"
            />
            <div className="space-y-1">
              <Label htmlFor="job_titles">Job Title(s)</Label>
              <Input
                required
                placeholder="Enter job title(s)"
                id="job_titles"
                name="job_titles"
              />
            </div>
            <div className="space-y-1 w-full">
              <Label htmlFor="job_description">Job description</Label>
              <textarea
                required
                rows={3}
                className="max-w-full overflow-x-auto resize-none w-full p-2 text-sm border"
                placeholder="Enter job description"
                id="job_description"
                name="job_description"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="company_name">Company name</Label>
              <Input
                required
                placeholder="Enter company name"
                id="company_name"
                name="company_name"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="company_address">Company address</Label>
              <Input
                required
                placeholder="Enter company address"
                id="company_address"
                name="company_address"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="contact_number">Contact number</Label>
              <Input
                required
                placeholder="Enter job title(s)"
                id="contact_number"
                name="contact_number"
              />
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending && <Loader className="animate-spin" />}
              Post Job
            </Button>
          </form>
        </div>
      </ResponsiveDialog>
    </div>
  );
}

export default JobCreate;
