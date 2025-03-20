CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create invites table
CREATE TABLE IF NOT EXISTS public.invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  inviter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invitee_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX invites_inviter_id_idx ON public.invites(inviter_id);
CREATE INDEX invites_invitee_id_idx ON public.invites(invitee_id);
CREATE INDEX invites_code_idx ON public.invites(code);

-- Enable Row Level Security
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Invites are viewable by creator or invitee" ON public.invites
  FOR SELECT USING (
    auth.uid() = inviter_id OR 
    auth.uid() = invitee_id OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "Invites can be created by users" ON public.invites
  FOR INSERT WITH CHECK (
    auth.uid() = inviter_id AND
    (
      EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE user_id = auth.uid() 
        AND role IN ('admin', 'superadmin')
      ) OR
      NOT EXISTS (
        SELECT 1 FROM public.invites 
        WHERE inviter_id = auth.uid() 
        AND is_used = false 
        AND expires_at > NOW()
      )
    )
  );

CREATE POLICY "Invites can be updated by creator or admin" ON public.invites
  FOR UPDATE USING (
    auth.uid() = inviter_id OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'superadmin')
    )
  );

-- Create function to update used_at timestamp
CREATE OR REPLACE FUNCTION public.set_invite_used_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_used = true AND OLD.is_used = false THEN
    NEW.used_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update used_at timestamp
CREATE TRIGGER set_invite_used_at
  BEFORE UPDATE ON public.invites
  FOR EACH ROW
  EXECUTE FUNCTION public.set_invite_used_at(); 