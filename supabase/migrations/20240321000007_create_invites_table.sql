-- Create invites table
CREATE TABLE IF NOT EXISTS invites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  inviter_id UUID NOT NULL REFERENCES auth.users(id),
  invitee_id UUID REFERENCES auth.users(id),
  is_used BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS invites_code_idx ON invites(code);
CREATE INDEX IF NOT EXISTS invites_inviter_id_idx ON invites(inviter_id);
CREATE INDEX IF NOT EXISTS invites_invitee_id_idx ON invites(invitee_id);

-- Enable RLS
ALTER TABLE invites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own invites"
  ON invites FOR SELECT
  USING (auth.uid() = inviter_id);

CREATE POLICY "Users can create invites"
  ON invites FOR INSERT
  WITH CHECK (auth.uid() = inviter_id);

CREATE POLICY "Users can update their own invites"
  ON invites FOR UPDATE
  USING (auth.uid() = inviter_id);

-- Grant permissions to service role
GRANT ALL ON invites TO service_role; 