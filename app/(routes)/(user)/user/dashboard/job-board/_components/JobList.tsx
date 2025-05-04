import { getUserPostedJobs } from "@/db/job/job";
import { Job } from "@/types";
import { auth } from "@/auth";
import JobCard from "./JobCard";

async function JobList() {
  const session = await auth();
  const jobs: Job[] = await getUserPostedJobs(session?.user.email!);
  const data: Job[] = JSON.parse(JSON.stringify(jobs));

  return (
    <div className="grid [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] gap-4 py-4">
      {data.length > 0 &&
        data.map((job) => {
          return <JobCard key={job._id} job={job} />;
        })}
      {data.length < 1 && <h1 className="p-4">No job posted</h1>}
    </div>
  );
}

export default JobList;
