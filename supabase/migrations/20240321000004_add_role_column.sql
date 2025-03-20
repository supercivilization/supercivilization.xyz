-- Add role column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

-- Create enum type for user roles
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin', 'superadmin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add constraint to ensure role is valid
ALTER TABLE profiles ADD CONSTRAINT valid_role CHECK (role IN ('user', 'moderator', 'admin', 'superadmin')); 