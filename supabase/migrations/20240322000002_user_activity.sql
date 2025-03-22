-- Create user_activity table
CREATE TABLE public.user_activity (
    id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
    user_id uuid NOT NULL,
    activity_type text NOT NULL,
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
    p_user_id uuid,
    p_activity_type text,
    p_activity_details jsonb DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_activity_id uuid;
BEGIN
    INSERT INTO public.user_activity (
        user_id,
        activity_type,
        activity_details
    ) VALUES (
        p_user_id,
        p_activity_type,
        p_activity_details
    ) RETURNING id INTO v_activity_id;

    RETURN v_activity_id;
END;
$$; 