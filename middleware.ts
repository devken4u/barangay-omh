import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authMiddleware from "./middlewares/authMiddleware";
import notAuthMiddleware from "./middlewares/notAuthMiddleware";

export async function middleware(request: NextRequest) {
  // validate all paths starting with /user/dashboard
  // a logged user is needed for this to be accessible
  if (request.nextUrl.pathname.startsWith("/user/dashboard")) {
    const response = await authMiddleware(request);
    if (response instanceof Response) return response;
  }

  // the path /login is not accessible if a user is logged in
  if (request.nextUrl.pathname.startsWith("/login")) {
    const response = await notAuthMiddleware(request);
    if (response instanceof Response) return response;
  }

  // the path /login is not accessible if a user is logged in
  if (request.nextUrl.pathname.startsWith("/verify-user")) {
    const response = await notAuthMiddleware(request);
    if (response instanceof Response) return response;
  }

  return NextResponse.next();
}
