"use client";

import { Business } from "@/types";
import React, { startTransition, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import {
  openBusinessAction,
  closeBusinessAction,
  deleteBusinessAction,
} from "@/app/actions/business";
import toast from "react-hot-toast";

function BusinessCard({ business }: { business: Business }) {
  const [state, action, isPending] = useActionState(async () => {
    return await deleteBusinessAction(business._id).then(() => {
      toast.success("Business deleted.");
    });
  }, null);

  const [state2, action2, isPending2] = useActionState(async () => {
    return await closeBusinessAction(business._id).then(() => {
      toast.success("Business closed.");
    });
  }, null);

  const [state3, action3, isPending3] = useActionState(async () => {
    return await openBusinessAction(business._id).then(() => {
      toast.success("Business opened.");
    });
  }, null);

  return (
    <div className="border p-2 rounded-md">
      <p className="text-center font-bold">{business.business_name}</p>
      <div>
        <p className="font-semibold">Description</p>
        <p className="pl-2">{business.business_description}</p>
      </div>
      <div>
        <p className="font-semibold">Address</p>
        <p className="pl-2">{business.business_address}</p>
      </div>
      <div>
        <p className="font-semibold">Contact</p>
        <p className="pl-2">{business.business_contact}</p>
      </div>
      <div className="py-2">
        <span
          className={cn(
            "px-2 py-1 font-semibold rounded-md",
            business.request_status === "pending" && "bg-yellow-500 text-white",
            business.request_status === "approved" && "bg-green-500 text-white",
            business.request_status === "rejected" && "bg-red-500 text-white"
          )}
        >
          {business.request_status === "pending" && "Pending"}
          {business.request_status === "approved" && "Approved"}
          {business.request_status === "rejected" && "Rejected"}
        </span>
      </div>
      <div>
        {business.request_status === "approved" && (
          <>
            <p className="font-semibold">Approved by </p>
            <p>{business.request_status_updated_by}</p>
          </>
        )}
        {business.request_status === "rejected" && (
          <>
            <p className="font-semibold">Rejected by </p>
            <p>{business.request_status_updated_by}</p>
          </>
        )}
      </div>
      <div className="flex justify-end mt-2 space-x-2">
        {business.is_closed === true ? (
          <Button
            disabled={isPending3}
            size="sm"
            onClick={() => {
              startTransition(() => {
                action3();
              });
            }}
          >
            {isPending3 && <Loader className="animate-spin" />}
            Open
          </Button>
        ) : (
          <Button
            disabled={isPending2}
            size="sm"
            onClick={() => {
              startTransition(() => {
                action2();
              });
            }}
          >
            {isPending2 && <Loader className="animate-spin" />}
            Close
          </Button>
        )}

        <Button
          disabled={isPending}
          variant="destructive"
          size="sm"
          onClick={() => {
            startTransition(() => {
              action();
            });
          }}
        >
          {isPending && <Loader className="animate-spin" />}
          Delete
        </Button>
      </div>
    </div>
  );
}

export default BusinessCard;
