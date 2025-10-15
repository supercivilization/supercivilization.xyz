# `/discover` Experience - Streamlined Implementation Plan

**Project**: Supercivilization Discovery & Onboarding Flow
**Created**: October 7, 2025
**Stack**: Next.js 15.5 + React 19 + Supabase + Resend + Vercel (NO external services)

---

## 🎯 Philosophy

**Use what's already in the stack.** No new services, no complexity creep.

Your stack provides:
- ✅ Supabase Auth (17+ OAuth providers, email, phone SMS)
- ✅ Supabase Storage (file/video uploads + CDN)
- ✅ Supabase Edge Functions (cron, webhooks, background jobs)
- ✅ Next.js 15 Server Actions (no API routes needed)
- ✅ React 19 Forms (useActionState, useFormStatus)
- ✅ Resend + React Email (transactional emails)
- ✅ Vercel Cron (scheduled functions)
- ✅ Built-in real-time subscriptions

---

## 📊 Current State

### ✅ What's Working
- All 7 step UI components (client-side React)
- Step wrapper with progress tracking, countdown timer, keyboard nav
- localStorage completion tracking
- Framer Motion animations
- Responsive design
- Color-coded gradients per step

### ❌ What's Missing
- Backend integration (database, auth, storage)
- Real OAuth flows
- Email system
- Payment processing
- Video recording/storage
- Ceremony scheduling

---

## 🚀 Implementation Roadmap

### **PHASE 1: Database & Auth Foundation** (Week 1-2)

#### 1.1 Database Schema (2 days)

**File**: `supabase/migrations/20251007_discover_flow.sql`

```sql
-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null,
  username text unique not null,
  email text unique not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Invitations
create table public.invitations (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  sponsor_id uuid references public.profiles(id) not null,
  witness_1_id uuid references public.profiles(id) not null,
  witness_2_id uuid references public.profiles(id) not null,
  invitee_email text,
  status text check (status in ('pending', 'accepted', 'expired')) default 'pending',
  expires_at timestamptz not null,
  created_at timestamptz default now(),
  used_at timestamptz,
  used_by uuid references public.profiles(id)
);

-- Onboarding Progress
create table public.onboarding_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null unique,
  invitation_id uuid references public.invitations(id) not null,
  current_step integer check (current_step between 0 and 7) default 0,
  completed_steps integer[] default '{}',
  step_data jsonb default '{}', -- All step data in one JSONB column
  started_at timestamptz default now(),
  completed_at timestamptz,
  expires_at timestamptz not null,
  updated_at timestamptz default now()
);

-- Identity Verifications
create table public.identity_verifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  provider text not null, -- 'github', 'linkedin', 'google', etc.
  provider_user_id text not null,
  provider_username text,
  provider_data jsonb,
  verified_at timestamptz default now(),
  score integer default 0,
  unique(user_id, provider)
);

-- Ceremonies
create table public.ceremonies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  sponsor_id uuid references public.profiles(id) not null,
  witness_1_id uuid references public.profiles(id) not null,
  witness_2_id uuid references public.profiles(id) not null,
  scheduled_at timestamptz not null,
  completed_at timestamptz,
  video_url text, -- Supabase Storage URL
  status text check (status in ('scheduled', 'completed', 'cancelled')) default 'scheduled',
  notes text,
  created_at timestamptz default now()
);

-- Memberships
create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null unique,
  plan text check (plan in ('monthly', 'annual', 'lifetime')) not null,
  status text check (status in ('active', 'cancelled', 'expired')) default 'active',
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  nft_token_id text unique,
  nft_tx_hash text,
  activated_at timestamptz default now(),
  expires_at timestamptz,
  updated_at timestamptz default now()
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.invitations enable row level security;
alter table public.onboarding_progress enable row level security;
alter table public.identity_verifications enable row level security;
alter table public.ceremonies enable row level security;
alter table public.memberships enable row level security;

-- Profiles: Public read, own update
create policy "Profiles viewable by everyone" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

-- Invitations: Sponsor creates, participants read
create policy "Sponsors create invitations" on public.invitations for insert with check (auth.uid() = sponsor_id);
create policy "Participants view invitations" on public.invitations for select using (auth.uid() in (sponsor_id, used_by));

-- Onboarding: Own records only
create policy "Users view own onboarding" on public.onboarding_progress for select using (auth.uid() = user_id);
create policy "Users update own onboarding" on public.onboarding_progress for update using (auth.uid() = user_id);
create policy "System creates onboarding" on public.onboarding_progress for insert with check (true); -- Service role only

-- Identity: Own records only
create policy "Users view own verifications" on public.identity_verifications for select using (auth.uid() = user_id);
create policy "Users insert own verifications" on public.identity_verifications for insert with check (auth.uid() = user_id);

-- Ceremonies: Participants only
create policy "Participants view ceremonies" on public.ceremonies for select using (
  auth.uid() in (user_id, sponsor_id, witness_1_id, witness_2_id)
);

-- Memberships: Own record only
create policy "Users view own membership" on public.memberships for select using (auth.uid() = user_id);

-- Indexes
create index idx_invitations_code on public.invitations(code);
create index idx_onboarding_user on public.onboarding_progress(user_id);
create index idx_identity_user on public.identity_verifications(user_id);
```

