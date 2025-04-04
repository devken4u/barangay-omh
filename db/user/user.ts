import UserModel from "../models/user";
import { connectDB } from "../connection/connection";

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
