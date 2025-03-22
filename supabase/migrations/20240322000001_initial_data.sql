-- Insert default roles
INSERT INTO roles (name, description) VALUES
    ('admin', 'Administrator with full system access'),
    ('moderator', 'Moderator with content management access'),
    ('member', 'Regular member with basic access')
ON CONFLICT (name) DO NOTHING;

-- Create a default admin user if it doesn't exist
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Check if admin user exists
    SELECT id INTO admin_user_id
    FROM auth.users
    WHERE email = 'admin@supercivilization.com';

    IF admin_user_id IS NULL THEN
        -- Create admin user
        INSERT INTO auth.users (
            email,
            encrypted_password,
            email_confirmed_at,
            role
        ) VALUES (
            'admin@supercivilization.com',
            crypt('admin123', gen_salt('bf')),
            now(),
            'authenticated'
        ) RETURNING id INTO admin_user_id;
    END IF;

    -- Create admin profile if it doesn't exist
    INSERT INTO profiles (
        user_id,
        name,
        email,
        role,
        status
    ) VALUES (
        admin_user_id,
        'System Administrator',
        'admin@supercivilization.com',
        'admin',
        'active'
    ) ON CONFLICT (user_id) DO NOTHING;

    -- Create admin settings if they don't exist
    INSERT INTO user_settings (
        user_id,
        notification_preferences,
        theme
    ) VALUES (
        admin_user_id,
        '{"email": true, "push": true}'::jsonb,
        'system'
    ) ON CONFLICT (user_id) DO NOTHING;
END $$; 