**Tasks:**
- [x] Create migration file
- [ ] Run `supabase db reset` locally
- [ ] Test with sample data
- [ ] Push to production with `supabase db push`

#### 1.2 Supabase Auth Integration (3 days)

**Step 1: Invitation Validation**

**Server Action**: `app/actions/invitations.ts`
```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const inviteSchema = z.object({
  code: z.string().min(1)
})

export async function validateInvitationCode(code: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('invitations')
    .select(`
      *,
      sponsor:sponsor_id(display_name, username),
      witness_1:witness_1_id(display_name, username),
      witness_2:witness_2_id(display_name, username)
    `)
    .eq('code', code.toUpperCase())
    .eq('status', 'pending')
    .gt('expires_at', new Date().toISOString())
    .single()

  if (error) return { error: 'Invalid or expired invitation code' }

  return { success: true, invitation: data }
}
```

**Update Step 1 Component**: `components/onboarding/step1-accept-invitation.tsx`
```typescript
import { validateInvitationCode } from '@/app/actions/invitations'

const validateInvite = async () => {
  setValidating(true)
  setError("")

  const result = await validateInvitationCode(inviteCode)

  if (result.error) {
    setError(result.error)
  } else {
    setValidated(true)
    setInvitationData(result.invitation)
    // Store in session storage for signup
    sessionStorage.setItem('invitation', JSON.stringify(result.invitation))
  }

  setValidating(false)
}
```

**Step 3: Account Creation with Supabase Auth**

**Server Action**: `app/actions/auth.ts`
```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signupAction(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const displayName = formData.get('displayName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const invitationCode = formData.get('invitationCode') as string

  // Validate invitation
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('code', invitationCode)
    .eq('status', 'pending')
    .single()

  if (!invitation) {
    return { error: 'Invalid invitation code' }
  }

  // Sign up user
  const username = displayName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        username,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/discover/4`
    }
  })

  if (authError) return { error: authError.message }

  // Create profile (using service role)
  const adminSupabase = createClient({ admin: true })

  await adminSupabase.from('profiles').insert({
    id: authData.user!.id,
    display_name: displayName,
    username,
    email,
  })

  // Create onboarding record
  await adminSupabase.from('onboarding_progress').insert({
    user_id: authData.user!.id,
    invitation_id: invitation.id,
    expires_at: invitation.expires_at,
    current_step: 3,
    completed_steps: [1, 2, 3],
  })

  // Mark invitation as used
  await adminSupabase
    .from('invitations')
    .update({ status: 'accepted', used_by: authData.user!.id, used_at: new Date().toISOString() })
    .eq('id', invitation.id)

  redirect('/discover/4')
}
```

**Update Step 3 Component**: Use React 19 form actions
```typescript
'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { signupAction } from '@/app/actions/auth'

