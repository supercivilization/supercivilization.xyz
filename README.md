# Supercivilization

A parallel society built on genius. Join the next evolution of civilization.

## Overview

Supercivilization is a modern web platform featuring a public landing page and a comprehensive membership onboarding ceremony. Built with Next.js 15, React 19, TypeScript, and a full suite of modern UI libraries.

## Tech Stack

### Core Framework
- **Next.js 15.5.4** with App Router and Turbopack
- **React 19.2.0** with Server Components
- **TypeScript 5.9.2** (strict mode)

### Styling & UI
- **Tailwind CSS 4.1.12** with Oxide engine
- **Radix UI** - Complete primitives library via shadcn/ui
- **Framer Motion 12.23.12** - Animation library
- **tailwindcss-animate 1.0.7** - Animation utilities
- **class-variance-authority 0.7.1** - Component variant management
- **Lucide React** - Icon system

### Backend & Database
- **Supabase** - Backend and authentication
  - `@supabase/supabase-js 2.56.1` - JavaScript client
  - `@supabase/ssr 0.7.0` - Server-side rendering support

### Caching & Rate Limiting
- **Upstash Redis 1.35.3** - Serverless Redis
- **Upstash Ratelimit 2.0.6** - Rate limiting implementation

### State Management & Data Fetching
- **TanStack Query 5.90.2** - Server state management and data fetching
- **Zustand 5.0.8** - Client-side UI state management
- **React Hook Form 7.64.0** - Form state management
- **Zod 4.1.11** - Schema validation
- **@hookform/resolvers 5.2.2** - Form validation integration

### Error Tracking
- **Sentry 10.17.0** - Production error monitoring and performance tracking

### Advanced UI Components
- **Command Palette**: cmdk 1.1.1
- **Toast Notifications**: sonner 2.0.7
- **Drawer**: vaul 1.1.2
- **Carousel**: embla-carousel-react 8.6.0
- **Charts**: recharts 3.1.2
- **Drag & Drop**: @dnd-kit (core, sortable, utilities)
- **Date Picker**: react-day-picker 9.11.0
- **OTP Input**: input-otp 1.4.2
- **Resizable Panels**: react-resizable-panels 3.0.5
- **Intersection Observer**: react-intersection-observer 9.16.0

### Utilities
- **date-fns 4.1.0** - Date utilities
- **clsx 2.1.1** - Conditional classes
- **tailwind-merge 3.3.1** - Class merging
- **node-fetch 3.3.2** - Fetch polyfill

### Testing (In Development)
- **Vitest 3.2.4** - Unit testing framework
- **Playwright 1.55.0** - E2E testing (configuration pending)
- **Testing Library** - React component testing utilities

### Development Tools
- **ESLint** with Next.js configuration
- **Prettier** - Code formatting
- **tsx 4.20.5** - TypeScript execution
- **dotenv 17.2.1** - Environment variables

## Project Structure

```
supercivilization/
├── app/
│   ├── page.tsx              # Homepage with Hero and Featured Cards
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Global styles
│   ├── discover/             # Membership journey landing
│   │   └── [step]/           # Dynamic ceremony steps (1-7)
│   ├── onboard/              # Onboarding flow
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication endpoints
│   │   ├── health/           # Health check
│   │   ├── rate-limit/       # Rate limiting
│   │   ├── validate-invite/  # Invite validation
│   │   └── resend-verification/
│   └── auth/                 # Auth routes (callback, reset-password)
├── components/
│   ├── ui/                   # shadcn/ui components (50+ components)
│   ├── onboarding/           # Step components for membership ceremony
│   │   ├── step0-welcome.tsx
│   │   ├── step1-accept-invitation.tsx
│   │   ├── step2-agree-primelaw.tsx
│   │   ├── step3-create-account.tsx
│   │   ├── step4-authenticate-identity.tsx
│   │   ├── step5-arrange-ceremony.tsx
│   │   ├── step6-affirm-ceremony.tsx
│   │   └── step7-activate-membership.tsx
│   ├── hero.tsx              # Homepage hero section
│   ├── featured-cards.tsx    # Homepage feature cards
│   └── *.test.tsx            # Component tests
├── lib/
│   ├── supabase/             # Supabase client setup
│   │   ├── client.ts         # Browser client
│   │   └── server.ts         # Server client
│   ├── rate-limiting.ts      # Upstash rate limiting
│   ├── trust-scoring.ts      # Trust score calculations
│   ├── password-utils.ts     # Password validation
│   ├── error-handling.ts     # Error utilities
│   └── utils.ts              # General utilities
├── hooks/                    # Custom React hooks
├── public/                   # Static assets
├── types/                    # TypeScript type definitions
└── Configuration files
    ├── next.config.mjs       # Next.js configuration
    ├── tailwind.config.ts    # Tailwind configuration
    ├── tsconfig.json         # TypeScript configuration
    ├── vitest.config.ts      # Vitest configuration
    └── .env.local            # Environment variables (not committed)
```

