import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap for Supercivilization
 *
 * Includes:
 * - Static pages (home, about, contact, etc.)
 * - Dynamic discover steps (1-7)
 * - Future service pages (7 services)
 * - Future podcast pages (7 podcasts)
 * - Future app pages (7 applications)
 *
 * Aligned with comprehensive schema.org knowledge graph
 */

const baseUrl = 'https://supercivilization.xyz'

/**
 * Service slugs matching our schema.org Service entities
 */
const services = [
  'superpuzzle-developments',
  'superhuman-enhancements',
  'personal-success-puzzle',
  'supersociety-advancements',
  'business-success-puzzle',
  'supergenius-breakthroughs',
  'supermind-superpowers',
] as const

/**
 * Discover ceremony steps (1-7)
 */
const discoverSteps = [1, 2, 3, 4, 5, 6, 7] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const lastModified = now.toISOString()

  return [
    // ============================================
    // CORE PAGES (High Priority)
    // ============================================
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // ============================================
    // MEMBERSHIP PAGES
    // ============================================
    {
      url: `${baseUrl}/discover`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/onboard`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },

    // ============================================
    // DISCOVER CEREMONY STEPS (Dynamic Routes)
    // ============================================
    ...discoverSteps.map((step) => ({
      url: `${baseUrl}/discover/${step}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // ============================================
    // SERVICE PAGES (Future Routes - Planned)
    // ============================================
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // ============================================
    // PODCAST PAGES (Future Routes - Planned)
    // ============================================
    ...services.map((service) => ({
      url: `${baseUrl}/podcasts/${service}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),

    // ============================================
    // APPLICATION PAGES (Future Routes - Planned)
    // ============================================
    ...services.map((service) => ({
      url: `${baseUrl}/apps/${service}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),

    // ============================================
    // AUDIENCE PAGES (Future Routes - Planned)
    // ============================================
    {
      url: `${baseUrl}/audiences/individual`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/audiences/collective`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/audiences/ecosystem`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]
}
