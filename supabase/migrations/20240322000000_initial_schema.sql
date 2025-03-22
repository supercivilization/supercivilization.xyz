-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Create custom types
CREATE TYPE user_status AS ENUM ('pending', 'active', 'suspended', 'banned');
CREATE TYPE product_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE product_category AS ENUM ('feature', 'bug', 'enhancement', 'documentation');

-- Create roles table
CREATE TABLE roles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL UNIQUE,
    description text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create profiles table
CREATE TABLE profiles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    email citext NOT NULL UNIQUE,
    avatar_url text,
    role text NOT NULL REFERENCES roles(name) DEFAULT 'member',
    status user_status NOT NULL DEFAULT 'pending',
    reputation integer NOT NULL DEFAULT 0,
    invited_by uuid REFERENCES auth.users(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT reputation_non_negative CHECK (reputation >= 0)
);

-- Create user_profiles table for additional profile information
CREATE TABLE user_profiles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name text,
    bio text,
    website text,
    social_links jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create user_settings table
CREATE TABLE user_settings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    notification_preferences jsonb NOT NULL DEFAULT '{}',
    theme text NOT NULL DEFAULT 'system',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create user_sessions table
CREATE TABLE user_sessions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    device_info jsonb NOT NULL DEFAULT '{}',
    ip_address inet,
    user_agent text,
    last_active timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create invites table
CREATE TABLE invites (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    code text NOT NULL UNIQUE,
    inviter_id uuid NOT NULL REFERENCES auth.users(id),
    invitee_id uuid REFERENCES auth.users(id),
    is_used boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    expires_at timestamptz NOT NULL,
    used_at timestamptz,
    CONSTRAINT expires_after_creation CHECK (expires_at > created_at)
);

-- Create admin_logs table
CREATE TABLE admin_logs (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id uuid NOT NULL REFERENCES auth.users(id),
    action text NOT NULL,
    target_table text NOT NULL,
    target_id uuid NOT NULL,
    details jsonb,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Create product_items table
CREATE TABLE product_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    description text,
    category product_category NOT NULL,
    status product_status NOT NULL DEFAULT 'draft',
    created_by uuid NOT NULL REFERENCES auth.users(id),
    assigned_to uuid REFERENCES auth.users(id),
    priority integer NOT NULL DEFAULT 0,
    votes integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT votes_non_negative CHECK (votes >= 0),
    CONSTRAINT priority_valid CHECK (priority >= 0 AND priority <= 100)
);

-- Create verifications table
CREATE TABLE verifications (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    invitee_id uuid NOT NULL REFERENCES auth.users(id),
    verifier_id uuid NOT NULL REFERENCES auth.users(id),
    confirmed boolean NOT NULL DEFAULT false,
    reason text,
    created_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT different_users CHECK (invitee_id != verifier_id)
);

-- Create active_invites view
CREATE VIEW active_invites AS
SELECT 
    i.id,
    i.code,
    i.inviter_id,
    p.name as inviter_name,
    i.created_at,
    i.expires_at
FROM invites i
JOIN profiles p ON i.inviter_id = p.user_id
WHERE NOT i.is_used 
AND i.expires_at > now();

-- Create indexes
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_status ON profiles(status);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_last_active ON user_sessions(last_active);
CREATE INDEX idx_invites_code ON invites(code);
CREATE INDEX idx_invites_inviter_id ON invites(inviter_id);
CREATE INDEX idx_invites_invitee_id ON invites(invitee_id);
CREATE INDEX idx_invites_expires_at ON invites(expires_at);
CREATE INDEX idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX idx_admin_logs_target_id ON admin_logs(target_id);
CREATE INDEX idx_product_items_created_by ON product_items(created_by);
CREATE INDEX idx_product_items_assigned_to ON product_items(assigned_to);
CREATE INDEX idx_product_items_status ON product_items(status);
CREATE INDEX idx_product_items_category ON product_items(category);
CREATE INDEX idx_verifications_invitee_id ON verifications(invitee_id);
CREATE INDEX idx_verifications_verifier_id ON verifications(verifier_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- User profiles policies
CREATE POLICY "Users can view any user profile"
ON user_profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update own extended profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- User settings policies
CREATE POLICY "Users can view own settings"
ON user_settings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
ON user_settings FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- User sessions policies
CREATE POLICY "Users can view own sessions"
ON user_sessions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
ON user_sessions FOR DELETE
USING (auth.uid() = user_id);

-- Invites policies
CREATE POLICY "Users can view own sent invites"
ON invites FOR SELECT
USING (auth.uid() = inviter_id);

CREATE POLICY "Active users can create invites"
ON invites FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE user_id = auth.uid()
        AND status = 'active'
    )
);

-- Admin logs policies
CREATE POLICY "Only admins can view logs"
ON admin_logs FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);

-- Product items policies
CREATE POLICY "Anyone can view published items"
ON product_items FOR SELECT
USING (status = 'published' OR auth.uid() = created_by);

CREATE POLICY "Users can create product items"
ON product_items FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE user_id = auth.uid()
        AND status = 'active'
    )
);

CREATE POLICY "Users can update own items"
ON product_items FOR UPDATE
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- Verifications policies
CREATE POLICY "Users can view verifications they're involved in"
ON verifications FOR SELECT
USING (auth.uid() IN (invitee_id, verifier_id));

CREATE POLICY "Active users can create verifications"
ON verifications FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE user_id = auth.uid()
        AND status = 'active'
    )
);

-- Functions
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
$$;

-- Triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON user_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON user_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON product_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at(); 