## Getting Started

### Prerequisites

- **Node.js 24+** (with native TypeScript support recommended)
- **pnpm 9+** (package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/supercivilization/supercivilization.xyz.git
   cd supercivilization
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Configure the following:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
   - `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
   - `UPSTASH_REDIS_REST_URL` - Upstash Redis URL
   - `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Available Scripts

```bash
pnpm dev           # Start development server with Turbopack
pnpm build         # Create production build with Turbopack
pnpm start         # Start production server
pnpm lint          # Run ESLint
pnpm test          # Run Vitest unit tests
pnpm test:watch    # Run tests in watch mode
pnpm test:coverage # Generate test coverage report
pnpm test:e2e      # Run Playwright E2E tests (when configured)
pnpm test:e2e:ui   # Run Playwright with UI mode
```

## Architecture & Best Practices

### State Management Strategy

**When to use each tool:**

| Use Case | Tool | Why |
|----------|------|-----|
| Server data (API, database) | TanStack Query | Caching, refetching, synchronization |
| UI state (sidebar, modals) | Zustand | Lightweight, persists to localStorage |
| Form state | React Hook Form + Zod | Validation, error handling, type safety |
| Single component state | React useState | Simplest solution for isolated state |

### Data Fetching Pattern

All data fetching uses **TanStack Query** for:
- Automatic caching and background refetching
- Loading and error states
- Optimistic updates
- Integration with Sentry for error tracking

Example:
```typescript
import { useProfile } from '@/lib/query/hooks/use-profile';

const { data, isLoading, error } = useProfile(userId);
```

### Form Validation Pattern

All forms use **React Hook Form + Zod** for:
- Type-safe validation schemas
- Client-side validation
- Server-side validation
- Clear error messages

Example:
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@/lib/schemas/profile';

const form = useForm({
  resolver: zodResolver(profileSchema),
});
```

### Error Tracking

**Sentry** automatically captures:
- React Query errors
- Mutation errors
- Unhandled exceptions
- Performance metrics

## Core Features

### Homepage (`/`)
- Hero section with call-to-action
- Featured cards showcasing key features
- Responsive design with animations

### Membership Onboarding (`/onboard` and `/discover/[step]`)

Seven-step ceremony process:
1. **Accept Invitation** - Verify invitation code
2. **Agree to Prime Law** - Review and accept constitutional foundation
3. **Create Account** - Set up credentials and profile
4. **Authenticate Identity** - Connect accounts for verification
5. **Arrange Ceremony** - Schedule live ceremony session
6. **Affirm Ceremony** - Complete the ceremony process
7. **Activate Membership** - Finalize and activate membership

### API Integration
- Supabase authentication and database
- Upstash Redis rate limiting
- Health monitoring endpoints
- Invite validation system

## SEO & Metadata

The site includes comprehensive SEO optimization:
- Structured data (JSON-LD) for Organization, Person, Website, and WebPage
- Open Graph and Twitter Card metadata
- Optimized for search engines and social sharing
- Schema.org compliant cross-referencing

## Development

### Code Quality
- TypeScript strict mode enabled
- ESLint with Next.js configuration
- Prettier for consistent formatting

### Testing Status
- Unit tests: In development (Vitest configured, 6 test files exist)
- E2E tests: Framework installed, configuration needed
- Component tests: Testing Library available

### Known Limitations
- Playwright E2E tests not yet implemented
- Test coverage incomplete

## Deployment

Optimized for Vercel deployment with:
- Automatic builds from main branch
- Environment variable management
- Edge Runtime support
- Standalone output mode
- A+ SEO and performance scores

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

See the [LICENSE](LICENSE) file for details.

---

Built with Next.js 15, React 19, and modern web technologies.
