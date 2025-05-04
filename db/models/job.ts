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
    is_approved: {
      type: Boolean,
      default: false,
    },
    is_closed: {
      type: String,
      default: false,
    },
    approved_by: {
      type: Boolean,
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
