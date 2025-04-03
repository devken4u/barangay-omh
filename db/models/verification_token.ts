import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
const { Schema, model, models } = mongoose;

const verificationTokenSchema = new Schema({
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
});

const VerificationTokenModel =
  models?.VerificationToken ||
  model("VerificationToken", verificationTokenSchema);
export default verificationTokenSchema;
