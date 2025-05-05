import { Job } from "@/types";
import { Image } from "lucide-react";
import { formateDateV1 } from "@/lib/utils";

function ApprovedJobCard({ job }: { job: Job }) {
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
      </div>
    </div>
  );
}

export default ApprovedJobCard;
