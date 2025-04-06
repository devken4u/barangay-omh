import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, createUser } from "./db/user/user";
import { SignInSchema } from "./lib/zod";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { CreateLog } from "./db/log/log";
import { verifyUserEmail } from "./db/user/user";

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
          const { email, password } = await SignInSchema.parseAsync(
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
          await CreateLog({
            email,
            action: "FAILED_LOGIN",
            message: "User tried to login.",
          });
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
        const existingUser = await getUserByEmail(user.email);
        if (existingUser === null) {
          const newUser = await createUser({
            email: user.email,
            firstname: user.name!,
            email_type: "google",
            is_verified: true,
          });
          if (newUser)
            await CreateLog({
              email: newUser.email,
              action: "REGISTER",
              message: "User registered using google account.",
            });
        } else if (existingUser.is_verified === false) {
          // verify user if logged using google and the account has credentials sign in and not yet verified
          // it make sense that the user will be verified
          await verifyUserEmail(user.email);
        }
      } else if (account.provider === "credentials") {
        if (!user.is_verified) throw new AuthError("EmailNotVerified");
      }
      await CreateLog({
        email: user.email,
        action: "LOGIN",
      });
      return true;
    },
    async session({ session, token }) {
      // Attach custom data to session
      session.user.is_verified = token.is_verified as boolean;
      session.user.role = token.role as
        | "admin"
        | "super-admin"
        | "user"
        | undefined;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.is_verified = user.is_verified;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
