"use client";

import { Job } from "@/types";
import { Image, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActionState, startTransition } from "react";
import toast from "react-hot-toast";
import {
  approveJobRequestAction,
  rejectJobRequestAction,
} from "@/app/actions/job";
import { formateDateV1 } from "@/lib/utils";

function JobRequestCard({ job, cb }: { job: Job; cb: () => void }) {
  const [state, action, isPending] = useActionState(async () => {
    return await approveJobRequestAction({
      id: job._id,
    }).then(() => {
      toast.success("Job request approved.");
      startTransition(() => {
        cb();
      });
    });
  }, null);

  const [state2, action2, isPending2] = useActionState(async () => {
    return await rejectJobRequestAction({
      id: job._id,
    }).then(() => {
      toast.success("Job request rejected.");
      startTransition(() => {
        cb();
      });
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
          <p className="font-semibold">Posted By </p>
          <p>{job.created_by}</p>
        </div>
        <div>
          <p className="font-semibold">Date Posted </p>
          <p>{formateDateV1(job.createdAt)}</p>
        </div>
        <div className="mt-2 space-x-2">
          <Button
            disabled={isPending}
            size="sm"
            onClick={() => {
              startTransition(() => {
                action();
              });
            }}
          >
            {isPending && <Loader className="animate-spin" />}
            Approve
          </Button>
          <Button
            disabled={isPending}
            size="sm"
            variant="destructive"
            onClick={() => {
              startTransition(() => {
                action2();
              });
            }}
          >
            {isPending2 && <Loader className="animate-spin" />}
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JobRequestCard;
