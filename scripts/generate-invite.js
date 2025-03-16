import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '..', '.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('Using Supabase URL:', supabaseUrl)
console.log('Service Role Key available:', !!supabaseKey)
console.log('Service Role Key prefix:', supabaseKey?.substring(0, 10) + '...')

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function generateInviteCode() {
  try {
    console.log('Getting users...')
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers()
    
    if (usersError) throw usersError
    if (!users || users.length === 0) throw new Error('No users found')
    
    const inviterId = users[0].id
    console.log('Using user as inviter:', inviterId)
    
    // Generate a random 8-character code
    const code = Math.random().toString(36).substring(2, 6).toUpperCase() + 
                Math.random().toString(36).substring(2, 6).toUpperCase()
    
    // Set expiry to 1 year from now
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)
    
    console.log('Attempting to create invite...')
    const { data, error } = await supabase.rpc('create_invite_code', {
      p_inviter_id: inviterId,
      p_code: code,
      p_expires_at: expiryDate.toISOString()
    })
    
    if (error) {
      console.error('Error creating invite:', error)
      throw error
    }
    
    console.log('Successfully created invite with code:', code)
    console.log('\nInvite URL:', `https://www.supercivilization.xyz/join?code=${code}`)
    
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

generateInviteCode() 