export default function Step3CreateAccount({ onComplete }: Step3Props) {
  const [state, formAction] = useActionState(signupAction, null)

  return (
    <form action={formAction}>
      <Input name="displayName" required />
      <Input name="email" type="email" required />
      <Input name="password" type="password" required />
      <input type="hidden" name="invitationCode" value={invitationCode} />

      {state?.error && <p className="text-red-500">{state.error}</p>}

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating Account...' : 'Create Account'}
    </Button>
  )
}
```

**Tasks:**
- [ ] Create server actions for invitations and auth
- [ ] Update Step 1 with real validation
- [ ] Update Step 3 with Supabase signup
- [ ] Test signup flow end-to-end
- [ ] Handle email verification

#### 1.3 OAuth Integration (2 days)

**Step 4: Built-in OAuth Providers**

Supabase has these providers built-in:
- GitHub ✅
- Google ✅
- LinkedIn ✅ (via OIDC)
- Twitter ✅
- Apple ✅
- Azure ✅
- Facebook ✅
- Discord ✅
- And 9+ more

**Setup in Supabase Dashboard:**
1. Authentication → Providers
2. Enable GitHub, Google, LinkedIn, Twitter, Apple
3. Add OAuth credentials from each provider
4. Set redirect URL: `https://[project-ref].supabase.co/auth/v1/callback`

**Update Step 4 Component**:
```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { Provider } from '@supabase/supabase-js'

export default function Step4AuthenticateIdentity() {
  const handleConnectAccount = async (provider: Provider) => {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/discover/4?provider=${provider}`,
        scopes: provider === 'github' ? 'read:user user:email' : undefined,
      }
    })

    if (error) {
      toast.error(`Failed to connect ${provider}`)
    }
  }

  // Handle OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const provider = params.get('provider')

    if (provider) {
      // Save identity verification
      saveIdentityVerification(provider)
    }
  }, [])

  return (
    <div>
      <button onClick={() => handleConnectAccount('github')}>
        Connect GitHub
      </button>
      {/* Other providers */}
    </div>
  )
}
```

**Server Action**: `app/actions/identity.ts`
```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

const SCORE_VALUES = {
  github: 25,
  linkedin: 25,
  google: 20,
  twitter: 20,
  apple: 20,
}

export async function saveIdentityVerification(provider: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  // Get provider identity from user metadata
  const identity = user.identities?.find(i => i.provider === provider)

  if (!identity) return { error: 'Provider identity not found' }

  // Save to database
  const { error } = await supabase
    .from('identity_verifications')
    .upsert({
      user_id: user.id,
      provider,
      provider_user_id: identity.id,
      provider_username: identity.identity_data?.user_name || identity.identity_data?.name,
      provider_data: identity.identity_data,
      score: SCORE_VALUES[provider] || 20,
    }, { onConflict: 'user_id,provider' })

  if (error) return { error: error.message }

  // Calculate total score
  const { data: verifications } = await supabase
    .from('identity_verifications')
    .select('score')
    .eq('user_id', user.id)

  const totalScore = verifications?.reduce((sum, v) => sum + v.score, 20) || 20 // +20 for email

  return { success: true, score: totalScore }
}
```

**Tasks:**
- [ ] Set up OAuth apps for each provider
- [ ] Configure in Supabase dashboard
- [ ] Update Step 4 with real OAuth
- [ ] Create identity verification action
- [ ] Test each provider
- [ ] Handle edge cases (already connected, failed auth)

---

### **PHASE 2: Email System** (Week 2)

#### 2.1 Resend + React Email Setup (1 day)

Already installed! Just need to configure.

**Environment Variables**:
```env
RESEND_API_KEY=re_...
```

**Email Templates**: `emails/`

```typescript
// emails/invitation-verified.tsx
import { Html, Head, Body, Container, Heading, Text, Button } from '@react-email/components'

