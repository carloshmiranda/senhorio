import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { createRateLimiter, getClientIP } from "@/lib/rate-limit";

// General API rate limiter: 200 requests per 15 minutes for dashboard APIs
const apiLimiter = createRateLimiter({
  limit: 200,
  windowMs: 15 * 60 * 1000, // 15 minutes
});

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Apply rate limiting to API routes (excluding specific endpoints with their own rate limiting)
  if (pathname.startsWith('/api/')) {
    const skipPaths = [
      '/api/auth',      // Has its own strict rate limiting
      '/api/waitlist',  // Has its own moderate rate limiting
      '/api/webhooks',  // Webhooks have their own generous rate limiting
      '/api/health',    // Health check should not be rate limited
    ];

    const shouldSkip = skipPaths.some(path => pathname.startsWith(path));

    if (!shouldSkip) {
      const clientIP = getClientIP(req);
      const result = apiLimiter.check(clientIP);

      if (!result.success && result.retryAfter) {
        return NextResponse.json(
          {
            ok: false,
            error: 'Rate limit exceeded. Too many API requests, please try again later.',
            retryAfter: result.retryAfter
          },
          {
            status: 429,
            headers: {
              'Retry-After': result.retryAfter.toString(),
              'X-RateLimit-Limit': '200',
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': (Date.now() + (result.retryAfter * 1000)).toString(),
            },
          }
        );
      }

      // Add rate limit headers for successful requests
      const response = NextResponse.next();
      response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
      return response;
    }
  }

  // Apply auth protection to /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // Check for auth token in cookie
    const token = req.cookies.get("senhorio_token")?.value;

    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      // Clear invalid token
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("senhorio_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", // Dashboard routes (for auth protection)
    "/api/((?!.*\\.).)*", // API routes (for rate limiting, excluding static files)
  ],
};
