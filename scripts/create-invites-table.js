import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase URL or Service Role Key');
  process.exit(1);
}

console.log('Using Supabase URL:', supabaseUrl);
console.log('Service Role Key available:', !!supabaseServiceKey);

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createInvitesTable() {
  try {
    // Enable UUID extension if not already enabled
    const { error: extensionError } = await supabase.rpc('install_available_extensions');
    if (extensionError) {
      console.warn('Could not enable extensions:', extensionError);
    }

    // Create invites table
    const { error: tableError } = await supabase.from('_exec').select('*').execute(`
      CREATE TABLE IF NOT EXISTS public.invites (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        code TEXT UNIQUE NOT NULL,
        inviter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        invitee_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
        is_used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        expires_at TIMESTAMPTZ NOT NULL,
        used_at TIMESTAMPTZ
      );
      
      -- Create indexes
      CREATE INDEX IF NOT EXISTS invites_code_idx ON public.invites(code);
      CREATE INDEX IF NOT EXISTS invites_inviter_id_idx ON public.invites(inviter_id);
      CREATE INDEX IF NOT EXISTS invites_invitee_id_idx ON public.invites(invitee_id);
      
      -- Enable RLS
      ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;
      
      -- Create policies
      DROP POLICY IF EXISTS "Users can view their own invites" ON public.invites;
      CREATE POLICY "Users can view their own invites"
          ON public.invites FOR SELECT
          USING (auth.uid() = inviter_id);
      
      DROP POLICY IF EXISTS "Users can create invites" ON public.invites;
      CREATE POLICY "Users can create invites"
          ON public.invites FOR INSERT
          WITH CHECK (auth.uid() = inviter_id);
      
      DROP POLICY IF EXISTS "Users can update their own invites" ON public.invites;
      CREATE POLICY "Users can update their own invites"
          ON public.invites FOR UPDATE
          USING (auth.uid() = inviter_id)
          WITH CHECK (auth.uid() = inviter_id);
      
      -- Grant permissions to service role
      GRANT ALL ON public.invites TO service_role;
    `);

    if (tableError) {
      console.error('Error creating invites table:', tableError);
      throw tableError;
    }

    console.log('Invites table created successfully');
  } catch (error) {
    console.error('Error in createInvitesTable:', error);
    throw error;
  }
}

createInvitesTable()
  .then(() => {
    console.log('Success! Invites table has been created.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to create invites table:', error);
    process.exit(1);
  }); 