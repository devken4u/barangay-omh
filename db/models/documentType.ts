import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const DocumentTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    is_disabled: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const DocumentTypeModel =
  models?.DocumentType || model("DocumentType", DocumentTypeSchema);
export default DocumentTypeModel;
