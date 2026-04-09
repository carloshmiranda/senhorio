/**
 * Rate limiting utility for API endpoints
 * Protects against brute force attacks and API spam
 */

interface RateLimitConfig {
  limit: number; // Max requests
  windowMs: number; // Time window in milliseconds
  skipSuccessfulRequests?: boolean; // Don't count successful requests
}

interface RequestRecord {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (suitable for single-instance deployments)
const requestCounts = new Map<string, RequestRecord>();

export class RateLimitError extends Error {
  constructor(
    message: string,
    public retryAfter: number,
    public limit: number,
    public remaining: number
  ) {
    super(message);
    this.name = 'RateLimitError';
  }
}

export function createRateLimiter(config: RateLimitConfig) {
  return {
    check: (identifier: string): { success: boolean; retryAfter?: number; remaining: number } => {
      const now = Date.now();
      const key = `${identifier}:${Math.floor(now / config.windowMs)}`;

      // Clean up old entries periodically to prevent memory leaks
      if (Math.random() < 0.01) { // 1% chance to clean up
        cleanupOldEntries(now);
      }

      const record = requestCounts.get(key);

      if (!record) {
        // First request in this window
        requestCounts.set(key, {
          count: 1,
          resetTime: now + config.windowMs
        });
        return { success: true, remaining: config.limit - 1 };
      }

      if (record.count >= config.limit) {
        // Rate limit exceeded
        const retryAfter = Math.ceil((record.resetTime - now) / 1000);
        return { success: false, retryAfter, remaining: 0 };
      }

      // Increment count
      record.count++;
      return { success: true, remaining: config.limit - record.count };
    },

    reset: (identifier: string): void => {
      const now = Date.now();
      const key = `${identifier}:${Math.floor(now / config.windowMs)}`;
      requestCounts.delete(key);
    }
  };
}

function cleanupOldEntries(now: number) {
  for (const [key, record] of requestCounts.entries()) {
    if (record.resetTime < now) {
      requestCounts.delete(key);
    }
  }
}

// Pre-configured rate limiters for different use cases
export const authLimiter = createRateLimiter({
  limit: 5, // 5 login attempts
  windowMs: 15 * 60 * 1000, // per 15 minutes
});

export const apiLimiter = createRateLimiter({
  limit: 100, // 100 requests
  windowMs: 15 * 60 * 1000, // per 15 minutes
});

export const strictLimiter = createRateLimiter({
  limit: 3, // 3 requests
  windowMs: 60 * 1000, // per minute (for sensitive operations)
});

/**
 * Helper to get client IP from request headers
 */
export function getClientIP(request: Request): string {
  // Check for forwarded IPs (from Vercel, CloudFlare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback for development
  return '127.0.0.1';
}

/**
 * Middleware wrapper for rate limiting
 */
export function withRateLimit<T extends Request>(
  handler: (request: T) => Promise<Response>,
  limiter: ReturnType<typeof createRateLimiter>
) {
  return async (request: T): Promise<Response> => {
    const clientIP = getClientIP(request);
    const result = limiter.check(clientIP);

    if (!result.success && result.retryAfter) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'Rate limit exceeded. Too many requests, please try again later.',
          retryAfter: result.retryAfter
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': result.retryAfter.toString(),
            'X-RateLimit-Limit': limiter.check(clientIP).remaining.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': (Date.now() + (result.retryAfter * 1000)).toString(),
          },
        }
      );
    }

    // Execute the original handler
    const response = await handler(request);

    // Add rate limit headers to successful responses
    const newHeaders = new Headers(response.headers);
    newHeaders.set('X-RateLimit-Remaining', result.remaining.toString());

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  };
}