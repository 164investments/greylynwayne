import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Stop the *.vercel.app deployment host from being indexed as a duplicate of
 * the real site.
 *
 * The app is reachable at both greylynwayne.vercel.app and (after cutover)
 * www.greylynwayne.com. Google will otherwise index the vercel.app copy as a
 * separate site competing with the canonical domain. Every page already emits a
 * canonical tag pointing at www.greylynwayne.com; this header is the
 * belt-and-suspenders signal that removes the vercel.app host from the index.
 *
 * We send `noindex` (NOT a redirect) on purpose: before DNS cutover the
 * vercel.app URL is the ONLY way to reach the new site, and the real domain
 * still serves the old Wix site — redirecting there would break the preview and
 * bounce visitors to the old site. After cutover, this can be upgraded to a 301
 * to www.greylynwayne.com (see the commented block below).
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.endsWith(".vercel.app")) {
    // --- POST-CUTOVER UPGRADE (enable once www.greylynwayne.com serves this app):
    // const url = request.nextUrl.clone();
    // url.host = "www.greylynwayne.com";
    // url.protocol = "https";
    // return NextResponse.redirect(url, 301);

    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Run on page routes only — skip static assets, image optimizer, and the
  // metadata files (robots.txt / sitemap.xml) so their delivery is untouched.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
