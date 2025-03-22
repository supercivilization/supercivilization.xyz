-- Create roles table
CREATE TABLE IF NOT EXISTS public.roles (
    id text PRIMARY KEY,
    name text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default roles
INSERT INTO public.roles (id, name, description) VALUES
    ('user', 'User', 'Regular user with basic permissions'),
    ('admin', 'Admin', 'Administrator with elevated permissions'),
    ('superadmin', 'Super Admin', 'Super administrator with full system access')
ON CONFLICT (id) DO NOTHING;

-- Add foreign key constraint to profiles table
ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_role_fkey
    FOREIGN KEY (role)
    REFERENCES public.roles(id);

-- Enable RLS
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read roles"
    ON public.roles
    FOR SELECT
    USING (true);

-- Grant permissions to service role
GRANT ALL ON public.roles TO service_role; 