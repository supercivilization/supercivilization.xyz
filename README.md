# Supercivilization

A parallel society built on genius. Join the next evolution of civilization.

## Overview

Supercivilization is a modern web platform featuring a public landing page and comprehensive onboarding experience for new members. Built with the latest web technologies and best practices for performance, accessibility, and SEO.

## Tech Stack

- **Next.js 15.5.4** with App Router and Turbopack
- **React 19.1.1** with Server Components
- **TypeScript 5.9.2** (strict mode)
- **Tailwind CSS 4.1.12** with Oxide engine
- **shadcn/ui Platform** - Complete component library
- **Supabase 2.56.1** for backend and authentication
- **Framer Motion 12.23.12** for animations
- **Vitest 3.2.4** for unit testing
- **Playwright 1.55.0** for E2E testing

## Project Structure

```
supercivilization/
├── app/
│   ├── page.tsx           # Homepage
│   ├── discover/          # Public landing page
│   ├── onboard/           # 7-step onboarding flow
│   ├── api/               # API routes
│   └── auth/              # Authentication routes
├── components/
│   ├── ui/                # shadcn/ui components
│   └── onboarding/        # Onboarding step components
├── lib/
│   ├── supabase/          # Supabase client utilities
│   └── schemas/           # Zod validation schemas
└── tests/                 # Test files
```

## Getting Started

### Prerequisites

- Node.js 24+ (with native TypeScript support)
- pnpm 9+ (package manager)

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
   Edit `.env.local` with your Supabase credentials.

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Available Scripts

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Create production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run Vitest unit tests
pnpm test:e2e     # Run Playwright E2E tests
```

## Core Features

### Homepage (`/`)
- Hero section with call-to-action
- Featured cards showcasing key features
- Modern, responsive design with animations

### Discover (`/discover`)
- Public landing page
- Community showcase
- Introduction to Supercivilization philosophy

### Onboarding (`/onboard`)
Eight-step process for new members:
1. **Welcome** - Introduction and overview
2. **Accept Invitation** - Verify invitation code
3. **Agree to Prime Law** - Review constitutional foundation
4. **Create Account** - Set up user credentials
5. **Authenticate Identity** - Connect accounts for verification
6. **Arrange Ceremony** - Schedule live ceremony session
7. **Affirm Ceremony** - Complete ceremony process
8. **Activate Membership** - Finalize onboarding

## SEO & Metadata

The site includes comprehensive SEO optimization:
- Structured data (JSON-LD) for Organization, Person, Website, and WebPage
- Open Graph and Twitter Card metadata
- Optimized for search engines and social sharing
- Schema.org compliant cross-referencing

## Deployment

The project is deployed on Vercel with:
- Automatic builds from main branch
- Environment variable management
- Edge Runtime support
- Static page optimization
- A+ SEO and performance scores

## Development

### Code Quality
- TypeScript strict mode
- ESLint with Next.js config
- Prettier for code formatting
- Comprehensive test coverage

### Testing
- **Unit Tests**: Vitest for component and utility testing
- **E2E Tests**: Playwright for user flow testing
- **Type Safety**: Full TypeScript coverage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Founded by [Joshua Seymour](https://joshuaseymour.com)**
Part of the [Supercivilization](https://supercivilization.xyz) ecosystem
