import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const passwordResetToken = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    token: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PasswordVerificationModel =
  models?.PasswordVerification ||
  model("PasswordVerification", passwordResetToken);
export default PasswordVerificationModel;
