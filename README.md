# Supercivilization

A parallel society built on genius. Join the next evolution of civilization.

## Overview

Supercivilization is a modern web platform featuring a public landing page and comprehensive onboarding experience for new members.

## Tech Stack

- **Next.js 15.5.4** with App Router and Turbopack
- **React 19.2.0** with Server Components
- **TypeScript 5.9.3** (strict mode)
- **Tailwind CSS 4.1.12** with Oxide engine
- **shadcn/ui** component library
- **Supabase 2.56.1** for backend and authentication
- **Framer Motion 12.23.22** for animations

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
└── app-archive/           # Archived features (not deployed)
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/supercivilization/supercivilization.git
   cd supercivilization
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your Supabase credentials.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Vitest unit tests
npm run test:e2e     # Run Playwright E2E tests
```

## Core Features

### Homepage (`/`)
- Hero section with call-to-action
- Featured cards showcasing key features
- Modern, responsive design

### Discover (`/discover`)
- Public landing page
- Community showcase
- Introduction to Supercivilization

### Onboarding (`/onboard`)
Seven-step process for new members:
1. **Welcome** - Introduction and overview (34min total)
2. **Accept Invitation** - Verify invitation code
3. **Agree to Prime Law** - Review and accept constitutional foundation
4. **Create Account** - Set up user credentials
5. **Authenticate Identity** - Connect accounts for verification
6. **Arrange Ceremony** - Schedule live ceremony session
7. **Affirm Ceremony** - Record video commitment
8. **Activate Membership** - Complete onboarding

## Deployment

The project is configured for deployment on Vercel with:
- Automatic builds from main branch
- Environment variable management
- Edge Runtime support
- Static page optimization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with [v0.dev](https://v0.dev) | Founded by [Joshua Seymour](https://www.joshuaseymour.com)
