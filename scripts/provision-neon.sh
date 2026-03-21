#!/bin/bash

# Provision Neon Database for Senhorio
# This script creates a new Neon project and database, then configures Vercel

set -e

echo "🏗️  Provisioning Neon database for Senhorio..."

# Check if required environment variables are set
if [ -z "$NEON_API_KEY" ]; then
  echo "❌ NEON_API_KEY environment variable is required"
  echo ""
  echo "To get your API key:"
  echo "1. Go to https://console.neon.tech/app/settings/api-keys"
  echo "2. Create a new API key"
  echo "3. Export it: export NEON_API_KEY=your_api_key_here"
  echo "4. Run this script again"
  exit 1
fi

if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ VERCEL_TOKEN environment variable is required"
  echo ""
  echo "To get your Vercel token:"
  echo "1. Go to https://vercel.com/account/tokens"
  echo "2. Create a new token"
  echo "3. Export it: export VERCEL_TOKEN=your_vercel_token_here"
  echo "4. Run this script again"
  exit 1
fi

echo "✅ Environment variables configured"

# Create Neon project
echo "📂 Creating Neon project..."

PROJECT_RESPONSE=$(curl -s -X POST \
  https://console.neon.tech/api/v2/projects \
  -H "Authorization: Bearer $NEON_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "project": {
      "name": "senhorio",
      "region_id": "aws-eu-central-1"
    }
  }')

# Extract project details
PROJECT_ID=$(echo "$PROJECT_RESPONSE" | jq -r '.project.id')
DATABASE_HOST=$(echo "$PROJECT_RESPONSE" | jq -r '.database.host')
DATABASE_NAME=$(echo "$PROJECT_RESPONSE" | jq -r '.database.name')
DEFAULT_BRANCH_ID=$(echo "$PROJECT_RESPONSE" | jq -r '.project.default_branch_id')

if [ "$PROJECT_ID" = "null" ] || [ "$PROJECT_ID" = "" ]; then
  echo "❌ Failed to create Neon project"
  echo "Response: $PROJECT_RESPONSE"
  exit 1
fi

echo "✅ Created Neon project: $PROJECT_ID"
echo "   → Host: $DATABASE_HOST"
echo "   → Database: $DATABASE_NAME"

# Get database user (role)
echo "🔐 Getting database credentials..."

ROLES_RESPONSE=$(curl -s -X GET \
  "https://console.neon.tech/api/v2/projects/$PROJECT_ID/branches/$DEFAULT_BRANCH_ID/roles" \
  -H "Authorization: Bearer $NEON_API_KEY")

DATABASE_USER=$(echo "$ROLES_RESPONSE" | jq -r '.roles[0].name')

if [ "$DATABASE_USER" = "null" ] || [ "$DATABASE_USER" = "" ]; then
  echo "❌ Failed to get database user"
  echo "Response: $ROLES_RESPONSE"
  exit 1
fi

echo "✅ Database user: $DATABASE_USER"

# Generate password for the role
echo "🔑 Generating database password..."

PASSWORD_RESPONSE=$(curl -s -X POST \
  "https://console.neon.tech/api/v2/projects/$PROJECT_ID/branches/$DEFAULT_BRANCH_ID/roles/$DATABASE_USER/reset_password" \
  -H "Authorization: Bearer $NEON_API_KEY" \
  -H "Content-Type: application/json")

DATABASE_PASSWORD=$(echo "$PASSWORD_RESPONSE" | jq -r '.password')

if [ "$DATABASE_PASSWORD" = "null" ] || [ "$DATABASE_PASSWORD" = "" ]; then
  echo "❌ Failed to generate database password"
  echo "Response: $PASSWORD_RESPONSE"
  exit 1
fi

echo "✅ Database password generated"

# Construct connection string
DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?sslmode=require"

echo "🔗 Database URL constructed"

# Set environment variable in Vercel
echo "⚡ Setting DATABASE_URL in Vercel..."

VERCEL_ENV_RESPONSE=$(curl -s -X POST \
  "https://api.vercel.com/v10/projects/senhorio/env" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"key\": \"DATABASE_URL\",
    \"value\": \"$DATABASE_URL\",
    \"target\": [\"production\", \"preview\", \"development\"],
    \"type\": \"encrypted\"
  }")

ENV_VAR_ID=$(echo "$VERCEL_ENV_RESPONSE" | jq -r '.created.id // .id')

if [ "$ENV_VAR_ID" = "null" ] || [ "$ENV_VAR_ID" = "" ]; then
  echo "❌ Failed to set DATABASE_URL in Vercel"
  echo "Response: $VERCEL_ENV_RESPONSE"
  echo ""
  echo "Please manually set DATABASE_URL in Vercel:"
  echo "https://vercel.com/carloshmiranda/senhorio/settings/environment-variables"
  echo ""
  echo "DATABASE_URL=$DATABASE_URL"
else
  echo "✅ DATABASE_URL set in Vercel (ID: $ENV_VAR_ID)"
fi

# Test the connection locally
echo "🧪 Testing database connection..."

export DATABASE_URL="$DATABASE_URL"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Run the database setup
echo "🗃️  Applying database schema..."
npm run setup-db

echo ""
echo "🎉 Database provisioned successfully!"
echo ""
echo "📋 Summary:"
echo "   → Neon Project ID: $PROJECT_ID"
echo "   → Database Host: $DATABASE_HOST"
echo "   → Database Name: $DATABASE_NAME"
echo "   → Database User: $DATABASE_USER"
echo "   → Vercel Env Var: Set ✅"
echo ""
echo "🚀 Next steps:"
echo "   1. Deploy to Vercel: git push origin main"
echo "   2. Test waitlist signup at: https://senhorio.vercel.app"
echo "   3. Monitor signup metrics in the dashboard"
echo ""
echo "📖 Database console: https://console.neon.tech/app/projects/$PROJECT_ID"