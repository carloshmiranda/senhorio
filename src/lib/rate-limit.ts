/**
 * Rate limiting utility for API endpoints
 * Implements sliding window rate limiting with in-memory storage
 */

interface RateLimit {
  count: number;
  resetTime: number;
}

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  message?: string;
}

// In-memory storage for rate limit data
// Note: In production with multiple instances, consider Redis
const rateLimitStore = new Map<string, RateLimit>();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, limit] of rateLimitStore.entries()) {
    if (now > limit.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 60 * 1000); // 1 hour

/**
 * Get client identifier from request (IP + User-Agent hash for better uniqueness)
 */
function getClientIdentifier(request: Request): string {
  // Get IP from various headers (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  const ip = forwardedFor?.split(',')[0]?.trim() ||
             realIp ||
             cfConnectingIp ||
             'unknown';

  // Add User-Agent hash to make identifier more unique
  const userAgent = request.headers.get('user-agent') || '';
  const userAgentHash = userAgent.slice(0, 50); // Truncate for memory efficiency

  return `${ip}:${userAgentHash}`;
}

/**
 * Check if request is within rate limit
 */
export function checkRateLimit(
  request: Request,
  endpoint: string,
  config: RateLimitConfig
): { allowed: boolean; remainingRequests: number; resetTime: number; error?: string } {
  const clientId = getClientIdentifier(request);
  const key = `${clientId}:${endpoint}`;
  const now = Date.now();

  // Get or create rate limit entry
  let rateLimit = rateLimitStore.get(key);

  if (!rateLimit || now > rateLimit.resetTime) {
    // Create new or reset expired window
    rateLimit = {
      count: 0,
      resetTime: now + config.windowMs
    };
    rateLimitStore.set(key, rateLimit);
  }

  // Check if limit exceeded
  if (rateLimit.count >= config.maxRequests) {
    return {
      allowed: false,
      remainingRequests: 0,
      resetTime: rateLimit.resetTime,
      error: config.message || 'Muitas tentativas. Tente novamente mais tarde.'
    };
  }

  // Increment counter
  rateLimit.count++;
  rateLimitStore.set(key, rateLimit);

  return {
    allowed: true,
    remainingRequests: config.maxRequests - rateLimit.count,
    resetTime: rateLimit.resetTime
  };
}

/**
 * Create rate limit response with proper headers
 */
export function createRateLimitResponse(
  allowed: boolean,
  remainingRequests: number,
  resetTime: number,
  error?: string
): Response {
  const headers = {
    'X-RateLimit-Remaining': remainingRequests.toString(),
    'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString(),
    'Content-Type': 'application/json'
  };

  if (!allowed) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: error || 'Rate limit exceeded'
      }),
      {
        status: 429,
        headers: {
          ...headers,
          'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString()
        }
      }
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers
  });
}

/**
 * Predefined rate limit configurations
 */
export const RATE_LIMITS = {
  // Authentication endpoints - strict limits
  AUTH: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
  },

  // Waitlist/email endpoints - moderate limits
  WAITLIST: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Muitas tentativas de registo. Tente novamente em 1 hora.'
  },

  // Data creation endpoints (properties, receipts) - moderate limits
  DATA_CREATION: {
    maxRequests: 50,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Muitas operações de criação. Tente novamente mais tarde.'
  },

  // Data read endpoints - generous limits
  DATA_READ: {
    maxRequests: 300,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Muitas consultas. Tente novamente mais tarde.'
  },

  // General API endpoints - moderate limits
  GENERAL: {
    maxRequests: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Muitas tentativas. Tente novamente mais tarde.'
  },

  // Webhook endpoints - very generous limits
  WEBHOOK: {
    maxRequests: 1000,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Rate limit exceeded'
  }
} as const;

/**
 * Wrapper function to easily apply rate limiting to API routes
 */
export function withRateLimit(
  handler: (request: Request) => Promise<Response>,
  endpoint: string,
  config: RateLimitConfig
) {
  return async (request: Request): Promise<Response> => {
    const rateLimitResult = checkRateLimit(request, endpoint, config);

    if (!rateLimitResult.allowed) {
      return createRateLimitResponse(
        false,
        rateLimitResult.remainingRequests,
        rateLimitResult.resetTime,
        rateLimitResult.error
      );
    }

    try {
      const response = await handler(request);

      // Add rate limit headers to successful responses
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.remainingRequests.toString());
      response.headers.set('X-RateLimit-Reset', Math.ceil(rateLimitResult.resetTime / 1000).toString());

      return response;
    } catch (error) {
      // Add rate limit headers even to error responses
      const errorResponse = new Response(
        JSON.stringify({ ok: false, error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );

      errorResponse.headers.set('X-RateLimit-Remaining', rateLimitResult.remainingRequests.toString());
      errorResponse.headers.set('X-RateLimit-Reset', Math.ceil(rateLimitResult.resetTime / 1000).toString());

      return errorResponse;
    }
  };
}