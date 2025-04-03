"use server";

import { createUser } from "@/db/user/user";
import { RegisterSchema } from "@/lib/zod";
import { RegisterType } from "@/lib/zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/db/user/user";
import { redirect } from "next/navigation";

export async function registerUserAction(_1: any, formData: FormData) {
  const user: RegisterType = {
    birthday: new Date(formData.get("birthday") as string),
    firstname: formData.get("firstname") as string,
    middlename: formData.get("middlename") as string,
    lastname: formData.get("lastname") as string,
    email: formData.get("email") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    password: formData.get("password") as string,
  };

  try {
    // validate fields with zod
    await RegisterSchema.parseAsync(user);

    // check if email is already existing in the database
    if (await getUserByEmail(user.email)) {
      return {
        error: {
          message: "This email is already taken",
        },
        user,
      };
    }

    const hashedPassword = bcrypt.hashSync(user.password, 12);

    await createUser({
      email: user.email,
      email_type: "credentials",
      firstname: user.firstname,
      middlename: user.middlename,
      lastname: user.lastname,
      birthday: user.birthday,
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
    return {
      error: {
        message:
          "An error occurred in the server or the information are invalid",
      },
      user,
    };
  } finally {
    redirect(`/verify-email/${user.email}`);
  }
}

export async function getUserByEmailAction(email: string) {
  return await getUserByEmail(email);
}

export async function isEmailVerificationPendingAction(){
  // check if there is a pending verification here
  // if none send new
}