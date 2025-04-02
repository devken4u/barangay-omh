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
  role = "user",
  email_type,
}: {
  email: string;
  firstname?: string;
  role?: "super-admin" | "user" | "admin";
  email_type: "google" | "credentials";
}) {
  try {
    //connect to database
    await connectDB();

    // create the new user
    await UserModel.create({
      email,
      firstname,
      role,
      email_type,
    });
  } catch (error) {
    console.log(error);
  }
}
