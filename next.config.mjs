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
  // Remove experimental features for stability
  swcMinify: true,
  // Ensure CSS modules are processed
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    })
    return config
  }
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
