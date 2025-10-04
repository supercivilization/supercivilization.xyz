/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com'],
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  trailingSlash: false,
  // Fix workspace root warning
  output: 'standalone',
  outputFileTracingRoot: import.meta.dirname,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-select',
      '@radix-ui/react-toast',
      'date-fns',
      '@dnd-kit/core',
      '@dnd-kit/sortable',
      'recharts',
    ],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Turbopack configuration (moved from experimental.turbo)
  turbopack: {},
  // Ensure we handle all errors properly
  onDemandEntries: {
    // Keep the build page in memory for longer
    maxInactiveAge: 60 * 60 * 1000,
    // Have more pages in memory
    pagesBufferLength: 5,
  },
  // Improve build performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
}

export default nextConfig;

