import { FeaturedPhoto } from "@/types";
import { formateDateV1 as formatDate } from "@/lib/utils";
import { MoveUp, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { increaseOrder } from "@/db/featuredPhoto/featuredPhoto";
import { revalidatePath } from "next/cache";

export default function FeaturedPhotoCard({
  featuredPhoto,
}: {
  featuredPhoto: FeaturedPhoto;
}) {
  console.log(featuredPhoto);

  return (
    <div className="border-2 p-2 rounded-md relative">
      <div className="absolute right-0 top-0 p-2 space-x-2">
        <form
          action={async () => {
            "use server";
            await increaseOrder(featuredPhoto._id);
            revalidatePath("/admin/dashboard/featured-photo");
          }}
        >
          <Button size="sm">
            <MoveUp />
          </Button>
        </form>
        <Button size="sm">
          <MoveDown />
        </Button>
      </div>
      <div className="w-full h-56">
        <img
          src={featuredPhoto.url}
          alt="featured-photo"
          className="size-full object-contain"
        />
      </div>
      <div className="text-sm font-mono">
        <p>uploaded by:</p>
        <p className="font-bold">{featuredPhoto.uploaded_by}</p>
      </div>
      <div className="text-sm font-mono">
        <p>uploaded at:</p>
        <p className="font-bold">
          {formatDate(featuredPhoto.createdAt.toString())}
        </p>
      </div>
    </div>
  );
}
