import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const DEMO_PATHS = new Set([
  "/blog-single",
  "/project-single",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/index-") || DEMO_PATHS.has(pathname)) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }
}

export const config = {
  matcher: [
    "/index-:path*",
    "/blog-single",
    "/project-single",
  ],
};
