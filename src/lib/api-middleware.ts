/**
 * API Middleware for Senhorio
 * Provides rate limiting and other common functionality for API endpoints
 */

import { NextRequest } from "next/server";
import { checkRateLimit, createRateLimitResponse, RATE_LIMITS } from "@/lib/rate-limit";

export type RateLimitType = keyof typeof RATE_LIMITS;

interface MiddlewareConfig {
  rateLimit?: RateLimitType;
  endpoint?: string;
}

/**
 * Creates a middleware-wrapped API handler with rate limiting and other common functionality
 */
export function withMiddleware(
  handler: (req: NextRequest) => Promise<Response>,
  config: MiddlewareConfig = {}
) {
  return async (req: NextRequest): Promise<Response> => {
    try {
      // Apply rate limiting if configured
      if (config.rateLimit) {
        const endpoint = config.endpoint || 'api';
        const rateLimitConfig = RATE_LIMITS[config.rateLimit];

        const rateLimitResult = checkRateLimit(req, endpoint, rateLimitConfig);
        if (!rateLimitResult.allowed) {
          return createRateLimitResponse(
            false,
            rateLimitResult.remainingRequests,
            rateLimitResult.resetTime,
            rateLimitResult.error
          );
        }
      }

      // Call the original handler
      const response = await handler(req);

      // Add security headers
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-XSS-Protection', '1; mode=block');

      return response;

    } catch (error) {
      console.error('API Error:', error);

      return new Response(
        JSON.stringify({ ok: false, error: 'Internal server error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  };
}

/**
 * Convenience functions for common rate limit patterns
 */
export const withAuthRateLimit = (handler: (req: NextRequest) => Promise<Response>) =>
  withMiddleware(handler, { rateLimit: 'AUTH', endpoint: 'auth' });

export const withWaitlistRateLimit = (handler: (req: NextRequest) => Promise<Response>) =>
  withMiddleware(handler, { rateLimit: 'WAITLIST', endpoint: 'waitlist' });

export const withDataReadRateLimit = (handler: (req: NextRequest) => Promise<Response>) =>
  withMiddleware(handler, { rateLimit: 'DATA_READ', endpoint: 'data-read' });

export const withDataCreationRateLimit = (handler: (req: NextRequest) => Promise<Response>) =>
  withMiddleware(handler, { rateLimit: 'DATA_CREATION', endpoint: 'data-creation' });

export const withGeneralRateLimit = (handler: (req: NextRequest) => Promise<Response>) =>
  withMiddleware(handler, { rateLimit: 'GENERAL', endpoint: 'general' });

export const withWebhookRateLimit = (handler: (req: NextRequest) => Promise<Response>) =>
  withMiddleware(handler, { rateLimit: 'WEBHOOK', endpoint: 'webhook' });