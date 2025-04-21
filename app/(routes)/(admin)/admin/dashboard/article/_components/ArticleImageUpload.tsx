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
import { ImageUp, Loader, X, Image } from "lucide-react";
import { uploadImageAction } from "@/app/actions/cloudinary";

import toast from "react-hot-toast";
import { updateArticleImageAction } from "@/app/actions/article";

export default function ArticleImageUpload({ id }: { id: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [state, action, isPending] = useActionState(uploadImageAction, null);

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

  useEffect(() => {
    if (state?.status === "success") {
      setPreview(null);
      toast.success("Article image upload is successful.", {
        duration: 4000,
      });
    }
    if (state?.image) {
      (async () => {
        await updateArticleImageAction(
          state?.image.secure_url,
          state?.image.public_id,
          id
        );
      })();
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Image />
          Add Cover
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Article Photo</DialogTitle>
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
