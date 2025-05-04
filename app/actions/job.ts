"use server";

import { auth } from "@/auth";
import { createJob, deleteJob } from "@/db/job/job";
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
