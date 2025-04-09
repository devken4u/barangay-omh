import { connectDB } from "../connection/connection";
import LogModel from "../models/log";

export async function CreateLog({
  email,
  action,
  message = "",
}: {
  email: string;
  action:
    | "LOGIN"
    | "LOGOUT"
    | "REGISTER"
    | "FAILED_LOGIN"
    | "EMAIL_VERIFICATION"
    | "VERIFY_EMAIL_REQUEST"
    | "PASSWORD_RESET"
    | "PASSWORD_RESET_REQUEST"
    | "CREATE"
    | "DELETE"
    | "UPDATE";
  message?: string;
}) {
  try {
    await connectDB();
    await LogModel.create({
      email,
      action,
      message,
    });
  } catch (error) {
    return error;
  }
}
