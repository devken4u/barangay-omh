"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useState } from "react";
import { createBarangayOfficialAction } from "@/app/actions/barangayOfficial";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { ImageUp, Loader, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { OfficialPosition } from "@/types";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function BarangayOfficialCreate({
  positions,
}: {
  positions: OfficialPosition[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [state, action, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      return await createBarangayOfficialAction(_, formData).then(() => {
        setPreview(null);
        setIsOpen(false);
        toast.success("New official added");
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
          Add Official
        </Button>
      </div>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add Barangay Official"
      >
        <div className="overflow-y-auto max-h-96">
          <div className="flex justify-center">
            {preview ? (
              <div className="bg-secondary rounded-md overflow-hidden h-72 relative p-2 w-52">
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
                className="bg-secondary rounded-md overflow-hidden h-72 cursor-pointer w-52"
              >
                <div className="size-full">
                  <div className="flex flex-col justify-center items-center size-full text-gray-400">
                    <ImageUp className="size-20" />
                    <div>UPLOAD</div>
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
              <Label htmlFor="name">Name</Label>
              <Input required placeholder="Enter name" id="name" name="name" />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Select required name="position">
                <SelectTrigger id="position" className="w-full">
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {positions &&
                      positions.map((position) => {
                        return (
                          <SelectItem
                            className="hover:bg-muted"
                            value={position._id}
                            key={position._id}
                          >
                            {position.title}
                          </SelectItem>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 w-full">
              <Label htmlFor="titles">Titles</Label>
              <textarea
                rows={3}
                className="max-w-full overflow-x-auto resize-none w-full p-2 text-sm border"
                placeholder="Enter titles"
                id="titles"
                name="titles"
              />
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending && <Loader className="animate-spin" />}
              Add
            </Button>
          </form>
        </div>
      </ResponsiveDialog>
    </div>
  );
}

export default BarangayOfficialCreate;
