-- Company database schema — run against the company's own Neon project
-- This is the minimum viable schema. The Engineer agent will extend it.

CREATE TABLE IF NOT EXISTS customers (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name            TEXT,
  email           TEXT UNIQUE NOT NULL,
  password_hash   TEXT,
  stripe_customer_id TEXT,
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'churned', 'paused')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_stripe ON customers(stripe_customer_id);

-- Waitlist: pre-launch signups with referral mechanics
CREATE TABLE IF NOT EXISTS waitlist (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email           TEXT UNIQUE NOT NULL,
  name            TEXT,
  referral_code   TEXT UNIQUE NOT NULL,          -- this user's unique code
  referred_by     TEXT REFERENCES waitlist(id),   -- who referred them
  referral_count  INTEGER NOT NULL DEFAULT 0,     -- how many people they referred
  position        INTEGER,                        -- queue position (null = not yet assigned)
  source          TEXT DEFAULT 'organic',          -- organic, referral, social, blog, ad
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  status          TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'invited', 'converted', 'churned')),
  invited_at      TIMESTAMPTZ,
  converted_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist(referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_position ON waitlist(position);

-- Email sequences: Growth-managed structured email data
CREATE TABLE IF NOT EXISTS email_sequences (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  sequence        TEXT NOT NULL,                   -- e.g. 'waitlist_welcome', 'onboarding_d1'
  step            INTEGER NOT NULL DEFAULT 1,
  subject         TEXT NOT NULL,
  body_html       TEXT NOT NULL,
  body_text       TEXT,
  delay_hours     INTEGER NOT NULL DEFAULT 0,      -- hours after trigger to send
  variant         TEXT DEFAULT 'a',                 -- a/b testing
  is_active       BOOLEAN DEFAULT true,
  send_count      INTEGER DEFAULT 0,
  open_count      INTEGER DEFAULT 0,
  click_count     INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(sequence, step, variant)
);

-- Email log: tracks every email sent for deliverability and metrics
CREATE TABLE IF NOT EXISTS email_log (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  recipient       TEXT NOT NULL,
  sequence_id     TEXT REFERENCES email_sequences(id),
  subject         TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained')),
  resend_id       TEXT,                            -- Resend message ID for tracking
  opened_at       TIMESTAMPTZ,
  clicked_at      TIMESTAMPTZ,
  bounced_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_log_recipient ON email_log(recipient);
CREATE INDEX IF NOT EXISTS idx_email_log_sequence ON email_log(sequence_id);
CREATE INDEX IF NOT EXISTS idx_email_log_resend_id ON email_log(resend_id);

-- ============================================================
-- Core domain tables — landlord management
-- ============================================================

-- Properties: each rental unit owned by a landlord
CREATE TABLE IF NOT EXISTS properties (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_id        TEXT NOT NULL REFERENCES customers(id),
  address         TEXT NOT NULL,
  city            TEXT,
  municipality    TEXT,
  property_type   TEXT NOT NULL DEFAULT 'apartment' CHECK (property_type IN ('apartment', 'house', 'commercial', 'land')),
  typology        TEXT CHECK (typology IN ('T0', 'T1', 'T2', 'T3', 'T4', 'T5+')),
  area_m2         NUMERIC,
  year_built      INTEGER,
  license_number  TEXT,
  fiscal_value    NUMERIC,            -- Valor Patrimonial Tributário (VPT)
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'sold')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_properties_owner ON properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);

-- Tenants: people renting a property
CREATE TABLE IF NOT EXISTS tenants (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  property_id     TEXT NOT NULL REFERENCES properties(id),
  name            TEXT NOT NULL,
  email           TEXT,
  phone           TEXT,
  nif             TEXT,                -- Número de Identificação Fiscal
  contract_start  DATE NOT NULL,
  contract_end    DATE,
  contract_type   TEXT NOT NULL DEFAULT 'residential' CHECK (contract_type IN ('residential', 'commercial', 'student', 'temporary')),
  rent_amount     NUMERIC NOT NULL,
  payment_day     INTEGER NOT NULL DEFAULT 1 CHECK (payment_day >= 1 AND payment_day <= 31),
  deposit_amount  NUMERIC,
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'terminated')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tenants_property ON tenants(property_id);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants(status);

-- Rental payments: tracks each month's rent
CREATE TABLE IF NOT EXISTS rental_payments (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  tenant_id       TEXT NOT NULL REFERENCES tenants(id),
  amount          NUMERIC NOT NULL,
  due_date        DATE NOT NULL,
  paid_date       DATE,
  payment_method  TEXT CHECK (payment_method IN ('transfer', 'mbway', 'cash', 'check')),
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'partial')),
  receipt_id      TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rental_payments_tenant ON rental_payments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_rental_payments_status ON rental_payments(status);
