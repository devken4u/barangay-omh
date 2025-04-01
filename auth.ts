import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, createUser } from "./db/user/user";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          user = await getUserByEmail(email);

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          if (await bcrypt.compare(password, user.password)) {
            return user;
          }
          return null;

          return user;
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
});
