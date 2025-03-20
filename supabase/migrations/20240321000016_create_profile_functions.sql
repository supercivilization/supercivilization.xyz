-- Create function to check if a profile exists
CREATE OR REPLACE FUNCTION check_profile_exists(user_id uuid)
RETURNS boolean
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE id = user_id
  );
END;
$$;

-- Create function to create a profile
CREATE OR REPLACE FUNCTION create_profile(
  p_id uuid,
  p_name text,
  p_email text,
  p_role text,
  p_status text,
  p_reputation integer
)
RETURNS json
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  result json;
BEGIN
  INSERT INTO profiles (id, name, email, role, status, reputation)
  VALUES (p_id, p_name, p_email, p_role, p_status, p_reputation)
  RETURNING row_to_json(profiles.*) INTO result;
  
  RETURN result;
END;
$$;

-- Create function to create an invite
CREATE OR REPLACE FUNCTION create_invite(
  p_code text,
  p_inviter_id uuid,
  p_expires_at timestamp with time zone
)
RETURNS json
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  result json;
BEGIN
  INSERT INTO invites (code, inviter_id, expires_at)
  VALUES (p_code, p_inviter_id, p_expires_at)
  RETURNING row_to_json(invites.*) INTO result;
  
  RETURN result;
END;
$$;

-- Grant execute permissions to the service role
GRANT EXECUTE ON FUNCTION check_profile_exists TO service_role;
GRANT EXECUTE ON FUNCTION create_profile TO service_role;
GRANT EXECUTE ON FUNCTION create_invite TO service_role; 