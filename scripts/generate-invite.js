import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { randomBytes } from 'crypto';
import { checkInviteRateLimit } from '../lib/rate-limiting';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase URL or Service Role Key');
  process.exit(1);
}

console.log('Using Supabase URL:', supabaseUrl);
console.log('Service Role Key available:', !!supabaseServiceKey);

// Initialize Supabase client with explicit options
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});

async function generateInviteCode() {
  try {
    // Get the current user's ID
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Error getting user:', userError);
      throw userError;
    }

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Check rate limit
    const { success, remaining, reset, error: rateError } = await checkInviteRateLimit(user.id);
    
    if (rateError) {
      console.error('Rate limit check failed:', rateError);
      throw new Error('Failed to check rate limit');
    }

    if (!success) {
      console.error(`Rate limit exceeded. Try again after ${new Date(reset).toLocaleString()}`);
      console.log(`You have ${remaining} invites remaining for this period.`);
      throw new Error('Rate limit exceeded');
    }
    
    // Generate a random invite code
    const code = 'INV' + randomBytes(3).toString('hex').toUpperCase();
    console.log('Generated code:', code);
    
    // Insert the invite code
    console.log('Attempting to insert invite...');
    const { data, error } = await supabase
      .from('invites')
      .insert([{ 
        code,
        inviter_id: user.id
      }])
      .select()
      .single();

    if (error) {
      console.error('Insert failed:', error);
      throw error;
    }

    if (!data) {
      throw new Error('No data returned from insert operation');
    }

    console.log('Invite stored successfully:', data);
    console.log('Your invite code is:', code);
    console.log('Note: This code will expire in 1 year');
    console.log(`You have ${remaining - 1} invites remaining for this period.`);
    return code;
  } catch (error) {
    console.error('Failed to generate invite code:', error);
    throw error;
  }
}

// Main execution
(async () => {
  try {
    await generateInviteCode();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
})(); 