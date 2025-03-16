import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '..', '.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

console.log('Using Supabase URL:', supabaseUrl)

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
})

async function generateInviteCode() {
  try {
    console.log('Getting users...')
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers()
    
    if (usersError) {
      console.error('Error getting users:', usersError)
      throw usersError
    }

    const adminUser = users[0]
    console.log('Using user as inviter:', adminUser.id)

    // Generate a random 8-character code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)

    const invite = {
      code,
      inviter_id: adminUser.id,
      invitee_id: null,
      is_used: false,
      expires_at: expiryDate.toISOString()
    }

    console.log('Attempting to create invite:', invite)

    // Use raw SQL to insert the invite
    const { data, error } = await supabase.rpc('create_invite', {
      p_code: code,
      p_inviter_id: adminUser.id,
      p_expires_at: expiryDate.toISOString()
    })

    if (error) {
      console.error('Error creating invite:', error)
      throw error
    }

    console.log('Successfully generated invite code:')
    console.log('Code:', code)
    console.log('Expires at:', expiryDate.toLocaleString())
    console.log('\nUse this URL to sign up:')
    console.log(`http://localhost:3000/join?code=${code}`)

  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

generateInviteCode() 