import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authMiddleware from "./middlewares/authMiddleware";
import notAuthMiddleware from "./middlewares/notAuthMiddleware";
import isRoleAdminMiddleware from "./middlewares/isRoleAdminMiddleware";
import isRoleUserMiddleware from "./middlewares/isRoleUserMiddleware";

export async function middleware(request: NextRequest) {
  // redirection
  if (request.nextUrl.pathname === "/admin/dashboard") {
    return NextResponse.redirect(
      new URL("/admin/dashboard/featured-photo", request.url)
    );
  }

  // validate all paths starting with /user/dashboard
  // a logged user is needed for this to be accessible
  if (request.nextUrl.pathname.startsWith("/user/dashboard")) {
    let response = await authMiddleware(request);
    response = await isRoleUserMiddleware(request);
    if (response instanceof Response) return response;
  }

  // validate all paths starting with /admin/dashboard
  // a logged user is needed for this to be accessible
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    let response = await authMiddleware(request);
    response = await isRoleAdminMiddleware(request);
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
