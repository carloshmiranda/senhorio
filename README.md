# Senhorio

> The all-in-one rental management platform built for Portuguese landlords — track rents, issue receipts, calculate taxes, stay compliant.

## Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/carloshmiranda/senhorio.git
cd senhorio
npm install
```

### 2. Set Up Database
```bash
# Automated setup (requires API keys)
export NEON_API_KEY="your_neon_api_key"
export VERCEL_TOKEN="your_vercel_token"
./scripts/provision-neon.sh

# OR manual setup - see docs/DATABASE_SETUP.md
```

### 3. Configure Environment
```bash
# Copy environment template
cp .env.example .env.local

# Edit with your values
# DATABASE_URL=postgresql://...
# RESEND_API_KEY=...
# STRIPE_SECRET_KEY=...
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Database**: Neon serverless Postgres
- **Payments**: Stripe Checkout + Customer Portal
- **Email**: Resend for transactional email
- **Deployment**: Vercel

## Project Structure

```
senhorio/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── blog/           # SEO blog content
│   │   ├── calculadora/    # Tax calculator
│   │   └── dashboard/      # User dashboard
│   ├── components/         # React components
│   └── lib/               # Utilities (db, auth)
├── scripts/               # Setup and maintenance scripts
├── docs/                  # Documentation
├── schema.sql            # Database schema
└── public/               # Static assets
```

## Features

### Current (MVP)
- ✅ Tax regime calculator (4 Portuguese tax regimes)
- ✅ Rent increase calculator (INE coefficient 2.24%)
- ✅ AIMI exemption checker for 2026
- ✅ Professional landing page
- ✅ SEO blog content
- ✅ User dashboard with JWT authentication
- ✅ Waitlist management with referral tracking
- ✅ Email sequences automation (welcome, calculator follow-ups)
- ✅ Email management interface and CLI tools

### Coming Soon (Core Product)
- 🔄 Property portfolio dashboard
- 🔄 Receipt tracking and generation
- 🔄 Expense logging
- 🔄 Stripe payment integration

### Future (Growth)
- 📋 IRS Annex F export
- 📋 AIMI exemption checker
- 📋 Rental yield calculator
- 📋 English language mode

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run setup-db     # Set up database and apply schema
```

### Email Management Scripts

```bash
# Interactive email management
node scripts/manage-email-sequences.js

# Setup email templates (requires DATABASE_URL)
node scripts/setup-email-sequences.js

# Verify waitlist and email setup
node scripts/verify-waitlist.js
```

## API Routes

### Core APIs
- `POST /api/waitlist` - Join waitlist with referral tracking
- `GET /api/waitlist?email=...` - Check waitlist position
- `POST /api/auth` - User authentication
- `GET /api/properties` - List user properties
- `POST /api/payments` - Process rent payments

### Email Management APIs
- `GET /api/email-sequences` - List email sequences
- `POST /api/email-sequences` - Create email sequence
- `PUT /api/email-sequences?id=...` - Update email sequence
- `DELETE /api/email-sequences?id=...` - Delete email sequence

### Admin Interfaces
- `/admin/email-status` - Email sequences management dashboard

## Environment Variables

Required for production:

```bash
# Database (Neon)
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Authentication
JWT_SECRET=your-jwt-secret

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Email (Resend)
RESEND_API_KEY=re_...
RESEND_WEBHOOK_SECRET=whsec_...

# App Configuration
NEXT_PUBLIC_URL=https://senhorio.vercel.app
LAUNCH_MODE=waitlist
```

## Documentation

- [Database Setup Guide](docs/DATABASE_SETUP.md)
- [Project Instructions](CLAUDE.md)

## Contributing

This is a Hive-managed project. Development follows the Hive Engineering workflow:

1. Tasks are managed via CEO plans
2. Features implemented via `hive/cycle-N-task-id` branches
3. All changes go through PR review
4. Deploy via Vercel integration

## License

Private project - Hive company ID: 5e6e3d50-8f4d-47a3-b6b3-a0fc5f6bf62e