CREATE INDEX IF NOT EXISTS idx_rental_payments_due_date ON rental_payments(due_date);

-- Receipts: official rent receipts (Recibos de Renda)
CREATE TABLE IF NOT EXISTS receipts (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  tenant_id       TEXT NOT NULL REFERENCES tenants(id),
  property_id     TEXT NOT NULL REFERENCES properties(id),
  receipt_number  TEXT NOT NULL UNIQUE,        -- formatted receipt number (e.g. "20260401-001")
  amount          NUMERIC NOT NULL,
  period_month    INTEGER NOT NULL CHECK (period_month >= 1 AND period_month <= 12),
  period_year     INTEGER NOT NULL CHECK (period_year >= 2020 AND period_year <= 2030),
  issue_date      DATE NOT NULL,
  -- Future tax compliance fields (will be added later)
  payment_id      TEXT REFERENCES rental_payments(id),
  tax_regime      TEXT CHECK (tax_regime IN ('autonoma_25', 'autonoma_10', 'englobamento', 'simplificado')),
  withholding_tax NUMERIC DEFAULT 0,
  net_amount      NUMERIC,
  sent_to_tenant_at TIMESTAMPTZ,
  portal_submitted_at TIMESTAMPTZ,
  pdf_url         TEXT,
  status          TEXT NOT NULL DEFAULT 'issued' CHECK (status IN ('draft', 'issued', 'sent', 'submitted')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_receipts_tenant ON receipts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_receipts_property ON receipts(property_id);

-- Expenses: costs associated with a property
CREATE TABLE IF NOT EXISTS expenses (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  property_id     TEXT NOT NULL REFERENCES properties(id),
  category        TEXT NOT NULL CHECK (category IN ('maintenance', 'insurance', 'imu', 'condominium', 'mortgage_interest', 'legal', 'other')),
  description     TEXT,
  amount          NUMERIC NOT NULL,
  date            DATE NOT NULL,
  deductible      BOOLEAN NOT NULL DEFAULT true,
  receipt_url     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_expenses_property ON expenses(property_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);

-- Tax summary: annual tax calculation per owner
CREATE TABLE IF NOT EXISTS tax_summary (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_id        TEXT NOT NULL REFERENCES customers(id),
  year            INTEGER NOT NULL,
  total_income    NUMERIC NOT NULL DEFAULT 0,
  total_deductible_expenses NUMERIC NOT NULL DEFAULT 0,
  taxable_income  NUMERIC NOT NULL DEFAULT 0,
  best_regime     TEXT,
  estimated_tax   NUMERIC NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(owner_id, year)
);

CREATE INDEX IF NOT EXISTS idx_tax_summary_owner ON tax_summary(owner_id);

-- Pricing clicks: tracks fake-door CTA clicks for SaaS pricing validation
CREATE TABLE IF NOT EXISTS pricing_clicks (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  date            DATE NOT NULL DEFAULT CURRENT_DATE,
  tier            TEXT NOT NULL,
  source_path     TEXT NOT NULL DEFAULT '/pricing',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pricing_clicks_date ON pricing_clicks(date);
CREATE INDEX IF NOT EXISTS idx_pricing_clicks_tier ON pricing_clicks(tier);

-- Payment intents: captures email addresses when users show purchase intent
CREATE TABLE IF NOT EXISTS payment_intents (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email           TEXT NOT NULL,
  name            TEXT,
  plan            TEXT NOT NULL CHECK (plan IN ('gratis', 'pro', 'premium')),
  source_path     TEXT NOT NULL DEFAULT '/',
  metadata        JSONB,
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'converted', 'abandoned')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payment_intents_email ON payment_intents(email);
CREATE INDEX IF NOT EXISTS idx_payment_intents_plan ON payment_intents(plan);
CREATE INDEX IF NOT EXISTS idx_payment_intents_created_at ON payment_intents(created_at);
