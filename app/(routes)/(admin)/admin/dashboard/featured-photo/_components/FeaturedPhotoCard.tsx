"use client";

import { FeaturedPhoto } from "@/types";
import { formateDateV1 as formatDate } from "@/lib/utils";
import { MoveUp, MoveDown, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import {
  increaseOrderAction,
  decreaseOrderAction,
  toggleFeaturedPhotoVisibilityAction,
  deleteFeaturedPhotoAction,
} from "@/app/actions/featuredPhoto";
import { startTransition } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function FeaturedPhotoCard({
  featuredPhoto,
}: {
  featuredPhoto: FeaturedPhoto;
}) {
  const [
    increaseOrderState,
    increaseOrderStateAction,
    isIncreaseOrderStatePending,
  ] = useActionState(async (_: any, id: string) => {
    return await increaseOrderAction(id).then(() => {
      toast.success("Featured photo order updated.");
    });
  }, null);

  const [
    decreaseOrderState,
    decreaseOrderStateAction,
    isDecreaseOrderStatePending,
  ] = useActionState(async (_: any, id: string) => {
    return await decreaseOrderAction(id).then(() => {
      toast.success("Featured photo order updated.");
    });
  }, null);

  const [
    toggleVisibilityState,
    toggleVisibilityStateAction,
    isToggleVisibilityStatePending,
  ] = useActionState(async (_: any, id: string) => {
    return await toggleFeaturedPhotoVisibilityAction(id).then(() => {
      toast.success("Featured photo visibility updated.");
    });
  }, null);

  const [deleteState, deleteStateAction, isDeleteStatePending] = useActionState(
    async (_: any, { id, public_id }: { id: string; public_id: string }) => {
      return await deleteFeaturedPhotoAction(id, public_id)
        .then(() => {
          toast.success("Featured photo deleted.");
        })
        .catch(() => {
          toast.error("Featured photo delete failed.");
        });
    },
    null
  );

  return (
    <div
      className={cn("border-2 p-2 rounded-md relative", {
        "border-destructive": featuredPhoto.hidden,
      })}
    >
      <div className="absolute left-0 top-0 p-2 space-x-2">
        <Button
          variant="destructive"
          disabled={
            isIncreaseOrderStatePending ||
            isDecreaseOrderStatePending ||
            isToggleVisibilityStatePending ||
            isDeleteStatePending
          }
          onClick={() => {
            startTransition(() =>
              deleteStateAction({
                id: featuredPhoto._id,
                public_id: featuredPhoto.public_id,
              })
            );
          }}
          size="sm"
        >
          <Trash2 />
        </Button>
      </div>
      <div className="absolute right-0 top-0 p-2 space-x-2">
        <Button
          disabled={
            isIncreaseOrderStatePending ||
            isDecreaseOrderStatePending ||
            isToggleVisibilityStatePending ||
            isDeleteStatePending
          }
          onClick={() => {
            startTransition(() =>
              toggleVisibilityStateAction(featuredPhoto._id)
            );
          }}
          size="sm"
        >
          {featuredPhoto.hidden ? <EyeOff /> : <Eye />}
        </Button>
        <Button
          disabled={
            isIncreaseOrderStatePending ||
            isDecreaseOrderStatePending ||
            isToggleVisibilityStatePending ||
            isDeleteStatePending
          }
          onClick={() => {
            startTransition(() => increaseOrderStateAction(featuredPhoto._id));
          }}
          size="sm"
        >
          <MoveUp />
        </Button>
        <Button
          disabled={
            isIncreaseOrderStatePending ||
            isDecreaseOrderStatePending ||
            isToggleVisibilityStatePending ||
            isDeleteStatePending
          }
          onClick={() => {
            startTransition(() => decreaseOrderStateAction(featuredPhoto._id));
          }}
          size="sm"
        >
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
        <p>uploaded at:</p>
        <p className="font-bold">
          {formatDate(featuredPhoto.createdAt.toString())}
        </p>
      </div>
    </div>
  );
}
