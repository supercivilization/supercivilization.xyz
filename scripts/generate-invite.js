import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '../.env.local') });

const ADMIN_USER = {
  email: 'admin@supercivilization.com',
  password: 'admin123456',
  name: 'Admin User'
};

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

async function generateInviteCode() {
  try {
    // Create admin user if it doesn't exist
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    if (userError) throw userError;

    const adminUser = users.users.find(user => user.email === ADMIN_USER.email);
    if (!adminUser) {
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: ADMIN_USER.email,
        password: ADMIN_USER.password,
        email_confirm: true
      });

      if (authError) throw authError;
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Generate invite code using the database function
    const { data: code, error } = await supabase.rpc('create_invite', {
      p_inviter_id: adminUser.id
    });

    if (error) {
      console.error('Invite generation error:', error);
      throw error;
    }

    console.log('Generated invite code:', code);
    return code;
  } catch (error) {
    console.error('Error in generateInviteCode:', error);
    throw error;
  }
}

generateInviteCode()
  .then(code => {
    console.log('Success! Your invite code is:', code);
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to generate invite code:', error);
    process.exit(1);
  }); 