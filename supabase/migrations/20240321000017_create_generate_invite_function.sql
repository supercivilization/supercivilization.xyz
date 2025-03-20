-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO postgres;
GRANT SELECT ON auth.users TO postgres;

-- Create function to generate an invite code
CREATE OR REPLACE FUNCTION generate_invite_code(
  p_admin_email text,
  p_admin_name text
)
RETURNS text
SECURITY DEFINER
SET search_path = public, auth
LANGUAGE plpgsql
AS $$
DECLARE
  v_admin_id uuid;
  v_code text;
  v_expires_at timestamp with time zone;
BEGIN
  -- Find admin user by email
  SELECT id INTO v_admin_id
  FROM auth.users
  WHERE email = p_admin_email;

  -- If admin user doesn't exist, return error
  IF v_admin_id IS NULL THEN
    RAISE EXCEPTION 'Admin user not found';
  END IF;

  -- Check if profile exists
  IF NOT EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE id = v_admin_id
  ) THEN
    -- Create profile
    INSERT INTO profiles (id, name, email, role, status, reputation)
    VALUES (v_admin_id, p_admin_name, p_admin_email, 'admin', 'active', 0);
  END IF;

  -- Generate invite code
  v_code := upper(substring(md5(random()::text) from 1 for 6));
  v_expires_at := now() + interval '7 days';

  -- Create invite
  INSERT INTO invites (code, inviter_id, expires_at)
  VALUES (v_code, v_admin_id, v_expires_at);

  RETURN v_code;
END;
$$;

-- Grant execute permission to the service role
GRANT EXECUTE ON FUNCTION generate_invite_code TO service_role;

-- Notify PostgREST to reload its schema cache
NOTIFY pgrst, 'reload schema'; 