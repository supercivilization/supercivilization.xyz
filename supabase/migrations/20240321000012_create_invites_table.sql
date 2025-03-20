-- Drop existing table if it exists
DROP TABLE IF EXISTS public.invites CASCADE;

-- Create invites table
CREATE TABLE public.invites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    inviter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    invitee_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX invites_code_idx ON public.invites(code);
CREATE INDEX invites_inviter_id_idx ON public.invites(inviter_id);
CREATE INDEX invites_invitee_id_idx ON public.invites(invitee_id);

-- Enable RLS
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own invites"
    ON public.invites FOR SELECT
    USING (auth.uid() = inviter_id);

CREATE POLICY "Users can create invites"
    ON public.invites FOR INSERT
    WITH CHECK (auth.uid() = inviter_id);

CREATE POLICY "Users can update their own invites"
    ON public.invites FOR UPDATE
    USING (auth.uid() = inviter_id)
    WITH CHECK (auth.uid() = inviter_id);

-- Grant permissions to service role
GRANT ALL ON public.invites TO service_role; 