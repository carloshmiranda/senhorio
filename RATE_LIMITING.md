# API Rate Limiting

## Overview

Senhorio implements comprehensive API rate limiting to protect against abuse, brute force attacks, and excessive resource consumption. Rate limiting is applied based on client IP address and helps ensure fair usage across all users.

## Rate Limit Categories

### 1. Authentication Endpoints (`AUTH`)
- **Limit**: 5 requests per 15 minutes
- **Endpoints**: `/api/auth` (login/register)
- **Purpose**: Prevent brute force login attempts
- **Message**: "Muitas tentativas de login. Tente novamente em 15 minutos."

### 2. Waitlist Endpoints (`WAITLIST`)
- **Limit**: 3 requests per hour
- **Endpoints**: `/api/waitlist`, `/api/waitlist-survey`
- **Purpose**: Prevent spam registrations
- **Message**: "Muitas tentativas de registo. Tente novamente em 1 hora."

### 3. Data Creation Endpoints (`DATA_CREATION`)
- **Limit**: 50 requests per hour
- **Endpoints**: Properties, receipts, tenants creation
- **Purpose**: Prevent bulk operations abuse
- **Message**: "Muitas operações de criação. Tente novamente mais tarde."

### 4. Data Read Endpoints (`DATA_READ`)
- **Limit**: 300 requests per hour
- **Endpoints**: Properties, receipts, analytics queries
- **Purpose**: Allow normal usage while preventing scraping
- **Message**: "Muitas consultas. Tente novamente mais tarde."

### 5. General API Endpoints (`GENERAL`)
- **Limit**: 100 requests per hour
- **Endpoints**: Most other API endpoints
- **Purpose**: General purpose protection
- **Message**: "Muitas tentativas. Tente novamente mais tarde."

### 6. Webhook Endpoints (`WEBHOOK`)
- **Limit**: 1000 requests per hour
- **Endpoints**: Stripe webhooks, external integrations
- **Purpose**: Allow high-frequency legitimate webhooks
- **Message**: "Rate limit exceeded"

## Implementation

### Client Identification
Rate limiting uses a combination of:
- Client IP address (from various headers: `x-forwarded-for`, `x-real-ip`, `cf-connecting-ip`)
- Truncated User-Agent string (first 50 characters)

This creates a unique identifier that works well with Vercel's proxy infrastructure.

### Storage
- **In-memory**: Uses JavaScript Map for storing rate limit counters
- **Cleanup**: Automatic cleanup of expired entries every hour
- **Note**: For production scaling across multiple instances, consider Redis

### Rate Limit Headers
All API responses include rate limiting headers:
- `X-RateLimit-Remaining`: Number of requests remaining in current window
- `X-RateLimit-Reset`: Unix timestamp when the rate limit resets
- `Retry-After`: (429 responses only) Seconds until retry allowed

### Error Responses
When rate limit is exceeded, API returns:
```json
{
  "ok": false,
  "error": "Muitas tentativas. Tente novamente mais tarde."
}
```
With HTTP status `429 Too Many Requests`.

## Applied Endpoints

Rate limiting has been applied to the following critical endpoints:

### Authentication
- `POST /api/auth` - Uses `AUTH` rate limiting

### Waitlist/Marketing
- `POST /api/waitlist` - Uses `WAITLIST` rate limiting

### Property Management
- `GET /api/properties` - Uses `DATA_READ` rate limiting
- `POST /api/properties` - Uses `DATA_CREATION` rate limiting

### Receipt Generation
- `GET /api/receipts` - Uses `DATA_READ` rate limiting
- `POST /api/receipts` - Uses `DATA_CREATION` rate limiting

## Adding Rate Limiting to New Endpoints

### Method 1: Direct Implementation
Add to any API route handler:

```typescript
import { checkRateLimit, createRateLimitResponse, RATE_LIMITS } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = checkRateLimit(req, 'endpoint-name', RATE_LIMITS.GENERAL);
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(
      false,
      rateLimitResult.remainingRequests,
      rateLimitResult.resetTime,
      rateLimitResult.error
    );
  }

  // Your endpoint logic here...
}
```

### Method 2: Middleware Wrapper (Future Enhancement)
Use the middleware wrapper for cleaner code:

```typescript
import { withMiddleware } from "@/lib/api-middleware";

const handler = async (req: NextRequest) => {
  // Your endpoint logic here...
};

export const POST = withMiddleware(handler, { 
  rateLimit: 'DATA_CREATION', 
  endpoint: 'properties' 
});
```

## Security Considerations

1. **IP-based Limiting**: Works well for individual users but may affect users behind corporate NATs
2. **Bypass Protection**: Consider authenticated rate limiting for logged-in users
3. **DoS Protection**: Rate limiting provides basic DoS protection but shouldn't be the only defense
4. **Monitoring**: Consider logging rate limit violations for security monitoring

## Configuration

Rate limits are defined in `src/lib/rate-limit.ts` in the `RATE_LIMITS` constant. Adjust limits based on:
- User behavior analytics
- Server capacity
- Security requirements
- Business needs

## Future Enhancements

1. **Redis Storage**: For multi-instance deployments
2. **User-based Limits**: Different limits for authenticated users
3. **Dynamic Limits**: Adjust limits based on user subscription tier
4. **Geographic Limits**: Different limits by region
5. **Rate Limit Dashboard**: Admin interface for monitoring and adjusting limits