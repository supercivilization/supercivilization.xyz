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
        -- Create admin user using Supabase's auth.users table
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            is_super_admin,
            created_at,
            updated_at,
            phone,
            phone_confirmed_at,
            phone_change,
            phone_change_token,
            confirmed_at,
            email_change_token_current,
            email_change_confirm_status,
            banned_until,
            confirmation_sent_at,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'admin@supercivilization.com',
            crypt('admin123', gen_salt('bf')),
            now(),
            now(),
            now(),
            '',
            '',
            '',
            now(),
            now(),
            '{"provider":"email","providers":["email"]}',
            '{}',
            false,
            now(),
            now(),
            '',
            now(),
            '',
            '',
            now(),
            '',
            0,
            null,
            now(),
            '',
            ''
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