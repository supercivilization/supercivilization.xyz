-- Create user_activity table
CREATE TABLE IF NOT EXISTS public.user_activity (
    user_id uuid PRIMARY KEY REFERENCES auth.users(id),
    active_days integer DEFAULT 0,
    last_active timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS user_activity_user_id_idx ON public.user_activity(user_id);
CREATE INDEX IF NOT EXISTS user_activity_last_active_idx ON public.user_activity(last_active);

-- Enable RLS
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own activity"
    ON public.user_activity
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own activity"
    ON public.user_activity
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.user_activity (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Create function to update user activity
CREATE OR REPLACE FUNCTION public.update_user_activity(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.user_activity
    SET 
        last_active = now(),
        active_days = active_days + 1,
        updated_at = now()
    WHERE user_activity.user_id = update_user_activity.user_id;
END;
$$; 