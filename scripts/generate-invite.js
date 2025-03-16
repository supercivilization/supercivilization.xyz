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
console.log('Service Role Key available:', !!supabaseKey)
console.log('Service Role Key prefix:', supabaseKey?.substring(0, 10) + '...')

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

    // First verify we can access the table
    console.log('Testing table access...')
    const { data: testData, error: testError } = await supabase
      .from('invites')
      .select('*')
      .limit(1)

    console.log('Test query result:', {
      data: testData,
      error: testError,
      hasData: !!testData,
      errorMessage: testError?.message
    })

    // Check database structure
    console.log('Checking database structure...')
    const { data: tables, error: tableError } = await supabase
      .from('pg_tables')
      .select('*')
      .eq('schemaname', 'public')

    if (tableError) {
      console.log('Error checking tables:', tableError)
    } else {
      console.log('Available tables:', tables)
    }

    // Check database connection
    console.log('Checking database connection...')
    const { data: schemaData, error: schemaError } = await supabase
      .rpc('get_schema_version')
      .single()

    if (schemaError) {
      console.log('Error checking schema:', schemaError)
      // Try a simple query to check if we can access the database at all
      const { data: testData, error: testError } = await supabase
        .from('users')
        .select('id')
        .limit(1)
      
      if (testError) {
        console.log('Error accessing users table:', testError)
      } else {
        console.log('Successfully accessed users table:', testData)
      }
    } else {
      console.log('Schema version:', schemaData)
    }

    // Try direct SQL query
    console.log('Attempting direct SQL query...')
    const { data: sqlData, error: sqlError } = await supabase
      .from('invites')
      .insert({
        code: code,
        inviter_id: adminUser.id,
        expires_at: expiryDate.toISOString(),
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (sqlError) {
      console.error('SQL Error:', sqlError)
    } else {
      console.log('SQL Query result:', sqlData)
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