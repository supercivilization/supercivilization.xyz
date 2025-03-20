-- Create function to handle profile and invite creation
CREATE OR REPLACE FUNCTION create_invite_with_profile(
  p_user_id uuid,
  p_name text,
  p_email text
)
RETURNS text
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_code text;
  v_expires_at timestamp with time zone;
BEGIN
  -- Create or update profile
  INSERT INTO profiles (id, name, email, role, status, reputation)
  VALUES (p_user_id, p_name, p_email, 'admin', 'active', 0)
  ON CONFLICT (id) DO UPDATE
  SET name = EXCLUDED.name,
      email = EXCLUDED.email,
      role = EXCLUDED.role,
      status = EXCLUDED.status;

  -- Generate invite code
  v_code := upper(substring(md5(random()::text) from 1 for 6));
  v_expires_at := now() + interval '7 days';

  -- Create invite
  INSERT INTO invites (code, inviter_id, expires_at)
  VALUES (v_code, p_user_id, v_expires_at);

  RETURN v_code;
END;
$$;

-- Grant execute permission to the service role
GRANT EXECUTE ON FUNCTION create_invite_with_profile TO service_role;

-- Notify PostgREST to reload its schema cache
NOTIFY pgrst, 'reload schema'; 