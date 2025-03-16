CREATE OR REPLACE FUNCTION create_invite(
  p_code TEXT,
  p_inviter_id UUID,
  p_expires_at TIMESTAMP WITH TIME ZONE
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_invite_id UUID;
BEGIN
  INSERT INTO invites (code, inviter_id, is_used, expires_at)
  VALUES (p_code, p_inviter_id, FALSE, p_expires_at)
  RETURNING id INTO v_invite_id;
  
  RETURN v_invite_id;
END;
$$; 