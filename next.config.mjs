let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    // Only ignore ts errors in production
    ...(process.env.NODE_ENV === 'production' && {
      ignoreBuildErrors: true
    })
  },
  eslint: {
    // Only ignore eslint errors in production
    ...(process.env.NODE_ENV === 'production' && {
      ignoreDuringBuilds: true
    })
  },
  // Enable CSS optimization
  optimizeFonts: true,
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  // Remove experimental features for stability
  swcMinify: true
}

if (userConfig?.default) {
  Object.keys(userConfig.default).forEach((key) => {
    if (typeof nextConfig[key] === 'object' && !Array.isArray(nextConfig[key])) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig.default[key],
      }
    } else {
      nextConfig[key] = userConfig.default[key]
    }
  })
}

export default nextConfig
