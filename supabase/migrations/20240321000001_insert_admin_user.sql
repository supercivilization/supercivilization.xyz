-- Insert admin user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@supercivilization.com',
  crypt('admin', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  true,
  'service_role'
) ON CONFLICT (id) DO NOTHING;

-- Insert admin profile
INSERT INTO profiles (
  user_id,
  name,
  email,
  role,
  status
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Admin',
  'admin@supercivilization.com',
  'superadmin',
  'active'
) ON CONFLICT (user_id) DO NOTHING; 