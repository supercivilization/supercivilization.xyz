import { createClient } from '@supabase/supabase-js'

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

async function testRegistration() {
  console.log('\n=== Testing Registration ===')
  
  const testEmail = `test${Date.now()}@example.com`
  const testPassword = 'Test123!@#'
  
  try {
    console.log('Attempting registration with:', testEmail)
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true, // Auto-confirm the email
      user_metadata: {
        name: 'Test User',
      },
    })

    if (error) {
      console.error('Registration error:', error)
      return
    }

    console.log('Registration successful!')
    console.log('User ID:', data.user.id)
    console.log('Email:', data.user.email)
    console.log('Email confirmed:', data.user.email_confirmed_at ? 'Yes' : 'No')
    
    return { email: testEmail, password: testPassword }
  } catch (err) {
    console.error('Unexpected error during registration:', err)
  }
}

async function testLogin(email: string, password: string) {
  console.log('\n=== Testing Login ===')
  
  try {
    console.log('Attempting login with:', email)
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error)
      return
    }

    console.log('Login successful!')
    console.log('User ID:', data.user?.id)
    console.log('Email:', data.user?.email)
    console.log('Session:', data.session ? 'Active' : 'No session')
    
    return data
  } catch (err) {
    console.error('Unexpected error during login:', err)
  }
}

async function testResendVerification(email: string) {
  console.log('\n=== Testing Resend Verification ===')
  
  try {
    console.log('Attempting to resend verification email to:', email)
    const { error } = await supabaseAdmin.auth.resend({
      type: 'signup',
      email,
    })

    if (error) {
      console.error('Resend verification error:', error)
      return
    }

    console.log('Verification email sent successfully!')
  } catch (err) {
    console.error('Unexpected error during resend verification:', err)
  }
}

async function testAuthFlow() {
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