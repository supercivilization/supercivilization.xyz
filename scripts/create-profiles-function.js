import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase URL or Service Role Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createProfilesFunction() {
  try {
    console.log('Creating profiles table function...');
    
    const sql = `
      -- Create function to create profiles table
      CREATE OR REPLACE FUNCTION create_profiles_table()
      RETURNS void
      LANGUAGE plpgsql
      SECURITY DEFINER
      SET search_path = public
      AS $$
      DECLARE
        v_schema text;
        v_table_exists boolean;
      BEGIN
        -- Get the schema name
        SELECT current_schema INTO v_schema;

        -- Create profiles table if it doesn't exist
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES auth.users(id) UNIQUE,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          avatar_url TEXT,
          role TEXT NOT NULL DEFAULT 'user',
          reputation INTEGER DEFAULT 0,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
        );

        -- Create indexes if they don't exist
        CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON profiles(user_id);
        CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
        CREATE INDEX IF NOT EXISTS profiles_status_idx ON profiles(status);

        -- Enable RLS
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

        -- Drop existing policies
        DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
        DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

        -- Create policies
        CREATE POLICY "Users can view their own profile"
          ON profiles FOR SELECT
          USING (auth.uid() = user_id);

        CREATE POLICY "Users can update their own profile"
          ON profiles FOR UPDATE
          USING (auth.uid() = user_id);

        -- Grant permissions to service role
        GRANT ALL ON profiles TO service_role;
      END;
      $$;
    `;

    const { error: createFunctionError } = await supabase.rpc('exec_sql', { sql });
    if (createFunctionError) {
      console.error('Error creating profiles table function:', createFunctionError);
      return;
    }

    console.log('Profiles table function created successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}

createProfilesFunction(); 