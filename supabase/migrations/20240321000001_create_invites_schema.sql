-- Create invites table with all required columns
CREATE TABLE IF NOT EXISTS public.invites (
    code TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 year'),
    is_used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP WITH TIME ZONE,
    inviter_id UUID REFERENCES auth.users(id),
    invitee_id UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert invites" ON public.invites
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Anyone can select invites" ON public.invites
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Anyone can update invites" ON public.invites
    FOR UPDATE
    TO public
    USING (true)
    WITH CHECK (true);

-- Grant permissions
GRANT ALL ON public.invites TO service_role;
GRANT ALL ON public.invites TO authenticated;

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema'; 