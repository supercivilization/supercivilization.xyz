-- Create tables
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin', 'superadmin')),
  reputation INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'rejected', 'suspended', 'banned')),
  invited_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  inviter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invitee_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitee_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  verifier_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  confirmed BOOLEAN NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  target_table TEXT NOT NULL,
  target_id TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON profiles(user_id);
CREATE INDEX IF NOT EXISTS profiles_status_idx ON profiles(status);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);
CREATE INDEX IF NOT EXISTS invites_inviter_id_idx ON invites(inviter_id);
CREATE INDEX IF NOT EXISTS invites_code_idx ON invites(code);
CREATE INDEX IF NOT EXISTS verifications_invitee_id_idx ON verifications(invitee_id);
CREATE INDEX IF NOT EXISTS verifications_verifier_id_idx ON verifications(verifier_id);

-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Profiles table policies
CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view active profiles"
ON profiles FOR SELECT
USING (status = 'active');

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'superadmin')
  )
);

CREATE POLICY "Admins can update all profiles"
ON profiles FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'superadmin')
  )
);

-- Invites table policies
CREATE POLICY "Users can view their own invites"
ON invites FOR SELECT
USING (auth.uid() = inviter_id);

CREATE POLICY "Users can create invites if they are active"
ON invites FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND status = 'active'
  )
);

CREATE POLICY "Users can update their own invites"
ON invites FOR UPDATE
USING (auth.uid() = inviter_id);

CREATE POLICY "Admins can view all invites"
ON invites FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'superadmin')
  )
);

-- Verifications table policies
CREATE POLICY "Users can view verifications they performed"
ON verifications FOR SELECT
USING (auth.uid() = verifier_id);

CREATE POLICY "Users can create verifications if they are active"
ON verifications FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND status = 'active'
  )
);

CREATE POLICY "Admins can view all verifications"
ON verifications FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'superadmin')
  )
);

-- Admin logs table policies
CREATE POLICY "Only admins can view admin logs"
ON admin_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'superadmin')
  )
);

CREATE POLICY "Only admins can create admin logs"
ON admin_logs FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'superadmin')
  )
);

-- Create functions for common operations
CREATE OR REPLACE FUNCTION get_user_stats(user_id UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'total_invites', (SELECT COUNT(*) FROM invites WHERE inviter_id = user_id),
    'active_invites', (SELECT COUNT(*) FROM invites WHERE inviter_id = user_id AND is_used = FALSE AND expires_at > NOW()),
    'used_invites', (SELECT COUNT(*) FROM invites WHERE inviter_id = user_id AND is_used = TRUE),
    'verifications', (SELECT COUNT(*) FROM verifications WHERE verifier_id = user_id)
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'superadmin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get admin dashboard stats
CREATE OR REPLACE FUNCTION get_admin_stats()
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Permission denied: User is not an admin';
  END IF;
  
  SELECT jsonb_build_object(
    'total_users', (SELECT COUNT(*) FROM profiles),
    'pending_users', (SELECT COUNT(*) FROM profiles WHERE status = 'pending'),
    'active_users', (SELECT COUNT(*) FROM profiles WHERE status = 'active'),
    'total_invites', (SELECT COUNT(*) FROM invites),
    'used_invites', (SELECT COUNT(*) FROM invites WHERE is_used = TRUE),
    'conversion_rate', (
      SELECT 
        CASE 
          WHEN COUNT(*) = 0 THEN 0
          ELSE ROUND((COUNT(*) FILTER (WHERE is_used = TRUE))::numeric / COUNT(*) * 100)
        END
      FROM invites
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update the updated_at field
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

