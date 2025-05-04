"use client";

import { Job } from "@/types";
import { Image, Loader } from "lucide-react";
import { cn, formateDateV1 } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useActionState, startTransition } from "react";
import {
  deleteJobAction,
  closeJobRequestAction,
  openJobRequestAction,
} from "@/app/actions/job";
import toast from "react-hot-toast";

function JobCard({ job }: { job: Job }) {
  const [state, action, isPending] = useActionState(async () => {
    return await deleteJobAction({
      id: job._id,
      public_id: job.public_id,
    }).then(() => {
      toast.success("Job deleted.");
    });
  }, null);

  const [state2, action2, isPending2] = useActionState(async () => {
    return await closeJobRequestAction({
      id: job._id,
    }).then(() => {
      toast.success("Job closed.");
    });
  }, null);

  const [state3, action3, isPending3] = useActionState(async () => {
    return await openJobRequestAction({
      id: job._id,
    }).then(() => {
      toast.success("Job opened.");
    });
  }, null);

  return (
    <div className="border p-2 rounded-md">
      {job.image_url ? (
        <div className="w-full h-44">
          <img src={job.image_url} alt="company-logo" />
        </div>
      ) : (
        <div className="w-full h-44 flex justify-center">
          <Image className="size-full text-gray-400" />
        </div>
      )}
      <div>
        <div>
          <p className="font-semibold">Job Title(s) </p>
          <p>{job.job_titles}</p>
        </div>
        <div>
          <p className="font-semibold">Job Description </p>
          <textarea
            defaultValue={job.job_description}
            className="resize-none w-full"
            rows={3}
            disabled
          />
        </div>
        <div>
          <p className="font-semibold">Company Name </p>
          <p>{job.company_name}</p>
        </div>
        <div>
          <p className="font-semibold">Company Address </p>
          <p>{job.company_address}</p>
        </div>
        <div>
          <p className="font-semibold">Contact Number </p>
          <p>{job.contact_number}</p>
        </div>
        <div>
          <p className="font-semibold">Date Posted </p>
          <p>{formateDateV1(job.createdAt)}</p>
        </div>
        <div className="py-2">
          <span
            className={cn(
              "px-2 py-1 font-semibold rounded-md",
              job.request_status === "pending" && "bg-yellow-500 text-white",
              job.request_status === "approved" && "bg-green-500 text-white",
              job.request_status === "rejected" && "bg-red-500 text-white"
            )}
          >
            {job.request_status === "pending" && "Pending"}
            {job.request_status === "approved" && "Approved"}
            {job.request_status === "rejected" && "Rejected"}
          </span>
        </div>
        <div>
          {job.request_status === "approved" && (
            <>
              <p className="font-semibold">Approved by </p>
              <p>{job.request_status_updated_by}</p>
            </>
          )}
          {job.request_status === "rejected" && (
            <>
              <p className="font-semibold">Rejected by </p>
              <p>{job.request_status_updated_by}</p>
            </>
          )}
        </div>
        <div className="flex justify-end mt-2 space-x-2">
          {job.is_closed === true ? (
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
    </div>
  );
}

export default JobCard;
