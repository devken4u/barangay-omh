import UserModel from "../models/user";
import EmailVerificationTokenModel from "../models/verification_token";
import PasswordVerificationModel from "../models/password_reset_token";
import { connectDB } from "../connection/connection";
import { CreateLog } from "../log/log";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email: string) {
  //connect to database
  await connectDB();

  //find the user with email filter
  const existingUser = await UserModel.findOne({ email });

  //return existing user if it is not null
  if (existingUser) return existingUser;
  //otherwise return null
  return null;
}
export async function createUser({
  email,
  firstname = "",
  middlename = "",
  lastname = "",
  birthday = "",
  role = "user",
  email_type,
  password = "",
  is_verified = false,
}: {
  email: string;
  password?: string;
  firstname: string;
  middlename?: string;
  lastname?: string;
  is_verified?: boolean;
  birthday?: Date | "";
  role?: "super-admin" | "user" | "admin";
  email_type: "google" | "credentials";
}) {
  try {
    //connect to database
    await connectDB();

    // create the new user
    const newUser = await UserModel.create({
      email,
      firstname,
      middlename,
      lastname,
      birthday,
      role,
      email_type,
      password,
      is_verified,
    });
    return newUser;
  } catch (error) {
    return error;
  }
}
export async function verifyUserEmail(email: string) {
  try {
    const verifiedUser = await UserModel.findOneAndUpdate(
      {
        email,
      },
      {
        is_verified: true,
      }
    );
    if (verifiedUser) {
      await EmailVerificationTokenModel.findOneAndDelete({ email });
      await CreateLog({
        email: email,
        action: "EMAIL_VERIFICATION",
        message: "User email verification successful.",
      });
      return verifiedUser;
    }
    return false;
  } catch (error) {
    return error;
  }
}
export async function resetPassword(email: string, newPassword: string) {
  try {
    const hashedPassword = bcrypt.hashSync(newPassword, 12);
    const resetPassword = await UserModel.findOneAndUpdate(
      {
        email,
      },
      {
        password: hashedPassword,
      }
    );
    if (resetPassword) {
      await PasswordVerificationModel.findOneAndDelete({ email });
    }
    return false;
  } catch (error) {
    return error;
  }
}
export async function getUsers(){
  try {
    await connectDB();
    const users = await UserModel.find().sort({
      createdAt: "desc"
    });
    return users;
  } catch (error) {
    throw error;
  }
}
export async function updateAccountStatus({id, is_verified}: {id: string; is_verified: boolean}){
try {
  await connectDB();
  const user = await UserModel.findByIdAndUpdate(id, {
    is_verified
  })
  return user;
} catch (error) {
  throw error;
}
}
export async function createAdmin({
  email,
  password
}: {
  email: string;
  password: string
}){
  try {
    await connectDB();
    const admin = await UserModel.create({
      email,
      password,
      is_verified: true,
      role: "admin",
      email_type: "credentials"
    })
    return admin;
  } catch (error) {
    throw error
  }
}