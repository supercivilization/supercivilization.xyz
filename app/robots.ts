import { MetadataRoute } from 'next'

/**
 * Robots.txt configuration for Supercivilization
 *
 * Allows all search engines to crawl the site with optimized rules
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // API routes
          '/auth/',          // Auth routes (callback, reset-password)
          '/profile',        // Private user profiles
          '/onboard',        // Private onboarding flow
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/profile',
          '/onboard',
        ],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/profile',
          '/onboard',
        ],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/profile',
          '/onboard',
        ],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/profile',
          '/onboard',
        ],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/profile',
          '/onboard',
        ],
      },
    ],
    sitemap: 'https://supercivilization.xyz/sitemap.xml',
  }
}
