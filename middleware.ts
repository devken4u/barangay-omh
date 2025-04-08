import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // redirection
  if (request.nextUrl.pathname === "/admin/dashboard") {
    return NextResponse.redirect(
      new URL("/admin/dashboard/featured-photo", request.url)
    );
  }

  return NextResponse.next();
}