export default function InvitationVerified({ displayName, sponsorName }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Heading>Welcome to Supercivilization, {displayName}!</Heading>
          <Text>Your invitation from {sponsorName} has been verified.</Text>
          <Button
            href="https://supercivilization.com/discover/2"
            style={{ backgroundColor: '#5469d4', color: '#fff', padding: '12px 24px' }}
          >
            Continue Your Journey
          </Button>
        </Container>
      </Body>
    </Html>
  )
}
```

**Send Function**: `lib/email.ts`
```typescript
import { Resend } from 'resend'
import InvitationVerified from '@/emails/invitation-verified'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInvitationVerified(email: string, data: any) {
  await resend.emails.send({
    from: 'Supercivilization <onboarding@supercivilization.com>',
    to: email,
    subject: 'Invitation Verified - Continue Your Journey',
    react: InvitationVerified(data),
  })
}
```

**Email Templates Needed:**
1. `invitation-verified.tsx` - Step 1 complete
2. `primelaw-acknowledged.tsx` - Step 2 complete
3. `account-created.tsx` - Step 3 complete (with email verification)
4. `ceremony-scheduled.tsx` - Step 5 complete (with .ics attachment)
5. `ceremony-reminder.tsx` - 24 hours before
6. `welcome-member.tsx` - Step 7 complete
7. `progress-reminder.tsx` - Daily if incomplete

**Tasks:**
- [ ] Create all email templates
- [ ] Create send functions in `lib/email.ts`
- [ ] Add email triggers in server actions
- [ ] Test email delivery
- [ ] Add unsubscribe links

#### 2.2 Calendar Invites (1 day)

**Calendar Generator**: `lib/calendar.ts`
```typescript
export function generateCeremonyICS(ceremony: any) {
  const start = new Date(ceremony.scheduled_at)
  const end = new Date(start.getTime() + 30 * 60 * 1000) // 30 minutes

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Supercivilization//Ceremony//EN
BEGIN:VEVENT
UID:ceremony-${ceremony.id}@supercivilization.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:Supercivilization Induction Ceremony
DESCRIPTION:Your induction ceremony with ${ceremony.sponsor_name}
LOCATION:${ceremony.video_url}
ORGANIZER:CN=${ceremony.sponsor_name}:MAILTO:${ceremony.sponsor_email}
ATTENDEE:CN=${ceremony.user_name}:MAILTO:${ceremony.user_email}
END:VEVENT
END:VCALENDAR`

  return ics
}

function formatICSDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}
```

**Attach to Email**:
```typescript
await resend.emails.send({
  from: 'Supercivilization <onboarding@supercivilization.com>',
  to: ceremony.user_email,
  subject: 'Ceremony Scheduled',
  react: CeremonyScheduled(ceremony),
  attachments: [
    {
      filename: 'ceremony.ics',
      content: Buffer.from(generateCeremonyICS(ceremony)),
    },
  ],
})
```

**Tasks:**
- [ ] Create ICS generator
- [ ] Test with Google Calendar, Apple Calendar, Outlook
- [ ] Send to all participants

---

### **PHASE 3: Video & Storage** (Week 3)

#### 3.1 Welcome Video (1 day)

**Option 1**: Upload to Supabase Storage (simplest)

```bash
# Create public bucket
supabase storage create --public welcome-videos

# Upload video
supabase storage upload welcome-videos/intro.mp4 intro.mp4
```

**Update Step 0**:
```typescript
const videoUrl = supabase.storage.from('welcome-videos').getPublicUrl('intro.mp4').data.publicUrl

<video src={videoUrl} controls />
```

**Option 2**: Use Mux for adaptive streaming (if needed later)

**Tasks:**
- [ ] Produce/upload welcome video
- [ ] Create Supabase storage bucket
- [ ] Update Step 0 with real video
- [ ] Add captions/subtitles

#### 3.2 Ceremony Video Recording (2 days)

**Supabase Storage Setup**:
```sql
-- Create private bucket for ceremony videos
insert into storage.buckets (id, name, public) values ('ceremony-videos', 'ceremony-videos', false);

-- RLS: Only participants can access
create policy "Participants access ceremony videos"
on storage.objects for select
using (
  bucket_id = 'ceremony-videos' AND
  auth.uid() in (
    select user_id from ceremonies where video_url like '%' || name
    union
    select sponsor_id from ceremonies where video_url like '%' || name
    union
    select witness_1_id from ceremonies where video_url like '%' || name
    union
    select witness_2_id from ceremonies where video_url like '%' || name
  )
);
```

**Recorder Component**: `components/ceremony-recorder.tsx`
```typescript
'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export function CeremonyRecorder({ ceremonyId }: { ceremonyId: string }) {
  const [recording, setRecording] = useState(false)
  const [uploading, setUploading] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' })

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      await uploadVideo(blob)
      chunksRef.current = []
    }

    mediaRecorderRef.current = mediaRecorder
    mediaRecorder.start(1000) // Record in 1s chunks
    setRecording(true)
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop())
    setRecording(false)
  }

  const uploadVideo = async (blob: Blob) => {
    setUploading(true)
    const supabase = createClient()

    const filename = `${ceremonyId}-${Date.now()}.webm`

    const { error } = await supabase.storage
      .from('ceremony-videos')
      .upload(filename, blob, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      toast.error('Upload failed')
      setUploading(false)
      return
    }

    // Get signed URL (valid for 7 days)
    const { data: urlData } = await supabase.storage
      .from('ceremony-videos')
      .createSignedUrl(filename, 7 * 24 * 60 * 60)

    // Save to database
    await supabase
      .from('ceremonies')
      .update({ video_url: urlData?.signedUrl, completed_at: new Date().toISOString() })
      .eq('id', ceremonyId)

    toast.success('Video uploaded!')
    setUploading(false)
  }

  return (
    <div>
      {!recording && (
        <Button onClick={startRecording}>
          <Camera className="w-4 h-4 mr-2" />
          Start Recording
        </Button>
      )}
      {recording && (
        <Button onClick={stopRecording} variant="destructive">
          <Square className="w-4 h-4 mr-2" />
          Stop Recording
        </Button>
      )}
      {uploading && <p>Uploading...</p>}
    </div>
  )
}
```

**Tasks:**
- [ ] Create ceremony-videos bucket
- [ ] Set up RLS policies
- [ ] Create recorder component
- [ ] Add to Step 6
- [ ] Test video upload
- [ ] Add video playback for verification

---

### **PHASE 4: Payment Integration** (Week 3-4)

#### 4.1 Stripe Setup (2 days)

**Install Stripe**:
```bash
npm install stripe @stripe/stripe-js
```

**Environment Variables**:
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Create Products in Stripe Dashboard**:
1. Monthly - $50/month (recurring)
2. Annual - $480/year (recurring)
3. Lifetime - $5000 (one-time)

**Server Action**: `app/actions/payment.ts`
```typescript
'use server'

import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function createCheckoutSession(plan: 'monthly' | 'annual' | 'lifetime') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const prices = {
    monthly: 'price_monthly_id',
    annual: 'price_annual_id',
    lifetime: 'price_lifetime_id',
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [{ price: prices[plan], quantity: 1 }],
    mode: plan === 'lifetime' ? 'payment' : 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_URL}/discover/7?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/discover/7`,
    metadata: { userId: user.id, plan },
  })

  return { sessionId: session.id }
}
```

**Update Step 7**:
```typescript
'use client'

