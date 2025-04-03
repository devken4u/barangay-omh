"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function signInGoogle() {
  await signIn("google");
}

export async function signInCredentials(_1: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            email: formData.get("email"),
            password: formData.get("password"),
            errorMessage: "Invalid credentials.",
          };
        default:
          return {
            email: formData.get("email"),
            password: formData.get("password"),
            errorMessage: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}

export async function signOutAccount() {
  await signOut({ redirectTo: "/" });
}
