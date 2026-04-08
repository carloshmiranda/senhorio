# Email Notifications Setup

This document explains how to configure and use the automated email notification system for Senhorio.

## Overview

The email notification system automatically sends reminders and alerts to landlords about:

- **Payment Reminders**: 3 days and 1 day before rent payment due dates
- **Overdue Payments**: Daily alerts for overdue rent payments
- **Monthly Summary**: Monthly portfolio performance summary (sent on 1st of each month)
- **Tax Deadlines**: Reminders about Portuguese tax obligations for landlords
- **Receipt Generation**: Reminders to generate receipts for paid rent payments

## System Components

### 1. Email Templates & API (`/api/notifications/`)
- Professional HTML email templates in Portuguese
- Manual notification triggering endpoint
- Integration with Resend email service
- Full notification logging and tracking

### 2. Notification Preferences (`/api/notifications/preferences/`)
- User-configurable notification settings
- Enable/disable individual notification types
- Email delivery preferences

### 3. Automated Processing Script (`/scripts/process-notifications.js`)
- Background job for automatic notification processing
- Runs via cron scheduler
- Supports dry-run mode for testing
- Duplicate prevention (won't send same notification twice in 24 hours)

### 4. Dashboard Settings (`/dashboard/settings`)
- User interface for managing notification preferences
- Notification history viewer
- Test notification functionality

## Setup Instructions

### 1. Environment Variables

Ensure these environment variables are configured:

```bash
DATABASE_URL=your_neon_database_url
RESEND_API_KEY=your_resend_api_key
```

### 2. Database Schema

The notification system uses these database tables:
- `notification_preferences` - User notification settings
- `notification_history` - Log of sent notifications
- `rental_payments` - Payment due dates and status
- `customers` - User information

### 3. Cron Job Setup

Set up a cron job to run the notification processor daily:

```bash
# Run every day at 9:00 AM
0 9 * * * cd /path/to/senhorio && node scripts/process-notifications.js >> logs/notifications.log 2>&1
```

Or use a more flexible schedule:
```bash
# Run multiple times per day for better coverage
0 9,14,18 * * * cd /path/to/senhorio && node scripts/process-notifications.js
```

## Script Usage

### Basic Usage
```bash
# Run all notification types
node scripts/process-notifications.js

# Dry run (test without sending emails)
node scripts/process-notifications.js --dry-run

# Run specific notification type only
node scripts/process-notifications.js --type=payment_reminder_3_days
```

### Notification Types
- `payment_reminder_3_days` - 3 days before payment due
- `payment_reminder_1_day` - 1 day before payment due  
- `payment_overdue` - For overdue payments
- `monthly_summary` - Monthly portfolio summary (1st of month)
- `tax_deadline_reminder` - Tax obligation reminders (specific dates)
- `receipt_generation_reminder` - Receipt generation reminders (5th of month)

### Example Cron Schedule

For a production deployment, consider this schedule:

```bash
# Process payment reminders twice daily
0 9,18 * * * cd /path/to/senhorio && node scripts/process-notifications.js --type=payment_reminder_3_days
30 9,18 * * * cd /path/to/senhorio && node scripts/process-notifications.js --type=payment_reminder_1_day

# Check for overdue payments daily at 10 AM
0 10 * * * cd /path/to/senhorio && node scripts/process-notifications.js --type=payment_overdue

# Monthly summary on 1st of month at 8 AM
0 8 1 * * cd /path/to/senhorio && node scripts/process-notifications.js --type=monthly_summary

# Receipt reminders on 5th of month at 9 AM
0 9 5 * * cd /path/to/senhorio && node scripts/process-notifications.js --type=receipt_generation_reminder

# Tax deadline reminders (specific dates)
0 9 24 3,5,7,9,12 * cd /path/to/senhorio && node scripts/process-notifications.js --type=tax_deadline_reminder
```

## Monitoring

### Check Logs
```bash
# View recent notification activity
tail -f logs/notifications.log

# Test specific notification type
node scripts/process-notifications.js --dry-run --type=payment_reminder_3_days
```

### Dashboard Monitoring
- Visit `/dashboard/settings` to view notification history
- Send test notifications to verify email delivery
- Monitor notification preferences and user settings

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check `RESEND_API_KEY` environment variable
   - Verify Resend domain authentication
   - Check notification preferences are enabled

2. **No notifications generated**
   - Verify cron job is running
   - Check database connectivity
   - Ensure users have active properties and tenants

3. **Duplicate notifications**
   - System automatically prevents duplicates within 24 hours
   - Check `notification_history` table for sent notifications

### Testing
```bash
# Test all notification types
node scripts/process-notifications.js --dry-run

# Test email delivery with specific user
# (use manual API call to /api/notifications)

# Check database state
# SELECT * FROM notification_history ORDER BY sent_at DESC LIMIT 10;
```

## User Features

### For Landlords

1. **Notification Settings**: Configure which notifications to receive
2. **Email Preferences**: Enable/disable email delivery per notification type
3. **Notification History**: View all sent notifications and delivery status
4. **Test Notifications**: Send test emails to verify setup

### Portuguese Localization

- All email templates are in Portuguese
- Date formatting uses Portuguese locale
- Tax-specific content follows Portuguese legislation
- Currency formatting in Euros (€)

## Security & Privacy

- User preferences are stored per-user in the database
- Email addresses are only used for notification delivery
- Notification history includes delivery status but not email content
- Users can opt-out of any notification type
- No personal data is shared with external services except email delivery

## Support

For issues with the notification system:
1. Check logs for error messages
2. Test with `--dry-run` to identify issues
3. Verify environment variables and database connectivity
4. Use dashboard settings to test individual notifications