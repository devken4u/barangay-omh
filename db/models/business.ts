import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const BusinessSchema = new Schema(
  {
    business_name: {
      type: String,
      required: true,
    },
    business_address: {
      type: String,
      required: true,
    },
    business_description: {
      type: String,
      required: true,
    },
    business_contact: {
      type: String,
      required: true,
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
    request_status: {
      type: String,
      enum: ["pending", "rejected", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const BusinessModel = models?.Business || model("Business", BusinessSchema);
export default BusinessModel;
