-- Add trust policy for service role
ALTER TABLE invite_codes FORCE ROW LEVEL SECURITY;

CREATE POLICY "Trust service role"
    ON invite_codes
    USING (true)
    WITH CHECK (true);

GRANT ALL ON invite_codes TO service_role; 