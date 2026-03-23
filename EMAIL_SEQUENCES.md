# Email Sequences for Senhorio

## Overview

Automated email sequences for user engagement and conversion, targeting Portuguese landlords in the waitlist and calculator users.

## Email Templates

### 1. Waitlist Welcome (`waitlist_welcome`)
- **Trigger**: New waitlist signup
- **Delay**: Immediate (0 hours)
- **Language**: Portuguese
- **Features**:
  - Personalized welcome with queue position
  - Referral link for viral growth
  - Links to free calculators
  - Blog content recommendations
  - Professional HTML design with fallback text

### 2. Calculator Follow-up (`calculator_followup`)
- **Trigger**: Tax calculator usage with email capture
- **Delay**: 2 hours after calculation
- **Language**: Portuguese
- **Features**:
  - Explains benefits of full platform
  - Drives waitlist conversion
  - Addresses tax complexity pain points
  - Clear CTA for signup

### 3. AIMI Calculator Follow-up (`aimi_calculator`)
- **Trigger**: AIMI calculator usage where user qualifies for exemption
- **Delay**: 1 hour after calculation
- **Language**: Portuguese
- **Features**:
  - Congratulates on potential savings
  - Explains AIMI exemption benefits (€500+ savings)
  - Emphasizes requirement verification
  - Strong CTA for priority access

## Setup Instructions

### Prerequisites
- Neon database provisioned (see `DATABASE_SETUP.md`)
- `DATABASE_URL` environment variable configured
- Required packages: `@neondatabase/serverless`, `resend`

### Installation
```bash
# Install dependencies
npm install

# Setup email templates in database
npm run setup-emails

# Or run directly
node scripts/setup-email-sequences.js
```

### Verification
```bash
# Check database connection and schema
npm run setup-db

# Verify email sequences were created
psql $DATABASE_URL -c "SELECT sequence, step, subject FROM email_sequences;"
```

## Template Variables

All templates support variable substitution using `{{VARIABLE}}` syntax:

### Waitlist Welcome
- `{{NAME}}` - User's name (optional)
- `{{EMAIL}}` - User's email address
- `{{POSITION}}` - Queue position number
- `{{REFERRAL_CODE}}` - User's unique referral code
- `{{REFERRAL_LINK}}` - Full referral URL

### Calculator Follow-ups
- `{{NAME}}` - User's name (optional)
- `{{EMAIL}}` - User's email address

## Email Sending Integration

### Automatic Triggers
- Waitlist API (`/api/waitlist`) automatically sends welcome emails
- Calculator APIs with email capture trigger follow-up sequences
- All sending handled via Resend with tracking

### Manual Testing
```bash
# Test email template rendering
node -e "
const { substituteVariables } = require('./src/lib/email.ts');
console.log(substituteVariables('Hello {{NAME}}!', { NAME: 'João' }));
"
```

## Metrics & Tracking

Email sequences track:
- `send_count` - Total emails sent
- `open_count` - Email opens (requires Resend webhook)
- `click_count` - Link clicks (requires Resend webhook)

View metrics:
```sql
SELECT
  sequence,
  step,
  send_count,
  CASE WHEN send_count > 0 THEN (open_count::float / send_count * 100)::int ELSE 0 END as open_rate,
  CASE WHEN send_count > 0 THEN (click_count::float / send_count * 100)::int ELSE 0 END as click_rate
FROM email_sequences
WHERE is_active = true
ORDER BY sequence, step;
```

## A/B Testing

Templates support variants via the `variant` field:
- Default: `'a'`
- Test variant: `'b'`

To create A/B tests:
1. Add variant 'b' templates with different copy
2. Randomly assign users to variants in API
3. Compare metrics between variants

## Content Guidelines

### Portuguese Tone
- Formal but friendly ("si" not "tu")
- Professional terminology for tax concepts
- Clear benefit-focused messaging
- Strong CTAs with urgency

### Email Structure
1. **Subject**: Clear benefit or status update
2. **Greeting**: Personalized with name
3. **Value proposition**: What's in it for them
4. **Proof/credibility**: Savings amounts, feature lists
5. **CTA**: Single, clear action
6. **Footer**: Unsubscribe, company info

## Environment Variables

Required for email sending:
- `RESEND_API_KEY` - Resend API key for sending
- `SENDING_DOMAIN` - Verified domain for from address
- `NEXT_PUBLIC_URL` - Base URL for links in emails

## Files

- `/scripts/setup-email-sequences.js` - Database setup script
- `/src/lib/email.ts` - Email utilities and sending logic
- `/src/app/api/waitlist/route.ts` - Waitlist API with email integration
- `/schema.sql` - Database schema including `email_sequences` table

## Next Steps

1. **Production Setup**: Run `setup-email-sequences.js` with production DATABASE_URL
2. **Email Testing**: Send test emails to verify templates render correctly
3. **Metrics Setup**: Configure Resend webhooks for open/click tracking
4. **A/B Testing**: Create variant templates for conversion optimization
5. **Segmentation**: Add metadata-based targeting for personalized sequences

---

**Status**: ✅ Complete - Templates ready for production deployment
**Impact**: Automated user engagement, waitlist growth, calculator user conversion