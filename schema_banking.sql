-- Banking Integration Schema for Senhorio
-- Adds support for automated payment import via Open Banking APIs

-- Banking connections table
CREATE TABLE IF NOT EXISTS banking_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bank_name VARCHAR(100) NOT NULL,
  account_name VARCHAR(100) NOT NULL,
  account_iban VARCHAR(34) NOT NULL,
  bank_api_provider VARCHAR(50) DEFAULT 'open_banking',
  connection_status VARCHAR(20) DEFAULT 'pending' CHECK (connection_status IN ('pending', 'active', 'error', 'disconnected')),
  api_credentials JSONB,  -- Encrypted API credentials
  auto_import_enabled BOOLEAN DEFAULT true,
  sync_frequency VARCHAR(20) DEFAULT 'daily' CHECK (sync_frequency IN ('daily', 'weekly', 'manual')),
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, account_iban)
);

-- Bank transactions cache table
CREATE TABLE IF NOT EXISTS bank_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id UUID NOT NULL REFERENCES banking_connections(id) ON DELETE CASCADE,
  bank_transaction_id VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  booking_date DATE NOT NULL,
  value_date DATE,
  description TEXT,
  reference VARCHAR(200),
  creditor_name VARCHAR(100),
  creditor_account VARCHAR(34),
  debtor_name VARCHAR(100),
  debtor_account VARCHAR(34),
  transaction_type VARCHAR(20),
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(connection_id, bank_transaction_id)
);

-- Payment matching rules table (for custom matching logic)
CREATE TABLE IF NOT EXISTS payment_matching_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rule_name VARCHAR(100) NOT NULL,
  match_type VARCHAR(20) NOT NULL CHECK (match_type IN ('amount', 'reference', 'name', 'date_range')),
  match_value VARCHAR(200) NOT NULL,
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  priority INTEGER DEFAULT 100,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add bank transaction reference to rental_payments
ALTER TABLE rental_payments
ADD COLUMN IF NOT EXISTS bank_transaction_id VARCHAR(100) UNIQUE,
ADD COLUMN IF NOT EXISTS auto_matched BOOLEAN DEFAULT false;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_banking_connections_user ON banking_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_banking_connections_status ON banking_connections(connection_status);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_connection ON bank_transactions(connection_id);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_date ON bank_transactions(booking_date);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_processed ON bank_transactions(processed);
CREATE INDEX IF NOT EXISTS idx_payment_matching_rules_user ON payment_matching_rules(user_id);
CREATE INDEX IF NOT EXISTS idx_rental_payments_bank_transaction ON rental_payments(bank_transaction_id);

-- Views for easy querying
CREATE OR REPLACE VIEW banking_connection_stats AS
SELECT
  bc.id,
  bc.user_id,
  bc.bank_name,
  bc.account_name,
  bc.connection_status,
  bc.last_sync,
  COUNT(bt.id) as total_transactions,
  COUNT(CASE WHEN bt.processed = true THEN 1 END) as processed_transactions,
  COUNT(CASE WHEN bt.processed = false THEN 1 END) as pending_transactions,
  SUM(CASE WHEN bt.amount > 0 AND bt.processed = false THEN bt.amount ELSE 0 END) as pending_income
FROM banking_connections bc
LEFT JOIN bank_transactions bt ON bt.connection_id = bc.id
GROUP BY bc.id, bc.user_id, bc.bank_name, bc.account_name, bc.connection_status, bc.last_sync;

-- Trigger to update connection updated_at
CREATE OR REPLACE FUNCTION update_banking_connection_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER banking_connections_updated_at
  BEFORE UPDATE ON banking_connections
  FOR EACH ROW EXECUTE FUNCTION update_banking_connection_updated_at();

-- Sample data for testing (commented out for production)
/*
INSERT INTO banking_connections (user_id, bank_name, account_name, account_iban, connection_status)
VALUES
  (
    (SELECT id FROM users LIMIT 1),
    'Millennium BCP',
    'Conta à Ordem',
    'PT50003300000012345678901',
    'active'
  );
*/