-- Create invites table
CREATE TABLE IF NOT EXISTS public.invites (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    code text NOT NULL UNIQUE,
    inviter_id uuid NOT NULL REFERENCES auth.users(id),
    invitee_id uuid REFERENCES public.profiles(user_id),
    is_used boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    used_at timestamp with time zone
);

-- Create indexes
CREATE INDEX IF NOT EXISTS invites_code_idx ON public.invites(code);
CREATE INDEX IF NOT EXISTS invites_inviter_id_idx ON public.invites(inviter_id);
CREATE INDEX IF NOT EXISTS invites_invitee_id_idx ON public.invites(invitee_id);

-- Set up Row Level Security (RLS)
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own invites"
    ON public.invites
    FOR SELECT
    USING (auth.uid() = inviter_id);

CREATE POLICY "Users can create invites"
    ON public.invites
    FOR INSERT
    WITH CHECK (auth.uid() = inviter_id);

CREATE POLICY "Anyone can read invite by code"
    ON public.invites
    FOR SELECT
    USING (true);

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS public.validate_invite_code(text);
DROP FUNCTION IF EXISTS public.mark_invite_as_used(text, uuid);

-- Create function to validate invite code
CREATE OR REPLACE FUNCTION public.validate_invite_code(invite_code text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    invite_record record;
BEGIN
    -- Get the invite record
    SELECT * INTO invite_record
    FROM public.invites
    WHERE code = invite_code;

    -- If no invite found
    IF invite_record IS NULL THEN
        RETURN json_build_object(
            'valid', false,
            'error', 'Invalid invite code'
        );
    END IF;

    -- Check if invite is used
    IF invite_record.is_used THEN
        RETURN json_build_object(
            'valid', false,
            'error', 'This invite code has already been used'
        );
    END IF;

    -- Check if invite is expired
    IF invite_record.expires_at < now() THEN
        RETURN json_build_object(
            'valid', false,
            'error', 'This invite code has expired'
        );
    END IF;

    -- Valid invite
    RETURN json_build_object(
        'valid', true,
        'inviter_id', invite_record.inviter_id,
        'expires_at', invite_record.expires_at
    );
END;
$$;

-- Create function to mark invite as used
CREATE OR REPLACE FUNCTION public.mark_invite_as_used(invite_code text, invitee_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.invites
    SET is_used = true,
        invitee_id = invitee_id,
        used_at = now()
    WHERE code = invite_code
    AND is_used = false
    AND expires_at > now();

    RETURN FOUND;
END;
$$; 