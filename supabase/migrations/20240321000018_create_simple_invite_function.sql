-- Create function to generate a simple invite code
CREATE OR REPLACE FUNCTION create_simple_invite(
  p_inviter_id uuid
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
  -- Generate invite code
  v_code := upper(substring(md5(random()::text) from 1 for 6));
  v_expires_at := now() + interval '7 days';

  -- Create invite
  INSERT INTO invites (code, inviter_id, expires_at)
  VALUES (v_code, p_inviter_id, v_expires_at);

  RETURN v_code;
END;
$$;

-- Grant execute permission to the service role
GRANT EXECUTE ON FUNCTION create_simple_invite TO service_role;

-- Notify PostgREST to reload its schema cache
NOTIFY pgrst, 'reload schema'; 