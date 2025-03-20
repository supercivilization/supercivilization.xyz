-- Insert a test invite code
INSERT INTO invite_codes (code, created_by, expires_at, max_uses, used_count, is_active)
VALUES (
  'TEST-CODE-2024',
  '00000000-0000-0000-0000-000000000000', -- System user ID
  NOW() + INTERVAL '1 year', -- Expires in 1 year
  100, -- Max uses
  0, -- Current usage count
  true -- Active
)
ON CONFLICT (code) DO NOTHING; 