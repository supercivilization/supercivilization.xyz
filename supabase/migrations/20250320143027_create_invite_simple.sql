-- Drop existing functions first to avoid conflicts
DROP FUNCTION IF EXISTS public.create_invite(jsonb);
DROP FUNCTION IF EXISTS public.create_invite(json);
DROP FUNCTION IF EXISTS public.create_invite(uuid, text, text);
DROP FUNCTION IF EXISTS public.create_invite(text);

-- Create a simple function that accepts a text parameter for the email
CREATE OR REPLACE FUNCTION public.create_invite(email_param TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_code text;
  v_expires_at timestamp with time zone;
BEGIN
  -- Find user by email
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = email_param;

  -- If user doesn't exist, raise an error
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found with email %', email_param;
  END IF;

  -- Generate invite code
  v_code := upper(substring(md5(random()::text) from 1 for 6));
  v_expires_at := now() + interval '7 days';

  -- Create invite
  INSERT INTO invites (code, inviter_id, expires_at)
  VALUES (v_code, v_user_id, v_expires_at);

  RETURN v_code;
END;
$$;

-- Grant execute permission to the service role
GRANT EXECUTE ON FUNCTION public.create_invite(TEXT) TO service_role;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO postgres;
GRANT SELECT ON auth.users TO postgres;

-- Notify PostgREST to reload its schema cache
NOTIFY pgrst, 'reload schema';
