# Database Setup for Senhorio

> **Critical Blocker Resolved**: This guide enables waitlist lead capture by provisioning the Neon database that the waitlist form requires.

## Current Status

- ✅ **Waitlist API**: Fully implemented in `/src/app/api/waitlist/route.ts`
- ✅ **Database Schema**: Complete schema in `schema.sql` (waitlist, email sequences, etc.)
- ✅ **Frontend Form**: Working waitlist form on landing page
- ❌ **Database**: DATABASE_URL contains placeholder values
- ❌ **Lead Capture**: Zero leads captured due to missing database

## Quick Setup (5 minutes)

### 1. Create Neon Database

1. Go to [console.neon.tech](https://console.neon.tech)
2. Click "Create Project"
3. **Project Name**: `senhorio`
4. **Region**: `AWS Europe (eu-central-1) Frankfurt` (closest to Portugal)
5. Click "Create Project"
6. Wait for provisioning to complete (~30 seconds)

### 2. Get Database URL

1. In the Neon dashboard, navigate to the **Connection Details** tab
2. Copy the **Connection string** (starts with `postgresql://`)
3. Should look like: `postgresql://username:password@hostname:5432/database?sslmode=require`

### 3. Update Vercel Environment Variable

1. Go to [Vercel Project Settings](https://vercel.com/carloshmiranda/senhorio/settings/environment-variables)
2. Find the existing `DATABASE_URL` variable
3. Click **Edit** on the `DATABASE_URL` row
4. Replace the placeholder value with your real Neon connection string
5. Ensure it targets: **Production**, **Preview**, and **Development**
6. Click **Save**

### 4. Apply Database Schema

```bash
# Set the DATABASE_URL locally (use your real connection string)
export DATABASE_URL="postgresql://username:password@hostname:5432/database?sslmode=require"

# Apply the schema
node scripts/setup-database.js

# Expected output:
# ✅ Database connection successful!
# 📝 Applying database schema...
# ✅ Created 8 tables: waitlist, email_sequences, customers, properties, etc.
# 🧪 Testing waitlist API...
# ✅ Waitlist API test successful
```

### 5. Deploy & Test

```bash
# Trigger a Vercel redeploy to use the new DATABASE_URL
git add .
git commit -m "feat: database provisioning setup"
git push origin main

# Verify everything works
node scripts/verify-waitlist.js
```

### 6. Test Live Waitlist

1. Visit [https://senhorio.vercel.app](https://senhorio.vercel.app)
2. Scroll to the waitlist form
3. Enter a test email and sign up
4. Check the Neon dashboard → Tables → `waitlist` to see the data

## Automated Setup (Optional)

If you have a Neon API key for automation:

```bash
# Set your Neon API key
export NEON_API_KEY="your_neon_api_key"

# Run automated provisioning
node scripts/provision-neon.js

# This will:
# - Create the Neon project
# - Update Vercel environment variables
# - Apply the database schema
# - Test the connection
```

## Verification Commands

```bash
# Test database connection and schema
node scripts/setup-database.js

# Full waitlist functionality test
node scripts/verify-waitlist.js

# Check current environment variables in Vercel
curl -H "Authorization: Bearer $VERCEL_TOKEN" \
  "https://api.vercel.com/v10/projects/senhorio/env"
```

## Troubleshooting

### "DATABASE_URL is not configured"
- The environment variable exists but has placeholder values
- Follow step 3 above to update with real Neon connection string

### "Schema application failed"
- Database exists but tables aren't created
- Run `node scripts/setup-database.js` with correct DATABASE_URL

### "Connection failed"
- Check if Neon database is active (auto-pauses after 5 minutes of inactivity)
- Verify connection string format and credentials
- Ensure SSL is enabled (`?sslmode=require`)

### API tests fail
- Verify Vercel has been redeployed with new DATABASE_URL
- Check the `/api/waitlist` endpoint directly in browser
- Look at Vercel function logs for error details

## What Happens After Setup

1. **Immediate**: Waitlist form starts capturing leads
2. **Within hours**: Should see first organic signups
3. **Within days**: Referral system drives viral growth
4. **Next cycle**: Email sequences can be configured for better engagement

## Database Schema Overview

The schema includes everything needed for the complete platform:

- **`waitlist`**: Pre-launch signups with referral mechanics
- **`email_sequences`**: Automated welcome/nurture emails
- **`customers`**: User accounts (for post-launch)
- **`properties`**: Rental properties (for post-launch)
- **`tenants`**: Tenant management (for post-launch)
- **`receipts`**: Rent receipts (for post-launch)
- **`expenses`**: Property expenses (for post-launch)

This single setup enables both current waitlist functionality and future product features.

---

**Status after completion**: Database provisioned ✅ | Waitlist capturing leads ✅ | Ready for next cycle ✅