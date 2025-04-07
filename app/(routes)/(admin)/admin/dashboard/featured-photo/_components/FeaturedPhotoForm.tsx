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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useActionState, useEffect } from "react";
import { ImageUp, Loader, X } from "lucide-react";
import { uploadImageAction } from "@/app/actions/cloudinary";
import { createFeaturedPhotoAction } from "@/app/actions/featuredPhoto";
import toast from "react-hot-toast";

export default function FeaturedPhotoForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [state, action, isPending] = useActionState(uploadImageAction, null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (state?.status === "success") {
      setPreview(null);
      toast.success("Featured photo upload is successful.", {
        duration: 4000,
      });
    }
    if (state?.image) {
      (async () => {
        await createFeaturedPhotoAction({
          public_id: state?.image.public_id,
          uploaded_by: "devken4u@gmail.com",
          url: state?.image.secure_url,
        });
      })();
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ImageUp />
          Upload Featured Photo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload New Featured Photo</DialogTitle>
          <DialogDescription>
            Select a picture and click upload when done.
          </DialogDescription>
        </DialogHeader>
        {preview ? (
          <div className="bg-secondary rounded-md overflow-hidden h-44 relative p-2">
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
            className="bg-secondary rounded-md overflow-hidden h-44 cursor-pointer"
          >
            <div className="size-full">
              <div className="flex flex-col justify-center items-center size-full text-gray-400">
                <ImageUp className="size-20" />
                <div>UPLOAD</div>
              </div>
            </div>
          </Label>
        )}
        <DialogFooter>
          <form action={action}>
            <Input
              id="file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
              name="file"
              required
            />
            <Button disabled={isPending} type="submit">
              {isPending && <Loader className="animate-spin" />}
              <ImageUp />
              Upload
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
