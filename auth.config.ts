import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, createUser } from "./db/user/user";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          // validate fields with zod
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // get the user by email
          user = await getUserByEmail(email);

          // check if user is null or the email_type is google
          // credentials login is required to have email and password
          if (!user || user.email_type === "google") {
            throw new Error("Invalid credentials.");
          }

          // compare the stored password to the given password bu the user
          const isPasswordSame = bcrypt.compareSync(
            password,
            user.toObject().password
          );

          // is password is same return the user (login)
          if (isPasswordSame) {
            return user;
          }

          // if not return null
          return null;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }
      },
    }),
    Google,
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email || !account) return false; // Reject if no email

      if (account.provider === "google") {
        // if user has email, check if the user is existing in the database
        // if not existing create a new user
        if ((await getUserByEmail(user.email)) === null) {
          await createUser({
            email: user.email,
            firstname: user.name!,
            email_type: "google",
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
