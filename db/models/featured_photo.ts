import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const FeaturedPhotoSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    numerical_order: {
      type: Number,
      unique: true,
      required: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    uploaded_by: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FeaturedPhotoModel =
  models?.FeaturedPhoto || model("FeaturedPhoto", FeaturedPhotoSchema);
export default FeaturedPhotoModel;
