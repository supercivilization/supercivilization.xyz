# Supercivilization

A modern web application implementing The Prime Law verification and trust scoring system.

## Features

- **Prime Law Agreement**
  - Interactive presentation of The Prime Law
  - Verification questions to test understanding
  - Digital signature and IP tracking
  - Progress tracking and immediate feedback

- **Trust Scoring System**
  - Multi-component trust score calculation
  - Badge system for achievements
  - Trust levels (Bronze, Silver, Gold, Platinum)
  - Real-time score updates

- **Security**
  - Rate limiting for login attempts
  - IP tracking for agreements
  - Digital signatures for verification
  - Secure session management

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Supabase for database and authentication
- Tailwind CSS for styling
- Shadcn UI components

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/supercivilization.git
   cd supercivilization
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your Supabase credentials.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following tables:

- `prime_law_agreements`: Records user agreements to The Prime Law
- `verifications`: Tracks user verifications by other members
- `user_activity`: Monitors user engagement and activity
- `connected_accounts`: Manages connected external accounts
- `reputation`: Stores user reputation scores

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 