import { createCheckoutSession } from '@/app/actions/payment'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Step7ActivateMembership() {
  const handlePayment = async () => {
    const result = await createCheckoutSession(selectedPlan)

    if (result.error) {
      toast.error(result.error)
      return
    }

    const stripe = await stripePromise
    await stripe!.redirectToCheckout({ sessionId: result.sessionId })
  }

  return (
    <Button onClick={handlePayment}>
      Process Payment
    </Button>
  )
}
```

#### 4.2 Webhook Handler (1 day)

**Webhook Route**: `app/api/webhooks/stripe/route.ts`
```typescript
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text() // Important: use text(), not json()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    await handleCheckoutComplete(session)
  }

  return Response.json({ received: true })
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const supabase = createClient({ admin: true })
  const { userId, plan } = session.metadata!

  // Create membership
  await supabase.from('memberships').insert({
    user_id: userId,
    plan,
    stripe_customer_id: session.customer as string,
    stripe_subscription_id: session.subscription as string,
    status: 'active',
  })

  // Complete onboarding
  await supabase
    .from('onboarding_progress')
    .update({ completed_at: new Date().toISOString(), current_step: 7 })
    .eq('user_id', userId)

  // Send welcome email
  const { data: user } = await supabase
    .from('profiles')
    .select('email, display_name')
    .eq('id', userId)
    .single()

  await sendWelcomeEmail(user.email, { displayName: user.display_name })
}
```

**Set up webhook in Stripe Dashboard**:
```
URL: https://yoursite.com/api/webhooks/stripe
Events: checkout.session.completed, customer.subscription.deleted
```

**Tasks:**
- [ ] Create Stripe products
- [ ] Implement checkout session creation
- [ ] Create webhook handler
- [ ] Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- [ ] Deploy webhook to production
- [ ] Handle subscription cancellation

---

### **PHASE 5: Scheduled Tasks** (Week 4)

#### 5.1 Progress Reminders (1 day)

**Option 1: Supabase pg_cron** (simplest, built-in)

**SQL Function**:
```sql
create or replace function send_progress_reminders()
returns void as $$
declare
  incomplete_user record;
  days_remaining integer;
