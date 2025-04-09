import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const HotlineSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HotlineModel = models?.Hotline || model("Hotline", HotlineSchema);
export default HotlineModel;
