import { connectDB } from "../connection/connection";
import JobModel from "../models/job";

export async function createJob({
  job_titles,
  job_description,
  company_name,
  contact_number,
  company_address,
  created_by,
  image_url,
  public_id,
}: {
  job_titles: string;
  job_description: string;
  company_name: string;
  contact_number: string;
  company_address: string;
  created_by: string;
  image_url?: string;
  public_id?: string;
}) {
  try {
    await connectDB();
    const job = await JobModel.create({
      job_titles,
      job_description,
      company_name,
      contact_number,
      company_address,
      created_by,
      image_url,
      public_id,
    });
    return job;
  } catch (error) {
    throw error;
  }
}

export async function getUserPostedJobs(email: string) {
  try {
    await connectDB();
    const jobs = await JobModel.find({
      created_by: email,
    }).sort({
      createdAt: "desc",
    });
    return jobs;
  } catch (error) {
    throw error;
  }
}

export async function deleteJob(id: string) {
  try {
    await connectDB();
    const job = await JobModel.findByIdAndDelete(id);
    return job;
  } catch (error) {
    throw error;
  }
}
