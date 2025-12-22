import { NextResponse, type NextRequest } from "next/server";

import { PATHS } from "./lib/paths";
import { ACCESS_TOKEN_KEY } from "./lib/constants";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(ACCESS_TOKEN_KEY)?.value; // <- must match cookie name
  const { pathname } = req.nextUrl;

  if (token) {
    if (pathname.startsWith(PATHS.login) || pathname.startsWith(PATHS.signup)) {
      return NextResponse.redirect(new URL(PATHS.todos, req.url));
    }
  } else {
    let url = "/";

    if (pathname.startsWith(PATHS.login) || pathname.startsWith("/_next")) {
      return NextResponse.next();
    }

    if (pathname.startsWith(PATHS.dashboard)) {
      url = PATHS.login;
    }

    return NextResponse.redirect(new URL(url, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/todos/:path*"], // all dashboard routes
};
