import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export default async function isRoleUserMiddleware(request: NextRequest) {
  // get the session from auth
  // this holds the logged user information
  const session = await auth();

  //check if logged user is just a normal user
  if (session?.user.role !== "user")
    return NextResponse.redirect(new URL("/", request.url)); // redirect if no one is logged in
  return NextResponse.next(); // Continue to the next middleware if the validation passed
}
