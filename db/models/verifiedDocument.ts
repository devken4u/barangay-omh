import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const VerifiedDocumentSchema = new Schema(
  {
    owner_name: {
      type: String,
      required: true,
    },
    document_type: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
    },
    verified_by: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VerifiedDocumentModel =
  models?.VerifiedDocument || model("VerifiedDocument", VerifiedDocumentSchema);
export default VerifiedDocumentModel;
