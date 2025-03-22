import { createClient } from '@supabase/supabase-js'
import { User, Session } from '@supabase/supabase-js'

// Get environment variables directly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Present' : 'Missing')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Present' : 'Missing')
  process.exit(1)
}

// Create admin client with service role key
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

type UserCredentials = {
  email: string
  password: string
  userId: string
} | null

async function testRegistration(): Promise<UserCredentials> {
  console.log('\n=== Testing Registration ===')
  
  const testEmail = `test${Date.now()}@example.com`
  console.log(`Testing registration with email: ${testEmail}`)
  
  try {
    // Use admin API to create a user with email confirmed
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: testEmail,
      password: 'password123!',
      email_confirm: true
    })

    if (error) {
      console.error('Registration error:', error)
      return null
    }

    console.log('Registration successful!')
    console.log('User ID:', data.user.id)
    console.log('Email:', data.user.email)
    console.log('Email confirmed:', data.user.email_confirmed_at ? 'Yes' : 'No')
    console.log('User metadata:', data.user.user_metadata)
    
    // Double check the user's status
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(data.user.id)
    if (userError) {
      console.error('Error checking user status:', userError)
    } else {
      console.log('User status check:')
      console.log('- Email confirmed:', userData.user.email_confirmed_at ? 'Yes' : 'No')
      console.log('- Confirmation sent:', userData.user.confirmation_sent_at ? 'Yes' : 'No')
      console.log('- Last sign in:', userData.user.last_sign_in_at || 'Never')
    }
    
    return {
      email: testEmail,
      password: 'password123!',
      userId: data.user.id
    }
  } catch (err) {
    console.error('Unexpected error during registration:', err)
    return null
  }
}

type LoginResult = {
  user: User | null
  session: Session | null
} | null

async function testLogin(email: string, password: string): Promise<LoginResult> {
  console.log('\n=== Testing Login ===')
  
  try {
    console.log('Attempting login with:', email)
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error)
      return null
    }

    console.log('Login successful!')
    console.log('User ID:', data.user?.id)
    console.log('Email:', data.user?.email)
    console.log('Session:', data.session ? 'Active' : 'No session')
    
    return {
      user: data.user,
      session: data.session
    }
  } catch (err) {
    console.error('Unexpected error during login:', err)
    return null
  }
}

async function testResendVerification(email: string): Promise<boolean> {
  console.log('\n=== Testing Resend Verification ===')
  
  try {
    console.log('Attempting to resend verification email to:', email)
    const { error } = await supabaseAdmin.auth.resend({
      type: 'signup',
      email,
    })

    if (error) {
      console.error('Resend verification error:', error)
      return false
    }

    console.log('Verification email sent successfully!')
    return true
  } catch (err) {
    console.error('Unexpected error during resend verification:', err)
    return false
  }
}

async function testAuthFlow(): Promise<void> {
  try {
    // Test registration
    const credentials = await testRegistration()
    if (!credentials) {
      console.error('Registration failed, stopping test')
      return
    }

    // Test login with the registered credentials
    await testLogin(credentials.email, credentials.password)

    // Test resend verification
    await testResendVerification(credentials.email)
  } catch (err) {
    console.error('Test flow failed:', err)
  }
}

// Run the tests
testAuthFlow() 