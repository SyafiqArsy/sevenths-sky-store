import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/cart", "/checkout", "/orders"];
const adminRoutes = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route needs protection
  const isProtected = protectedRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(route + "/")
  );

  const isAdmin = adminRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtected || isAdmin) {
    // Note: Token is stored in localStorage which is not
    // accessible from middleware. The actual auth check
    // happens client-side in AuthContext and AdminGuard.
    // This middleware adds security headers as defense-in-depth.
  }

  const response = NextResponse.next();

  // Security headers
  response.headers.set(
    "X-Content-Type-Options",
    "nosniff"
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set(
    "X-XSS-Protection",
    "1; mode=block"
  );
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );

  return response;
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/admin/:path*",
  ],
};
