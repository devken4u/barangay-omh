import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },
    sub_title: {
      type: String,
      default: "",
    },
    author: {
      type: String,
    },
    body: {
      type: String,
    },
    image_url: {
      type: String,
    },
    public_id: {
      type: String,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
    published_date: {
      type: Date,
    },
    created_by: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ArticleModel = models?.Article || model("Article", ArticleSchema);
export default ArticleModel;