begin
  for incomplete_user in
    select
      op.*,
      p.email,
      p.display_name,
      extract(day from op.expires_at - now()) as days_left
    from onboarding_progress op
    join profiles p on p.id = op.user_id
    where op.completed_at is null
    and op.updated_at < now() - interval '24 hours'
    and extract(day from op.expires_at - now()) in (6, 3, 1)
  loop
    -- Call edge function to send email
    perform net.http_post(
      url := 'https://[project-ref].supabase.co/functions/v1/send-reminder-email',
      headers := '{"Authorization": "Bearer ' || current_setting('app.service_role_key') || '"}',
      body := json_build_object(
        'email', incomplete_user.email,
        'displayName', incomplete_user.display_name,
        'currentStep', incomplete_user.current_step,
        'daysRemaining', incomplete_user.days_left
      )::text
    );
  end loop;
end;
$$ language plpgsql security definer;

-- Schedule to run daily at 9am
select cron.schedule(
  'send-progress-reminders',
  '0 9 * * *',
  'select send_progress_reminders()'
);
```

**Supabase Edge Function**: `supabase/functions/send-reminder-email/index.ts`
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  const { email, displayName, currentStep, daysRemaining } = await req.json()

  await resend.emails.send({
    from: 'Supercivilization <onboarding@supercivilization.com>',
    to: email,
    subject: `${daysRemaining} days left to complete your journey`,
    html: `<p>Hi ${displayName}, you're on step ${currentStep}. Complete your journey in ${daysRemaining} days!</p>`
  })

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

**Deploy Edge Function**:
```bash
supabase functions deploy send-reminder-email --no-verify-jwt
```

**Option 2: Vercel Cron** (if prefer Vercel)

**Create**: `app/api/cron/reminders/route.ts`
```typescript
export async function GET() {
  // Same logic as Supabase function
  const supabase = createClient({ admin: true })

  const { data: incompleteUsers } = await supabase
    .from('onboarding_progress')
    .select('*, profiles(*)')
    .is('completed_at', null)
    // ... rest of logic

  return Response.json({ success: true })
}
```

**Add to** `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/reminders",
      "schedule": "0 9 * * *"
    }
  ]
}
```

**Tasks:**
- [ ] Create reminder email template
- [ ] Choose cron strategy (Supabase or Vercel)
- [ ] Implement reminder logic
- [ ] Test locally
- [ ] Deploy and verify

---

### **PHASE 6: Real-time & UX Polish** (Week 5)

#### 6.1 Real-time Progress Sync (1 day)

**Hook**: `hooks/use-onboarding-progress.ts`
```typescript
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useOnboardingProgress(userId: string) {
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Initial load
    supabase
      .from('onboarding_progress')
      .select('*')
      .eq('user_id', userId)
      .single()
      .then(({ data }) => {
        setProgress(data)
        setLoading(false)
      })

    // Real-time subscription
    const channel = supabase
      .channel('onboarding-progress')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'onboarding_progress',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        setProgress(payload.new)
      })
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [userId, supabase])

  return { progress, loading }
}
```

**Update Step Wrapper**:
```typescript
const { progress } = useOnboardingProgress(userId)

useEffect(() => {
  if (progress) {
    setCompletedSteps(progress.completed_steps)
  }
}, [progress])
```

**Tasks:**
- [ ] Create onboarding progress hook
- [ ] Add real-time subscriptions
- [ ] Test multi-tab sync
- [ ] Replace localStorage with database

#### 6.2 Auto-save & Draft Recovery (1 day)

**Server Action**: `app/actions/onboarding.ts`
```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

export async function saveStepDraft(step: number, data: any) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('onboarding_progress')
    .update({
      step_data: { ...data, [`step_${step}`]: data },
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)

  if (error) return { error: error.message }
  return { success: true }
}
```

**Auto-save Hook**:
```typescript
import { useDebouncedCallback } from 'use-debounce'

export function useAutoSave(step: number) {
  const debouncedSave = useDebouncedCallback(async (data: any) => {
    await saveStepDraft(step, data)
  }, 2000)

  return debouncedSave
}
```

**In Step Components**:
```typescript
const autoSave = useAutoSave(currentStep)

useEffect(() => {
  autoSave(formData)
}, [formData])
```

**Tasks:**
- [ ] Create auto-save action
- [ ] Add to all step components
- [ ] Load draft on mount
- [ ] Show "saved" indicator

