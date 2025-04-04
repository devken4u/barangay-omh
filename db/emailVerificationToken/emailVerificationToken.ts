import EmailVerificationTokenModel from "../models/verification_token";
import { connectDB } from "../connection/connection";

export async function getTokenByUserEmail(email: string) {
  try {
    await connectDB();
    const token = await EmailVerificationTokenModel.findOne({ email });
    if (token) return token;
    return null;
  } catch (error) {
    return error;
  }
}

export async function insertNewVerificationToken({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  try {
    await EmailVerificationTokenModel.create({
      email,
      token,
    });
    return true;
  } catch (error) {
    return false;
  }
}
