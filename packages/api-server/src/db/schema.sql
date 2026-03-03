CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  open_id TEXT NOT NULL UNIQUE,
  union_id TEXT,
  nickname TEXT NOT NULL,
  avatar TEXT,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('parent', 'child', 'admin')),
  family_id TEXT,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  last_login_at BIGINT
);

CREATE TABLE IF NOT EXISTS medications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly', 'custom')),
  times TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  notes TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);
