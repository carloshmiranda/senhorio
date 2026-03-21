# Database Setup Guide

This guide walks through setting up the Neon PostgreSQL database for Senhorio.

## Quick Setup (Automated)

If you have API keys, use the automated script:

```bash
# Set required environment variables
export NEON_API_KEY="your_neon_api_key"
export VERCEL_TOKEN="your_vercel_token"

# Run the provisioning script
./scripts/provision-neon.sh
```

This will:
1. Create a new Neon project named "senhorio"
2. Generate database credentials
3. Set DATABASE_URL in Vercel
4. Apply the database schema
5. Test the connection

## Manual Setup

### 1. Create Neon Project

1. Go to [Neon Console](https://console.neon.tech)
2. Click "Create Project"
3. Project name: `senhorio`
4. Region: `AWS eu-central-1 (Frankfurt)` (closest to Portugal)
5. Click "Create project"

### 2. Get Connection String

1. In your project dashboard, click "Connection string"
2. Copy the connection string
3. It should look like:
   ```
   postgresql://username:password@hostname/database?sslmode=require
   ```

### 3. Configure Environment Variables

#### In Vercel (for production):
1. Go to [Project Settings > Environment Variables](https://vercel.com/carloshmiranda/senhorio/settings/environment-variables)
2. Add `DATABASE_URL` with your connection string
3. Set target: Production, Preview, Development

#### For local development:
```bash
# Create .env.local file
echo "DATABASE_URL=your_connection_string_here" > .env.local
```

### 4. Apply Database Schema

```bash
# Install dependencies
npm install

# Apply schema and test connection
npm run setup-db
```

## Schema Overview

The database includes these main tables:

- **customers** - User accounts with Stripe integration
- **waitlist** - Pre-launch signups with referral tracking
- **email_sequences** - Email campaign templates
- **email_log** - Email delivery tracking
- **properties** - Rental properties owned by landlords
- **tenants** - People renting properties
- **rental_payments** - Monthly rent tracking
- **receipts** - Official rent receipts (Recibos de Renda)
- **expenses** - Property-related costs
- **tax_summary** - Annual tax calculations

## Testing the Setup

### Test Database Connection

```bash
npm run setup-db
```

This will:
- ✅ Verify DATABASE_URL is set
- ✅ Test database connectivity
- ✅ Apply schema if needed
- ✅ Create required tables
- ✅ Test waitlist API functionality

### Test Waitlist API

```bash
# Test signup
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User"}'

# Check position
curl "http://localhost:3000/api/waitlist?email=test@example.com"
```

## Troubleshooting

### Connection Issues

1. **"DATABASE_URL is not configured"**
   - Verify the environment variable is set
   - Check for typos in the connection string

2. **"Connection timeout"**
   - Confirm your IP is allowlisted in Neon (should be automatic)
   - Check if the database is sleeping (free tier)

3. **"Role does not exist"**
   - Ensure the username in the connection string is correct
   - Try resetting the database password in Neon console

### Schema Issues

1. **"Table already exists"**
   - This is normal, the script skips existing tables

2. **"Permission denied"**
   - Verify the database user has creation privileges
   - Check the role permissions in Neon console

### Vercel Deployment Issues

1. **"DATABASE_URL not available in Vercel"**
   - Ensure the environment variable targets all environments
   - Redeploy after setting the variable

2. **"Functions timeout"**
   - Database calls should use connection pooling (automatic with Neon serverless)
   - Check for slow queries in the Neon monitoring

## Database Monitoring

- **Neon Console**: Monitor connection usage and performance
- **Vercel Analytics**: Track function execution times
- **Email Log**: Monitor email delivery success rates

## Next Steps

After database setup:

1. Deploy to production: `git push origin main`
2. Test waitlist flow end-to-end
3. Set up email sequences in the database
4. Configure Stripe for payment processing
5. Monitor signup conversion rates