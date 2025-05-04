import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const JobSchema = new Schema(
  {
    job_titles: {
      type: String,
      required: true,
    },
    job_description: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    company_address: {
      type: String,
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },
    request_status: {
      type: String,
      enum: ["pending", "rejected", "approved"],
      default: "pending",
    },
    is_closed: {
      type: Boolean,
      default: false,
    },
    request_status_updated_by: {
      type: String,
    },
    created_by: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const JobModel = models?.Job || model("Job", JobSchema);
export default JobModel;
