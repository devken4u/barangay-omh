import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export default async function isRoleAdminMiddleware(request: NextRequest) {
  // get the session from auth
  // this holds the logged user information
  const session = await auth();

  //check if logged user is just a normal user
  if (session?.user.role !== "admin" && session?.user.role !== "super-admin")
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next(); // Continue to the next middleware if the validation passed
}
