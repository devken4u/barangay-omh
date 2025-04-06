"use server";

import { createUser } from "@/db/user/user";
import { RegisterSchema } from "@/lib/zod";
import { RegisterType } from "@/lib/zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/db/user/user";
import { getTokenByUserEmail } from "@/db/emailVerificationToken/emailVerificationToken";
import { verifyToken } from "@/lib/utils";
import { signToken } from "@/lib/utils";
import { insertNewVerificationToken } from "@/db/emailVerificationToken/emailVerificationToken";
import { sendMail } from "@/lib/mail";
import { getPasswordResetTokenByUserEmail } from "@/db/passwordResetToken/passwordResetToken";
import { insertNewPasswordResetToken } from "@/db/passwordResetToken/passwordResetToken";
import { resetPassword } from "@/db/user/user";
import { CreateLog } from "@/db/log/log";
import { deleteResetPasswordTokenByToken } from "@/db/passwordResetToken/passwordResetToken";

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
    await CreateLog({
      email: formData.get("email") as string,
      action: "REGISTER",
      message: "User register using credentials sign in.",
    });
    return {
      error: {
        message: "",
      },
      user,
    };
  } catch (error) {
    return {
      error: {
        message:
          "An error occurred in the server or the information are invalid",
      },
      user,
    };
  }
}

export async function getUserByEmailAction(email: string) {
  return await getUserByEmail(email);
}

export async function isEmailVerificationPendingAction(email: string) {
  // check if there is a pending verification here
  // if none send new
  const emailVerification = await getTokenByUserEmail(email);

  if (!emailVerification) {
    return false;
  }
  // check token if not expired
  const result = verifyToken(emailVerification.token as string);
  if (result) {
    return true;
  }
  return false;
}

export async function generateEmailVerificationToken(email: string) {
  const token = signToken({ payload: { email } });

  // insert token and email in the db
  const result = await insertNewVerificationToken({
    email,
    token: token as string,
  });

  // if success, send email
  if (result) {
    await CreateLog({
      email: email,
      action: "VERIFY_EMAIL_REQUEST",
      message: "User requested a token to verify email.",
    });

    const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
    if (!BASE_URL) {
      throw new Error("BASE_URL is not defined in environment variables");
    }

    const message = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Email Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              text-align: center;
          }
          h1 {
              color: #333333;
          }
          p {
              color: #666666;
              font-size: 16px;
          }
          .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #ff6900;
              color: #ffffff;
              text-decoration: none;
              font-size: 18px;
              border-radius: 5px;
              margin-top: 20px;
          }

          .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #999999;
          }
      </style>
  </head>
  <body>

  <div class="container">
      <h1>Verify Your Email</h1>
      <p>Thank you for signing up! Please verify your email address by clicking the button below.</p>
      
      <a href="${BASE_URL}/verify-email/${email}/${token}" style="
                display: inline-block;
                font-size: 16px;
                color: #ffffff !important;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 5px;
                font-weight: bold;
            " class="button" target="_blank">Verify Email</a>

      <p>If you did not create an account, you can safely ignore this email.</p>

      <div class="footer">
          <p>&copy; 2025 Barangay 175 OMH. All rights reserved.</p>
      </div>
  </div>

  </body>
  </html>
  `;

    await sendMail({
      to: email,
      subject: "Verify Your Email Address",
      message,
    });
  }
}

export async function isEmailValidToResetPasswordAction(
  _1: any,
  formData: FormData
) {
  const email = formData.get("email") as string;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return {
        status: "failed",
        error: {
          message: "Invalid credentials.",
        },
        email,
      };
    }

    if (user.email_type === "credentials") {
      return {
        status: "success",
        error: {
          message: "",
        },
        email,
      };
    }

    return {
      status: "failed",
      error: {
        message: "Invalid credentials.",
      },
      email,
    };
  } catch (error) {
    return {
      status: "failed",
      error: {
        message: "An error occurred in the server or credentials are invalid.",
      },
      email,
    };
  }
}

export async function isPasswordResetPendingAction(email: string) {
  // check if there is a pending verification here
  // if none send new
  const passwordReset = await getPasswordResetTokenByUserEmail(email);

  if (!passwordReset) {
    return false;
  }
  // check token if not expired
  const result = verifyToken(passwordReset.token as string);
  if (result) {
    return true;
  }
  return false;
}

export async function generatePasswordResetTokenAction(email: string) {
  const token = signToken({ payload: { email } });

  // insert token and email in the db
  const result = await insertNewPasswordResetToken({
    email,
    token: token as string,
  });

  // if success, send email
  if (result) {
    await CreateLog({
      email: email,
      action: "PASSWORD_RESET_REQUEST",
      message: "User register using credentials sign in.",
    });

    const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
    if (!BASE_URL) {
      throw new Error("BASE_URL is not defined in environment variables");
    }

    const message = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Email Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              text-align: center;
          }
          h1 {
              color: #333333;
          }
          p {
              color: #666666;
              font-size: 16px;
          }
          .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #ff6900;
              color: #ffffff;
              text-decoration: none;
              font-size: 18px;
              border-radius: 5px;
              margin-top: 20px;
          }

          .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #999999;
          }
      </style>
  </head>
  <body>

  <div class="container">
      <h1>Verify Your Email</h1>
      <p>Reset your password! Please verify your identity by clicking the button below.</p>
      
      <a href="${BASE_URL}/forgot-password/${email}/${token}" style="
                display: inline-block;
                font-size: 16px;
                color: #ffffff !important;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 5px;
                font-weight: bold;
            " class="button" target="_blank">Reset Password</a>

      <p>If you did not reset your password, you can safely ignore this email.</p>

      <div class="footer">
          <p>&copy; 2025 Barangay 175 OMH. All rights reserved.</p>
      </div>
  </div>

  </body>
  </html>
  `;

    await sendMail({
      to: email,
      subject: "Reset Password",
      message,
    });
  }
}

export async function resetUserPasswordAction(
  email: string,
  token: string,
  newPassword: string
) {
  try {
    await resetPassword(email, newPassword);
    await deleteResetPasswordTokenByToken(token);
    await CreateLog({
      email: email,
      action: "PASSWORD_RESET",
      message: "User reset password successful.",
    });
  } catch (error) {
    return error;
  }
}
