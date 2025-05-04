"use client";

import { Job } from "@/types";
import { Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useActionState, startTransition } from "react";
import { deleteJobAction } from "@/app/actions/job";

function JobCard({ job }: { job: Job }) {
  const [state, action, isPending] = useActionState(async () => {
    return await deleteJobAction({ id: job._id, public_id: job.public_id })
      .then(() => {})
      .catch(() => {});
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
        <div className="py-2">
          <span
            className={cn(
              "px-2 py-1 font-semibold rounded-md",
              job.is_approved
                ? "bg-green-500 text-white"
                : "bg-yellow-500 text-white"
            )}
          >
            {job.is_approved ? "Approved" : "Pending"}
          </span>
        </div>
        <div className="flex justify-end">
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
