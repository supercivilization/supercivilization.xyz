-- Drop existing table if it exists
DROP TABLE IF EXISTS public.invites;

-- Create invites table
CREATE TABLE public.invites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    inviter_id UUID NOT NULL REFERENCES auth.users(id),
    invitee_id UUID REFERENCES auth.users(id),
    is_used BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- Grant access to authenticated users and service role
GRANT ALL ON public.invites TO authenticated;
GRANT ALL ON public.invites TO service_role;

-- Create policies
CREATE POLICY "Enable read access for all users" ON public.invites
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.invites
    FOR INSERT WITH CHECK (auth.uid() = inviter_id);

CREATE POLICY "Enable update for invite creator" ON public.invites
    FOR UPDATE USING (auth.uid() = inviter_id)
    WITH CHECK (auth.uid() = inviter_id);

-- Add service role bypass policy
CREATE POLICY "Service role bypass" ON public.invites
    FOR ALL
    USING (current_user = 'service_role')
    WITH CHECK (current_user = 'service_role'); 