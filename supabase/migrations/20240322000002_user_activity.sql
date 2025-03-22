-- Create activity type enum
CREATE TYPE public.activity_type AS ENUM (
    'login',
    'logout',
    'profile_update',
    'settings_update',
    'invite_sent',
    'invite_used',
    'verification_requested',
    'verification_completed',
    'product_created',
    'product_updated',
    'product_voted',
    'session_started',
    'session_ended'
);

-- Create user_activity table
CREATE TABLE public.user_activity (
    id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
    user_id uuid NOT NULL,
    activity_type public.activity_type NOT NULL,
    activity_details jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT user_activity_pkey PRIMARY KEY (id),
    CONSTRAINT user_activity_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create index for faster lookups
CREATE INDEX idx_user_activity_user_id ON public.user_activity(user_id);
CREATE INDEX idx_user_activity_created_at ON public.user_activity(created_at);
CREATE INDEX idx_user_activity_type ON public.user_activity(activity_type);

-- Enable Row Level Security
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can view their own activity"
ON public.user_activity FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity"
ON public.user_activity FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all activity"
ON public.user_activity FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);

-- Create function to log user activity
CREATE OR REPLACE FUNCTION log_user_activity(
    p_activity_type public.activity_type,
    p_activity_details jsonb DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_activity_id uuid;
    v_user_id uuid;
BEGIN
    -- Get the authenticated user's ID
    v_user_id := auth.uid();
    
    -- Validate user is authenticated
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User must be authenticated to log activity';
    END IF;

    -- Validate activity type
    IF p_activity_type IS NULL THEN
        RAISE EXCEPTION 'Activity type is required';
    END IF;

    -- Insert the activity
    INSERT INTO public.user_activity (
        user_id,
        activity_type,
        activity_details
    ) VALUES (
        v_user_id,
        p_activity_type,
        p_activity_details
    ) RETURNING id INTO v_activity_id;

    RETURN v_activity_id;
END;
$$;

-- Create function to get user activity
CREATE OR REPLACE FUNCTION get_user_activity(
    p_user_id uuid DEFAULT NULL,
    p_activity_type public.activity_type DEFAULT NULL,
    p_limit integer DEFAULT 50,
    p_offset integer DEFAULT 0
)
RETURNS TABLE (
    id uuid,
    user_id uuid,
    activity_type public.activity_type,
    activity_details jsonb,
    created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- If no user_id provided, use the authenticated user
    IF p_user_id IS NULL THEN
        p_user_id := auth.uid();
    END IF;

    -- Validate user is authenticated or admin
    IF p_user_id IS NULL THEN
        RAISE EXCEPTION 'User must be authenticated to view activity';
    END IF;

    -- Check if user has permission to view this activity
    IF p_user_id != auth.uid() AND NOT EXISTS (
        SELECT 1 FROM profiles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'User does not have permission to view this activity';
    END IF;

    RETURN QUERY
    SELECT 
        ua.id,
        ua.user_id,
        ua.activity_type,
        ua.activity_details,
        ua.created_at
    FROM public.user_activity ua
    WHERE ua.user_id = p_user_id
    AND (p_activity_type IS NULL OR ua.activity_type = p_activity_type)
    ORDER BY ua.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$; 