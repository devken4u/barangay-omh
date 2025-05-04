"use server";

import { auth } from "@/auth";
import {
  createJob,
  deleteJob,
  getRequestedJobs,
  approveJobRequest,
  rejectJobRequest,
  closeJobRequest,
  openJobRequest,
} from "@/db/job/job";
import { CreateLog } from "@/db/log/log";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function createJobAction(formData: FormData) {
  try {
    const session = await auth();
    const file = formData.get("file") as File;
    const image = await uploadImage(file);

    if (image) {
      const job = await createJob({
        company_address: formData.get("company_address") as string,
        company_name: formData.get("company_name") as string,
        contact_number: formData.get("contact_number") as string,
        job_description: formData.get("job_description") as string,
        job_titles: formData.get("job_titles") as string,
        created_by: session?.user.email!,
        image_url: image.secure_url,
        public_id: image.public_id,
      });
      await CreateLog({
        email: session?.user.email!,
        action: "CREATE",
        message: "Created a job post.",
      });
      revalidatePath("/user/dashboard/job-board");
      if (job) return true;
    } else {
      const job = await createJob({
        company_address: formData.get("company_address") as string,
        company_name: formData.get("company_name") as string,
        contact_number: formData.get("contact_number") as string,
        job_description: formData.get("job_description") as string,
        job_titles: formData.get("job_titles") as string,
        created_by: session?.user.email!,
      });
      await CreateLog({
        email: session?.user.email!,
        action: "CREATE",
        message: "Created a job post.",
      });
      revalidatePath("/user/dashboard/job-board");
      if (job) return true;
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteJobAction({
  id,
  public_id,
}: {
  id: string;
  public_id?: string;
}) {
  try {
    if (public_id) await deleteImage(public_id);
    await deleteJob(id);
    const session = await auth();
    await CreateLog({
      email: session?.user.email!,
      action: "DELETE",
      message: "Deleted a job post.",
    });
    revalidatePath("/user/dashboard/job-board");
  } catch (error) {
    throw error;
  }
}

export async function getRequestedJobsAction({
  limit = 20,
  skip = 0,
}: {
  limit?: number;
  skip?: number;
}) {
  try {
    const jobs = await getRequestedJobs({ limit, skip });
    return {
      data: jobs.data,
      pages: Math.ceil(jobs.total / limit),
      total: jobs.total,
    };
  } catch (error) {
    throw error;
  }
}

export async function approveJobRequestAction({ id }: { id: string }) {
  try {
    const session = await auth();
    await approveJobRequest({
      id,
      request_status_updated_by: session?.user.email!,
    });
    await CreateLog({
      email: session?.user.email!,
      action: "UPDATE",
      message: "Approved a job request",
    });
    return true;
  } catch (error) {
    throw error;
  }
}

export async function rejectJobRequestAction({ id }: { id: string }) {
  try {
    const session = await auth();
    await rejectJobRequest({
      id,
      request_status_updated_by: session?.user.email!,
    });
    await CreateLog({
      email: session?.user.email!,
      action: "UPDATE",
      message: "Rejected a job request",
    });
    return true;
  } catch (error) {
    throw error;
  }
}

export async function closeJobRequestAction({ id }: { id: string }) {
  try {
    const session = await auth();
    await closeJobRequest(id);
    await CreateLog({
      email: session?.user.email!,
      action: "UPDATE",
      message: "Closed a job request",
    });
    revalidatePath("/user/dashboard/job-board");
    return true;
  } catch (error) {
    throw error;
  }
}

export async function openJobRequestAction({ id }: { id: string }) {
  try {
    const session = await auth();
    await openJobRequest(id);
    await CreateLog({
      email: session?.user.email!,
      action: "UPDATE",
      message: "Opened a job request",
    });
    revalidatePath("/user/dashboard/job-board");
    return true;
  } catch (error) {
    throw error;
  }
}
