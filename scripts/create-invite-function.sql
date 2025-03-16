-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS public.generate_invite;
DROP FUNCTION IF EXISTS public.validate_invite_code;

-- Create function to generate invite codes
CREATE OR REPLACE FUNCTION public.generate_invite(
    params JSONB
)
RETURNS TABLE (
    id UUID,
    code TEXT,
    inviter_id UUID,
    invitee_id UUID,
    is_used BOOLEAN,
    created_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    used_at TIMESTAMPTZ
) SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    p_code TEXT = params->>'p_code';
    p_expires_at TIMESTAMPTZ = (params->>'p_expires_at')::TIMESTAMPTZ;
    p_inviter_id UUID = (params->>'p_inviter_id')::UUID;
BEGIN
    -- Validate inputs
    IF p_inviter_id IS NULL THEN
        RAISE EXCEPTION 'inviter_id cannot be null';
    END IF;

    IF p_code IS NULL OR length(p_code) < 6 THEN
        RAISE EXCEPTION 'code must be at least 6 characters long';
    END IF;

    IF p_expires_at IS NULL OR p_expires_at <= CURRENT_TIMESTAMP THEN
        RAISE EXCEPTION 'expires_at must be in the future';
    END IF;

    -- Check if code already exists
    IF EXISTS (SELECT 1 FROM public.invites WHERE code = p_code) THEN
        RAISE EXCEPTION 'invite code already exists';
    END IF;

    -- Insert new invite
    RETURN QUERY
    INSERT INTO public.invites (
        code,
        inviter_id,
        expires_at
    )
    VALUES (
        p_code,
        p_inviter_id,
        p_expires_at
    )
    RETURNING *;
END;
$$;

-- Grant execute permission to authenticated users and service role
GRANT EXECUTE ON FUNCTION public.generate_invite TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_invite TO service_role;

-- Create function to validate invite codes
CREATE OR REPLACE FUNCTION public.validate_invite_code(p_code TEXT)
RETURNS TABLE (
    is_valid BOOLEAN,
    error_message TEXT
) SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_invite public.invites%ROWTYPE;
BEGIN
    -- Get invite record
    SELECT * INTO v_invite
    FROM public.invites
    WHERE code = p_code;

    -- Check if invite exists
    IF v_invite.id IS NULL THEN
        RETURN QUERY SELECT false, 'Invalid invite code';
        RETURN;
    END IF;

    -- Check if invite is already used
    IF v_invite.is_used THEN
        RETURN QUERY SELECT false, 'Invite code has already been used';
        RETURN;
    END IF;

    -- Check if invite has expired
    IF v_invite.expires_at <= CURRENT_TIMESTAMP THEN
        RETURN QUERY SELECT false, 'Invite code has expired';
        RETURN;
    END IF;

    -- Invite is valid
    RETURN QUERY SELECT true, 'Invite code is valid';
END;
$$;

-- Grant execute permission to authenticated users and service role
GRANT EXECUTE ON FUNCTION public.validate_invite_code TO authenticated;
GRANT EXECUTE ON FUNCTION public.validate_invite_code TO service_role; 