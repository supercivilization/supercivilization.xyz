-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing table if it exists
DROP TABLE IF EXISTS public.invites CASCADE;

-- Create invites table
CREATE TABLE IF NOT EXISTS public.invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  inviter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  invitee_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '1 year'),
  used_at TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS invites_code_idx ON public.invites(code);
CREATE INDEX IF NOT EXISTS invites_inviter_id_idx ON public.invites(inviter_id);
CREATE INDEX IF NOT EXISTS invites_invitee_id_idx ON public.invites(invitee_id);

-- Enable RLS
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own invites" ON public.invites;
CREATE POLICY "Users can view their own invites"
    ON public.invites FOR SELECT
    USING (auth.uid() = inviter_id);

DROP POLICY IF EXISTS "Users can create invites" ON public.invites;
CREATE POLICY "Users can create invites"
    ON public.invites FOR INSERT
    WITH CHECK (auth.uid() = inviter_id);

DROP POLICY IF EXISTS "Users can update their own invites" ON public.invites;
CREATE POLICY "Users can update their own invites"
    ON public.invites FOR UPDATE
    USING (auth.uid() = inviter_id)
    WITH CHECK (auth.uid() = inviter_id);

-- Grant permissions to service role
GRANT ALL ON public.invites TO service_role;

-- Create function for invite generation
DROP FUNCTION IF EXISTS public.create_invite(uuid);
CREATE OR REPLACE FUNCTION public.create_invite(
  p_inviter_id UUID
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code TEXT;
BEGIN
  -- Generate a random code
  v_code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
  
  -- Create invite with 1 year expiration
  INSERT INTO invites (code, inviter_id, expires_at)
  VALUES (v_code, p_inviter_id, NOW() + INTERVAL '1 year');

  RETURN v_code;
END;
$$;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION public.create_invite(UUID) TO service_role; 