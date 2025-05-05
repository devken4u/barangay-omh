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

export async function getRequestedJobs({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}) {
  try {
    await connectDB();
    const articles = await JobModel.find({
      request_status: "pending",
      is_closed: false,
    })
      .sort({
        updatedAt: "desc",
      })
      .limit(limit)
      .skip(skip);
    const total = await JobModel.find({
      request_status: "pending",
      is_closed: false,
    });
    return {
      data: JSON.parse(JSON.stringify(articles)),
      total: total.length,
    };
  } catch (error) {
    throw error;
  }
}

export async function getApprovedJobs({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}) {
  try {
    await connectDB();
    const articles = await JobModel.find({
      request_status: "approved",
      is_closed: false,
    })
      .sort({
        updatedAt: "desc",
      })
      .limit(limit)
      .skip(skip);
    const total = await JobModel.find({
      request_status: "approved",
      is_closed: false,
    });
    return {
      data: JSON.parse(JSON.stringify(articles)),
      total: total.length,
    };
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

export async function approveJobRequest({
  id,
  request_status_updated_by,
}: {
  id: string;
  request_status_updated_by: string;
}) {
  try {
    await connectDB();
    const job = await JobModel.findByIdAndUpdate(id, {
      request_status: "approved",
      request_status_updated_by,
    });
    return job;
  } catch (error) {
    throw error;
  }
}

export async function rejectJobRequest({
  id,
  request_status_updated_by,
}: {
  id: string;
  request_status_updated_by: string;
}) {
  try {
    await connectDB();
    const job = await JobModel.findByIdAndUpdate(id, {
      request_status: "rejected",
      request_status_updated_by,
    });
    return job;
  } catch (error) {
    throw error;
  }
}

export async function closeJobRequest(id: string) {
  try {
    await connectDB();
    const job = await JobModel.findByIdAndUpdate(id, {
      is_closed: true,
    });
    return job;
  } catch (error) {
    throw error;
  }
}

export async function openJobRequest(id: string) {
  try {
    await connectDB();
    const job = await JobModel.findByIdAndUpdate(id, {
      is_closed: false,
    });
    return job;
  } catch (error) {
    throw error;
  }
}
