import PasswordVerificationModel from "../models/password_reset_token";
import { connectDB } from "../connection/connection";

export async function getPasswordResetTokenByUserEmail(email: string) {
  try {
    await connectDB();
    const token = await PasswordVerificationModel.findOne({ email });
    if (token) return token;
    return null;
  } catch (error) {
    return error;
  }
}

export async function deleteResetPasswordTokenByToken(token: string) {
  try {
    await connectDB();
    await PasswordVerificationModel.findOneAndDelete({
      token,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function insertNewPasswordResetToken({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  try {
    await connectDB();
    await PasswordVerificationModel.create({
      email,
      token,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteResetPasswordTokenByUserEmail(email: string) {
  try {
    await connectDB();
    await PasswordVerificationModel.findOneAndDelete({
      email,
    });
    return true;
  } catch (error) {
    return false;
  }
}
