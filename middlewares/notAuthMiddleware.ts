import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export default async function notAuthMiddleware(request: NextRequest) {
  // get the session from auth
  // this holds the logged user information
  const session = await auth();

  // check session if not empty
  // if session is empty, no one is logged in
  // otherwise, a resident or admin is logged in

  if (session) return NextResponse.redirect(new URL("/", request.url)); // redirect if a user is logged in
  return NextResponse.next(); // Continue to the next middleware if the validation passed
}
