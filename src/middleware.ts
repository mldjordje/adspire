import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// adspireagency.de is a German-only brand domain (same Vercel project as
// adspire.rs) → serve the German landing at the root URL, keeping the .de URL.
function isGermanDomain(host: string | null): boolean {
  if (!host) return false;
  const h = host.split(":")[0].toLowerCase();
  return h === "adspireagency.de" || h === "www.adspireagency.de";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // German brand domain → rewrite the home to the /de landing (URL unchanged).
  if (
    isGermanDomain(request.headers.get("host")) &&
    (pathname === "/" || pathname === "")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/de";
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ["/"],
};
