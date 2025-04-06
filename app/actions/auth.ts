"use server";

import { signIn, signOut } from "@/auth";
import { CreateLog } from "@/db/log/log";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function signInGoogle() {
  await signIn("google");
}

export async function signInCredentials(_1: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      // redirect to email verify page if email is not yet verified
      if (error.message.split(" ")[0] === "EmailNotVerified.") {
        redirect(`/verify-email/${formData.get("email")}`);
      }
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
  const session = await auth();
  await CreateLog({
    email: session?.user.email as string,
    action: "LOGOUT",
  });
  await signOut({ redirectTo: "/" });
}
