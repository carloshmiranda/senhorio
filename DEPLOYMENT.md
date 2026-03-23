# Senhorio Database Deployment Guide

## Current Status
- ❌ Neon API key returns 401 (broken/expired)
- ❌ DATABASE_URL in Vercel set to placeholder values
- ✅ Schema isolation approach implemented
- ✅ Database provisioning scripts created

## Database Provisioning Strategy

### Option 1: Schema-based Isolation (Recommended)
Use existing Neon project with dedicated schema for isolation:

1. **Connect to existing Hive Neon project:**
   ```sql
   -- Connect using existing credentials
   psql "postgresql://user:pass@host/database?sslmode=require"
   ```

2. **Create senhorio schema:**
   ```sql
   CREATE SCHEMA IF NOT EXISTS senhorio;
   GRANT ALL ON SCHEMA senhorio TO your_user;
   GRANT ALL ON ALL TABLES IN SCHEMA senhorio TO your_user;
   ALTER DEFAULT PRIVILEGES IN SCHEMA senhorio GRANT ALL ON TABLES TO your_user;
   ```

3. **Create schema-specific connection string:**
   ```
   postgresql://user:pass@host/database?sslmode=require&options=-c%20search_path%3Dsenhorio,public
   ```

### Option 2: Dedicated Database
Create separate database in existing Neon project:

1. **Create database:**
   ```sql
   CREATE DATABASE senhorio;
   ```

2. **Connection string:**
   ```
   postgresql://user:pass@host/senhorio?sslmode=require
   ```

## Deployment Steps

### 1. Configure Database
```bash
# Check current Vercel configuration
npm run db:configure

# Update DATABASE_URL (replace with real connection string)
node scripts/configure-database.js update "postgresql://user:pass@host/db?sslmode=require&options=-c%20search_path%3Dsenhorio,public"
```

### 2. Apply Schema
```bash
# Provision database and apply schema
npm run db:provision
```

### 3. Verify Deployment
```bash
# Test health endpoint
curl https://senhorio.vercel.app/api/health

# Expected response:
# {"ok": true, "data": {"status": "healthy", "database": "connected"}}
```

### 4. Test Waitlist Functionality
```bash
# Test waitlist API
curl -X POST https://senhorio.vercel.app/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User"}'
```

## Environment Variables Required

| Variable | Purpose | Status |
|----------|---------|--------|
| `DATABASE_URL` | Neon connection string | ⚠️ Placeholder |
| `VERCEL_TOKEN` | Deployment management | ✅ Available |
| `STRIPE_SECRET_KEY` | Payment processing | ⚠️ Placeholder |
| `RESEND_API_KEY` | Email sending | ❌ Missing |

## Manual Steps Required

1. **Get Neon connection details:**
   - Access existing Hive Neon project
   - Create senhorio schema or database
   - Get connection string with proper schema path

2. **Update Vercel environment:**
   ```bash
   # Using Vercel CLI
   vercel env add DATABASE_URL

   # Or using API (if VERCEL_TOKEN available)
   node scripts/configure-database.js update "your_connection_string"
   ```

3. **Trigger redeploy:**
   ```bash
   # Force redeploy to apply new env vars
   curl -X POST "https://api.vercel.com/v13/deployments" \
     -H "Authorization: Bearer $VERCEL_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "senhorio",
       "target": "production",
       "gitSource": {
         "type": "github",
         "org": "carloshmiranda",
         "repo": "senhorio",
         "ref": "main"
       }
     }'
   ```

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL format
- Check schema exists and has correct permissions
- Test connection manually with psql

### Schema Application Issues
- Check for conflicting table names
- Verify user permissions
- Run statements individually if batch fails

### Health Endpoint Issues
- Check Vercel deployment logs
- Verify environment variables are applied
- Test database connection locally

## Success Criteria
- [ ] DATABASE_URL configured with real Neon connection string
- [ ] Schema applied successfully (25+ tables created)
- [ ] Health endpoint returns 200 with "connected" status
- [ ] Waitlist API can store and retrieve data
- [ ] Stats endpoint returns data

## Next Steps After Database Setup
1. Test all API endpoints
2. Verify waitlist form on landing page works
3. Enable metrics collection cron
4. Monitor database performance and optimize if needed