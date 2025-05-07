import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const QueueSchema = new Schema(
  {
    person_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const QueueModel = models?.Queue || model("Queue", QueueSchema);
export default QueueModel;
