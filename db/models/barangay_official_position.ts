import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const BarangayOfficialPositionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BarangayOfficialPositionModel =
  models?.BarangayOfficialPosition ||
  model("BarangayOfficialPosition", BarangayOfficialPositionSchema);
export default BarangayOfficialPositionModel;
