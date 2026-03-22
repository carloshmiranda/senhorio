# Email Sequences - Senhorio

This document describes the email sequences system for automated email communication with waitlist members and customers.

## Overview

The email sequences system consists of:
- **Email Templates**: Stored in `email_sequences` table with variable substitution
- **Email Logging**: All sent emails tracked in `email_log` table for deliverability and metrics
- **Automated Sending**: Triggered by user actions (waitlist signup, etc.)

## Database Schema

### email_sequences table
- Stores email templates with metadata
- Supports A/B testing with `variant` field
- Tracks performance metrics (`send_count`, `open_count`, `click_count`)
- Variable substitution with `{{VARIABLE}}` syntax

### email_log table
- Tracks every email sent for deliverability monitoring
- Links to Resend message IDs for webhook processing
- Records delivery status and engagement metrics

## Current Email Sequences

### waitlist_welcome (Step 1)
**Purpose**: Welcome new waitlist signups with onboarding content

**Variables**:
- `{{NAME}}` - User's name (fallback: "there")
- `{{POSITION}}` - Position in waitlist queue
- `{{REFERRAL_CODE}}` - User's unique referral code
- `{{REFERRAL_LINK}}` - Full referral URL
- `{{EMAIL}}` - User's email address

**Content**:
- Welcome message with position badge
- Links to free calculators (tax, rent, AIMI)
- Referral mechanics explanation
- Blog content recommendations
- Call-to-action to explore calculators

**Languages**: Portuguese (primary market)

## Setup Instructions

### 1. Database Configuration
Ensure `DATABASE_URL` is configured pointing to your Neon database.

### 2. Email Service Setup
Configure Resend for email delivery:
```bash
# Required environment variables
RESEND_API_KEY=your_resend_api_key
SENDING_DOMAIN=your_verified_domain  # defaults to resend.dev
NEXT_PUBLIC_URL=https://your_domain.com
```

### 3. Initialize Email Templates
Run the setup script to create email templates:
```bash
node scripts/setup-email-sequences.js
```

This script:
- ✅ Creates/updates waitlist welcome email template
- ✅ Validates variable substitution
- ✅ Provides setup status and next steps

## Email Flow

### Waitlist Signup Flow
1. User joins waitlist via `/api/waitlist`
2. System checks for `waitlist_welcome` template (step 1, variant a)
3. If template exists and Resend is configured:
   - Substitutes variables in subject and body
   - Sends email via Resend API
   - Logs to `email_log` table
   - Increments `send_count` metric

### Error Handling
- Email sending failures are logged but non-blocking
- Waitlist signup succeeds even if email fails
- Email failures logged to console for monitoring

## Variable Substitution

Variables use `{{VARIABLE}}` syntax and are replaced at send time:

```html
<!-- Template -->
<h1>Hello {{NAME}}!</h1>
<p>Your position is #{{POSITION}}</p>

<!-- Rendered -->
<h1>Hello João!</h1>
<p>Your position is #42</p>
```

## Performance Monitoring

### Metrics Tracked
- `send_count` - Total emails sent for each template
- `open_count` - Email opens (via Resend webhooks)
- `click_count` - Link clicks (via Resend webhooks)

### Deliverability Monitoring
Check `email_log` table for:
- Delivery status (`sent`, `delivered`, `bounced`)
- Bounce rates by template
- Engagement metrics by sequence

## Future Sequences

Additional sequences to implement:
- **onboarding_d1**: Day 1 onboarding with tax guide
- **onboarding_d7**: Day 7 follow-up with feature highlights
- **pre_launch**: Pre-launch notification for top waitlist positions
- **product_updates**: Monthly product and tax updates

## Troubleshooting

### Email Not Sending
1. Check `DATABASE_URL` configuration
2. Verify `RESEND_API_KEY` is valid
3. Confirm email template exists in database
4. Check console logs for error messages

### Template Not Found
Run setup script to create templates:
```bash
node scripts/setup-email-sequences.js
```

### Variables Not Substituting
Ensure variable names match exactly (case-sensitive):
- ✅ `{{NAME}}`
- ❌ `{{name}}` or `{{Name}}`

## Security Notes

- Email templates stored in database (not code) for easy updates
- No user PII in email logs beyond email address
- Resend handles email delivery and bounce processing
- All database queries use parameterized queries