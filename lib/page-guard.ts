import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function redirectIfAuthenticated(path: string) {
  // get the session from auth
  // this holds the logged user information
  const session = await auth();

  // check session if not empty
  // if session is empty, no one is logged in
  // otherwise, a resident or admin is logged in
  if (session) redirect(path); // redirect if logged in
}

export async function redirectIfNotAuthenticated(path: string) {
  // get the session from auth
  // this holds the logged user information
  const session = await auth();

  // check session if not empty
  // if session is empty, no one is logged in
  // otherwise, a resident or admin is logged in
  if (!session) redirect(path); // redirect if no one is logged in
}

export async function redirectIfRoleNotAuthorized(
  authorizedRole: ("super-admin" | "user" | "admin")[],
  path: string
) {
  // get the session from auth
  // this holds the logged user information
  const session = await auth();

  if (!authorizedRole.includes(session?.user.role!)) redirect(path);
}
