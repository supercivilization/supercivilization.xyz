-- Create function to handle profile and invite creation with JSON input
CREATE OR REPLACE FUNCTION create_invite_json(
  payload json
)
RETURNS text
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id uuid;
  v_name text;
  v_email text;
  v_code text;
  v_expires_at timestamp with time zone;
BEGIN
  -- Extract values from JSON
  v_user_id := (payload->>'user_id')::uuid;
  v_name := payload->>'name';
  v_email := payload->>'email';

  -- Create or update profile
  INSERT INTO profiles (id, name, email, role, status, reputation)
  VALUES (v_user_id, v_name, v_email, 'admin', 'active', 0)
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
  VALUES (v_code, v_user_id, v_expires_at);

  RETURN v_code;
END;
$$;

-- Grant execute permission to the service role
GRANT EXECUTE ON FUNCTION create_invite_json TO service_role;

-- Notify PostgREST to reload its schema cache
NOTIFY pgrst, 'reload schema'; 