# Rate Limiting Implementation

This document describes the rate limiting system implemented in Senhorio to protect against abuse and ensure service availability.

## Overview

Rate limiting is applied at multiple levels to provide layered protection:

1. **Endpoint-specific rate limiting** for sensitive operations
2. **General API rate limiting** via middleware for dashboard APIs
3. **IP-based tracking** to identify abuse patterns

## Implementation Details

### Core Module: `/src/lib/rate-limit.ts`

The rate limiting system uses an in-memory store suitable for single-instance deployments (Vercel). Key features:

- **Window-based counting**: Tracks requests within time windows
- **Automatic cleanup**: Prevents memory leaks by removing old entries
- **Flexible configuration**: Different limits for different use cases
- **Proper headers**: Returns standard rate limit headers

### Rate Limits by Endpoint Type

#### Authentication Endpoints (`/api/auth`)
- **Limit**: 5 requests per 15 minutes
- **Rationale**: Prevent brute force login attacks
- **Applied to**: Login, register operations
- **Session checks**: More lenient (100 requests per 15 minutes)

#### Waitlist Endpoint (`/api/waitlist`)
- **Limit**: 10 requests per 15 minutes
- **Rationale**: Prevent spam signups while allowing legitimate use
- **Applied to**: Email signup and verification

#### Webhook Endpoints (`/api/webhooks/stripe`)
- **Limit**: 1000 requests per 15 minutes
- **Rationale**: Stripe can send many legitimate webhooks, but protect against DoS
- **Applied to**: Payment webhook processing

#### General Dashboard APIs
- **Limit**: 200 requests per 15 minutes
- **Rationale**: Normal dashboard usage rarely exceeds this limit
- **Applied to**: Properties, receipts, expenses, analytics endpoints
- **Applied via**: Middleware

## Response Format

When rate limit is exceeded, endpoints return:

```json
{
  "ok": false,
  "error": "Rate limit exceeded. Too many requests, please try again later.",
  "retryAfter": 120
}
```

**HTTP Status**: 429 Too Many Requests

**Headers**:
- `Retry-After`: Seconds until limit resets
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Unix timestamp when limit resets

## Client IP Detection

The system detects client IPs using:
1. `X-Forwarded-For` header (Vercel, CloudFlare)
2. `X-Real-IP` header (nginx)
3. Fallback to `127.0.0.1` for development

## Monitoring and Logging

- Rate limit violations are logged with client IP
- Headers provide visibility into current limits
- Failed requests include retry guidance

## Configuration

### Adding Rate Limiting to New Endpoints

1. **Import the rate limiting utilities**:
```typescript
import { withRateLimit, createRateLimiter } from "@/lib/rate-limit";
```

2. **Create a custom limiter if needed**:
```typescript
const customLimiter = createRateLimiter({
  limit: 50,
  windowMs: 10 * 60 * 1000, // 10 minutes
});
```

3. **Wrap your handler**:
```typescript
async function handlePOST(req: NextRequest) {
  // Your logic here
}

export const POST = withRateLimit(handlePOST, customLimiter);
```

### Adjusting Existing Limits

Modify the configuration in the respective files:

- **Auth**: `/src/app/api/auth/route.ts`
- **Waitlist**: `/src/app/api/waitlist/route.ts`
- **Webhooks**: `/src/app/api/webhooks/stripe/route.ts`
- **General APIs**: `/src/middleware.ts`

## Production Considerations

### Memory Usage
The in-memory store grows with unique IPs and time windows. For high-traffic scenarios, consider:
- Database-backed rate limiting
- Redis cache for distributed deployments
- Regular cleanup scheduling

### Legitimate Traffic
Monitor for legitimate users hitting limits:
- Analytics on 429 responses
- User feedback about access issues
- Consider whitelisting for known good actors

### Attack Mitigation
Rate limiting works alongside other security measures:
- CSRF protection
- Content Security Policy
- Input validation
- Audit logging

## Testing

### Manual Testing
```bash
# Test auth rate limiting
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/auth \
    -H "Content-Type: application/json" \
    -d '{"action":"login","email":"test@example.com","password":"wrong"}'
  sleep 1
done
```

### Load Testing
Use tools like `ab` or `wrk` to test rate limits:
```bash
ab -n 300 -c 10 http://localhost:3000/api/properties
```

## Troubleshooting

### Common Issues

1. **Legitimate users blocked**: Check if limits are too restrictive
2. **Rate limits not applying**: Verify middleware configuration and endpoint paths
3. **Memory leaks**: Monitor cleanup frequency and memory usage

### Debug Information

Enable debug logging by adding to rate limit checks:
```typescript
console.log(`Rate limit check for ${clientIP}: ${result.remaining} remaining`);
```

## Security Benefits

This implementation protects against:

- **Brute force attacks** on authentication
- **API spam and abuse** on public endpoints
- **DoS attacks** through request flooding
- **Resource exhaustion** from malicious actors
- **Scrapers and bots** attempting data extraction

## Future Enhancements

Consider implementing:

1. **User-based rate limiting** (in addition to IP-based)
2. **Dynamic rate limiting** based on server load
3. **Geolocation-based limits** for suspicious regions
4. **Integration with threat intelligence** feeds
5. **Dashboard for rate limit monitoring** and management