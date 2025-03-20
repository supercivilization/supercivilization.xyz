-- Create invite_codes table
CREATE TABLE IF NOT EXISTS invite_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    created_by UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    max_uses INTEGER NOT NULL DEFAULT 1,
    used_count INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT valid_max_uses CHECK (max_uses > 0),
    CONSTRAINT valid_used_count CHECK (used_count >= 0 AND used_count <= max_uses),
    CONSTRAINT valid_expiration CHECK (expires_at > created_at)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_invite_codes_code ON invite_codes(code);
CREATE INDEX IF NOT EXISTS idx_invite_codes_created_by ON invite_codes(created_by);
CREATE INDEX IF NOT EXISTS idx_invite_codes_expires_at ON invite_codes(expires_at);

-- Enable RLS
ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own invite codes"
    ON invite_codes FOR SELECT
    USING (auth.uid() = created_by);

CREATE POLICY "Users can create invite codes"
    ON invite_codes FOR INSERT
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own invite codes"
    ON invite_codes FOR UPDATE
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

-- Create function to update used_count
CREATE OR REPLACE FUNCTION increment_invite_code_usage(code TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE invite_codes
    SET used_count = used_count + 1
    WHERE code = $1
    AND is_active = true
    AND used_count < max_uses
    AND expires_at > NOW();
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 