import { NextResponse, type NextRequest } from "next/server";

import { PATHS } from "@/lib/paths";

export async function middleware(req: NextRequest) {
  const tokenKey = `sb-${process.env.SUPABASE_PROJECT_ID}-auth-token.1`;
  const token = req.cookies.get(tokenKey)?.value;

  const { pathname } = req.nextUrl;

  const isProtectedPrivateRoute =
    pathname.startsWith(PATHS.dashboard) ||
    pathname.startsWith(PATHS.todos()) ||
    pathname.startsWith(PATHS.profile);

  if (!token) {
    let url = "/";

    if (pathname.startsWith(PATHS.login)) {
      return NextResponse.next();
    }

    if (isProtectedPrivateRoute) {
      url = PATHS.login;
    }

    return NextResponse.redirect(new URL(url, req.url));
  } else {
    if (pathname.startsWith(PATHS.login)) {
      return NextResponse.redirect(new URL(PATHS.todos(), req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile", "/todos/:path*", "/login"],
};
