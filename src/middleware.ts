import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// adspireagency.de is a German-only brand domain (same Vercel project as
// adspire.rs) → serve the German landing at the root URL, keeping the .de URL.
function isGermanDomain(host: string | null): boolean {
  if (!host) return false;
  const h = host.split(":")[0].toLowerCase();
  return h === "adspireagency.de" || h === "www.adspireagency.de";
}

const GERMAN_GUIDE_PATHS = [
  "/warum-onlineshop-nicht-verkauft",
  "/terminausfaelle-no-shows-verhindern",
  "/was-gehoert-auf-eine-moderne-unternehmenswebsite",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isGermanDomain(request.headers.get("host"))) {
    // German brand domain → rewrite the home to the /de landing (URL unchanged).
    if (pathname === "/" || pathname === "") {
      const url = request.nextUrl.clone();
      url.pathname = "/de";
      return NextResponse.rewrite(url);
    }
    // Clean German guide slugs on adspireagency.de → rewrite to /de/...
    if (GERMAN_GUIDE_PATHS.includes(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = `/de${pathname}`;
      return NextResponse.rewrite(url);
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/warum-onlineshop-nicht-verkauft",
    "/terminausfaelle-no-shows-verhindern",
    "/was-gehoert-auf-eine-moderne-unternehmenswebsite",
  ],
};
