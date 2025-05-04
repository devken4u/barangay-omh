"use client";

import { Job } from "@/types";
import { useActionState, useEffect, startTransition, useState } from "react";
import { getRequestedJobsAction } from "@/app/actions/job";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobRequestCard from "./JobRequestCard";

function JobRequestList() {
  const [currentPage, setCurrentPage] = useState(0);

  const [jobs, getArticleAction, isPending] = useActionState(async () => {
    return await getRequestedJobsAction({
      limit: 15,
      skip: currentPage * 15,
    });
  }, null);

  useEffect(() => {
    startTransition(() => {
      getArticleAction();
    });
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-4 p-4 pt-0 grow overflow-hidden">
      <div>Total job posting request: {jobs?.total}</div>
      {!isPending && jobs?.data && jobs?.data.length > 0 && (
        <div className="space-x-2">
          <Button
            disabled={currentPage === 0 ? true : false}
            size="sm"
            onClick={() => {
              setCurrentPage((prev) => {
                return prev - 1;
              });
            }}
          >
            Prev
          </Button>
          <Button
            disabled={jobs?.pages === currentPage + 1 ? true : false}
            size="sm"
            onClick={() => {
              setCurrentPage((prev) => {
                return prev + 1;
              });
            }}
          >
            Next
          </Button>
        </div>
      )}
      {isPending && <Loader className="animate-spin shrink-0" />}
      {(!jobs?.data || jobs?.data.length < 1) && !isPending && <p>Empty</p>}
      {jobs?.data && (
        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-4 overflow-y-auto">
          {(jobs?.data as Job[]).map((job) => {
            return (
              <JobRequestCard cb={getArticleAction} job={job} key={job._id} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default JobRequestList;
