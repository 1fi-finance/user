-- Migration: Add better-auth required tables and columns
-- Run this migration to set up better-auth with existing users.customers table

BEGIN;

-- Step 1: Add missing better-auth column to customers table
ALTER TABLE users.customers 
ADD COLUMN IF NOT EXISTS image VARCHAR(500);

-- Step 2: Standardize phone numbers to include country code
UPDATE users.customers
SET mobile = '91' || mobile
WHERE mobile IS NOT NULL 
  AND LENGTH(mobile) = 10;

-- Step 3: Create indexes for better-auth lookups
CREATE INDEX IF NOT EXISTS idx_customers_mobile ON users.customers(mobile);
CREATE INDEX IF NOT EXISTS idx_customers_email ON users.customers(email) WHERE email IS NOT NULL;

-- Step 4: Create sessions table
CREATE TABLE IF NOT EXISTS users.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID NOT NULL REFERENCES users.customers(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expiresAt TIMESTAMP NOT NULL,
  ipAddress VARCHAR(45),
  userAgent TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_token ON users.sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_userId ON users.sessions(userId);
CREATE INDEX IF NOT EXISTS idx_sessions_expiresAt ON users.sessions(expiresAt);

-- Step 5: Create accounts table (required by better-auth)
CREATE TABLE IF NOT EXISTS users.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID NOT NULL REFERENCES users.customers(id) ON DELETE CASCADE,
  accountId VARCHAR(255) NOT NULL,
  providerId VARCHAR(255) NOT NULL,
  accessToken TEXT,
  refreshToken TEXT,
  accessTokenExpiresAt TIMESTAMP,
  refreshTokenExpiresAt TIMESTAMP,
  scope TEXT,
  idToken TEXT,
  password TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_accounts_userId ON users.accounts(userId);
CREATE INDEX IF NOT EXISTS idx_accounts_providerId ON users.accounts(providerId);

-- Step 6: Create verification table (for OTP codes)
CREATE TABLE IF NOT EXISTS users.verification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  expiresAt TIMESTAMP NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_verification_identifier ON users.verification(identifier);
CREATE INDEX IF NOT EXISTS idx_verification_expiresAt ON users.verification(expiresAt);

COMMIT;

-- Verification queries
SELECT 'Migration completed successfully!' as status;

-- Show table counts
SELECT 
  'customers' as table_name, 
  COUNT(*) as row_count 
FROM users.customers
UNION ALL
SELECT 
  'sessions' as table_name, 
  COUNT(*) as row_count 
FROM users.sessions;