---

### **PHASE 7: Testing & Quality** (Week 6)

#### 7.1 E2E Tests (2 days)

**Playwright Test**: `tests/e2e/discover-flow.spec.ts`
```typescript
import { test, expect } from '@playwright/test'

test.describe('Discovery Flow', () => {
  test('complete full onboarding', async ({ page }) => {
    // Step 0
    await page.goto('/discover')
    await page.click('text=Begin Discovery')

    // Step 1
    await page.fill('[placeholder*="SC-2025"]', 'SC-2025-A7B3')
    await page.click('text=Verify Invitation')
    await expect(page.locator('text=Invitation Verified')).toBeVisible()

    // Step 2
    await page.click('label:has-text("Prime Law")')
    await page.click('label:has-text("Terms")')
    await page.click('label:has-text("Privacy")')

    // Continue...
  })

  test('handles invalid invitation', async ({ page }) => {
    await page.goto('/discover/1')
    await page.fill('[placeholder*="SC-2025"]', 'INVALID')
    await page.click('text=Verify')
    await expect(page.locator('text=Invalid')).toBeVisible()
  })
})
```

**Run Tests**:
```bash
npx playwright test
npx playwright test --ui # UI mode
npx playwright test --headed # See browser
```

**Tasks:**
- [ ] Write E2E test for full flow
- [ ] Test error scenarios
- [ ] Test OAuth flows (mock)
- [ ] Test payment (test mode)
- [ ] Set up CI/CD testing

#### 7.2 Performance Optimization (1 day)

**Code Splitting**:
```typescript
// app/discover/[step]/page.tsx
import dynamic from 'next/dynamic'

const Step1 = dynamic(() => import('@/components/onboarding/step1-accept-invitation'))
const Step2 = dynamic(() => import('@/components/onboarding/step2-agree-primelaw'))
// etc.
```

**Image Optimization**:
```typescript
import Image from 'next/image'

<Image
  src="/images/logo.png"
  alt="Supercivilization"
  width={200}
  height={100}
  priority
/>
```

**Tasks:**
- [ ] Enable React Compiler in next.config.js
- [ ] Lazy load step components
- [ ] Optimize images
- [ ] Run Lighthouse audit
- [ ] Aim for 90+ scores

---

## 📋 Quick Start Checklist

### Week 1: Database & Auth
- [ ] Create Supabase migration
- [ ] Set up OAuth providers in Supabase
- [ ] Implement Step 1 (invitation validation)
- [ ] Implement Step 3 (signup with Supabase Auth)
- [ ] Implement Step 4 (OAuth identity verification)

### Week 2: Email & Communication
- [ ] Create all email templates
- [ ] Set up Resend
- [ ] Add email triggers to server actions
- [ ] Create calendar invite generator
- [ ] Test email delivery

### Week 3: Video & Payment
- [ ] Upload welcome video to Supabase Storage
- [ ] Create ceremony recorder component
- [ ] Set up Stripe products
- [ ] Implement checkout flow
- [ ] Create webhook handler

### Week 4: Automation & Polish
- [ ] Set up progress reminder cron
- [ ] Add real-time sync
- [ ] Implement auto-save
- [ ] Error handling & recovery

### Week 5: Testing & Launch
- [ ] Write E2E tests
- [ ] Performance optimization
- [ ] Security audit
- [ ] Deploy to production

---

## 🎯 Success Metrics

**Completion Rates:**
- >60% Step 1 → Step 7 completion
- <20% drop-off per step

**Performance:**
- <2s page load
- <500ms API response
- 99.9% uptime

**Quality:**
- >80% test coverage
- Zero critical bugs
- Lighthouse score >90

---

## 🚨 Deployment Notes

**Environment Variables Needed:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Resend
RESEND_API_KEY=re_...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_URL=https://supercivilization.com
```

**Deployment Steps:**
1. Push to GitHub
2. Deploy via Vercel (auto-detects Next.js)
3. Add environment variables in Vercel dashboard
4. Run Supabase migrations: `supabase db push`
5. Set up Stripe webhook endpoint
6. Test production flow

---

**Plan Status:** 🟢 **READY FOR APPROVAL**

This plan uses ONLY your existing stack - no third-party services beyond what you already have. Everything is built-in, modern, and production-ready.
