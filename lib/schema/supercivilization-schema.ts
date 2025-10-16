/**
 * Supercivilization Comprehensive Knowledge Graph
 *
 * ECOSYSTEM STRUCTURE:
 * - 1 Organization (Supercivilization)
 * - 3 Audience segments (Individual, Collective, Ecosystem)
 * - 7 Service offerings (color-coded puzzle/enhancement/advancement areas)
 * - 7 PodcastSeries (one per service)
 * - 7 SoftwareApplications (one per service)
 *
 * VALIDATION STRATEGY (NEW ENTITY WITHOUT WIKIPEDIA):
 * - Cross-domain references to canonical Person entity
 * - Complete social profile validation via sameAs
 * - Service + Audience modeling (cutting-edge for 2025)
 * - Rich interconnected ecosystem demonstrates authority
 * - Building toward Crunchbase listing and eventual Wikidata
 *
 * This is a top 0.1% schema implementation optimized for:
 * - Google AI Overviews
 * - ChatGPT/Claude/Perplexity citations
 * - Knowledge Graph inclusion
 * - 2025's entity-first search landscape
 */

import type { Graph, Organization, WebSite, WebPage, Audience, Service, PodcastSeries, SoftwareApplication } from 'schema-dts';

/**
 * Complete Supercivilization Knowledge Graph
 *
 * Contains 20+ interconnected entities forming a comprehensive organizational ecosystem
 */
export const SUPERCIVILIZATION_SCHEMA_GRAPH: Graph = {
  '@context': 'https://schema.org',
  '@graph': [
    // ============================================
    // ORGANIZATION (Main Entity)
    // ============================================
    {
      '@type': 'Organization',
      '@id': 'https://supercivilization.xyz/#organization',
      name: 'Supercivilization',
      legalName: 'Supercivilization',
      url: 'https://supercivilization.xyz',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://supercivilization.xyz/#logo',
        url: 'https://supercivilization.xyz/logo.png',
        encodingFormat: 'image/png',
        caption: 'Supercivilization Logo',
        width: '512',
        height: '512',
      },
      image: {
        '@type': 'ImageObject',
        '@id': 'https://supercivilization.xyz/#logo',
      },
      description:
        'We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem. Launching January 1, 2026.',
      slogan: 'Vivify Further, Unify Faster, Thrive Forever',
      foundingDate: '2026-01-01',
      foundingLocation: {
        '@type': 'Place',
        name: 'San Miguel de Allende, Guanajuato, Mexico',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Miguel de Allende',
        addressRegion: 'Guanajuato',
        addressCountry: 'MX',
      },
      email: 'admin@supercivilization.xyz',
      founder: {
        '@type': 'Person',
        '@id': 'https://joshuaseymour.com/#person',
        name: 'Joshua Seymour',
        url: 'https://joshuaseymour.com',
        image: 'https://joshuaseymour.com/profile.png',
      },
      sameAs: [
        'https://www.tiktok.com/@supercivilization',
        'https://www.youtube.com/@supercivilization',
        'https://x.com/supercivilizing',
        'https://www.instagram.com/supercivilizing/',
        'https://luma.com/supercivilization',
        'https://supercivilization.substack.com/',
        'https://github.com/supercivilization',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'admin@supercivilization.xyz',
        contactType: 'Customer Support',
        availableLanguage: 'English',
      },
      audience: [
        { '@id': 'https://supercivilization.xyz/audiences/#individual' },
        { '@id': 'https://supercivilization.xyz/audiences/#collective' },
        { '@id': 'https://supercivilization.xyz/audiences/#ecosystem' },
      ],
      makesOffer: [
        { '@type': 'Offer', itemOffered: { '@id': 'https://supercivilization.xyz/services/#superpuzzle-developments' } },
        { '@type': 'Offer', itemOffered: { '@id': 'https://supercivilization.xyz/services/#superhuman-enhancements' } },
        { '@type': 'Offer', itemOffered: { '@id': 'https://supercivilization.xyz/services/#personal-success-puzzle' } },
        { '@type': 'Offer', itemOffered: { '@id': 'https://supercivilization.xyz/services/#supersociety-advancements' } },
        { '@type': 'Offer', itemOffered: { '@id': 'https://supercivilization.xyz/services/#business-success-puzzle' } },
        { '@type': 'Offer', itemOffered: { '@id': 'https://supercivilization.xyz/services/#supergenius-breakthroughs' } },
        { '@type': 'Offer', itemOffered: { '@id': 'https://supercivilization.xyz/services/#supermind-superpowers' } },
      ],
      owns: {
        '@type': 'SoftwareApplication',
        '@id': 'https://avolve.io/#softwareapplication',
      },
      publishingPrinciples: 'https://supercivilization.xyz/principles',
      knowsAbout: [
        'Individual Achievement',
        'Collective Advancement',
        'Ecosystem Development',
        'Superhuman Enhancement',
        'Supersociety Advancement',
        'Supergenius Breakthroughs',
        'Personal Success',
        'Business Success',
        'Supermind Superpowers',
        'Entrepreneurship',
        'Technology',
        'Social Innovation',
      ],
      areaServed: {
        '@type': 'Place',
        name: 'Worldwide',
      },
      department: [
        {
          '@type': 'Organization',
          name: 'Superhuman Academy',
          description: 'Support child development ages 0 to 12',
        },
        {
          '@type': 'Organization',
          name: 'Superhuman University',
          description: 'Support youth development ages 12 to 25',
        },
        {
          '@type': 'Organization',
          name: 'Superhuman Institute',
          description: 'Support adult development ages 25+',
        },
      ],
      parentOrganization: {
        '@type': 'Person',
        '@id': 'https://joshuaseymour.com/#person',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://supercivilization.xyz/#webpage',
      },
    } as Organization,

    // ============================================
    // AUDIENCE ENTITIES (3)
    // ============================================
    {
      '@type': 'Audience',
      '@id': 'https://supercivilization.xyz/audiences/#individual',
      audienceType: 'Individual Superachievers',
      description: 'Individuals seeking to vivify further through learning, applying, and teaching for personal success. Focus on health, wealth, and peace.',
    } as Audience,

    {
      '@type': 'Audience',
      '@id': 'https://supercivilization.xyz/audiences/#collective',
      audienceType: 'Collectives of Superachievers',
      description: 'Teams, companies, and communities seeking to unify faster by building startup societies and network unions.',
    } as Audience,

    {
      '@type': 'Audience',
      '@id': 'https://supercivilization.xyz/audiences/#ecosystem',
      audienceType: 'Supercivilization Ecosystem Firms',
      description: 'Ventures, enterprises, and industries seeking to thrive forever by inventing, improving, and managing growth engines.',
    } as Audience,

    // ============================================
    // SERVICE ENTITIES (7)
    // ============================================
    {
      '@type': 'Service',
      '@id': 'https://supercivilization.xyz/services/#superpuzzle-developments',
      name: 'Superpuzzle Developments',
      url: 'https://supercivilization.xyz/services/superpuzzle-developments',
      description: 'Progress Our Grand Superpuzzle & Worldwide Drive to Ensure Wealth, Health, & Peace in Your Lifetime',
      provider: { '@id': 'https://supercivilization.xyz/#organization' },
      audience: { '@id': 'https://supercivilization.xyz/audiences/#ecosystem' },
      serviceType: 'News & Documentary',
      category: 'Documentary',
      isRelatedTo: [
        { '@id': 'https://supercivilization.xyz/podcasts/#superpuzzle-developments' },
        { '@id': 'https://supercivilization.xyz/apps/#superpuzzle-developments' },
      ],
    } as Service,

    {
      '@type': 'Service',
      '@id': 'https://supercivilization.xyz/services/#superhuman-enhancements',
      name: 'Superhuman Enhancements',
      url: 'https://supercivilization.xyz/services/superhuman-enhancements',
      description: 'Free Yourself & Loved Ones via Superhuman Enhancements That Support Everyone: Child, Youth, & Adult',
      provider: { '@id': 'https://supercivilization.xyz/#organization' },
      audience: { '@id': 'https://supercivilization.xyz/audiences/#individual' },
      serviceType: 'Education & Personal Development',
      category: 'Education',
      isRelatedTo: [
        { '@id': 'https://supercivilization.xyz/podcasts/#superhuman-enhancements' },
        { '@id': 'https://supercivilization.xyz/apps/#superhuman-enhancements' },
      ],
    } as Service,

    {
      '@type': 'Service',
      '@id': 'https://supercivilization.xyz/services/#personal-success-puzzle',
      name: 'Personal Success Puzzle',
      url: 'https://supercivilization.xyz/services/personal-success-puzzle',
      description: 'Enjoy Greater Personal Successes Faster via Boosting Your Overall Health, Wealth, and Peace in Life',
      provider: { '@id': 'https://supercivilization.xyz/#organization' },
      audience: { '@id': 'https://supercivilization.xyz/audiences/#individual' },
      serviceType: 'Lifestyle & Self-Improvement',
      category: 'Lifestyle',
      isRelatedTo: [
        { '@id': 'https://supercivilization.xyz/podcasts/#personal-success-puzzle' },
        { '@id': 'https://supercivilization.xyz/apps/#personal-success-puzzle' },
      ],
    } as Service,

    {
      '@type': 'Service',
      '@id': 'https://supercivilization.xyz/services/#supersociety-advancements',
      name: 'Supersociety Advancements',
      url: 'https://supercivilization.xyz/services/supersociety-advancements',
      description: 'Free Others & Everybody via Supersociety Advancements That Help Companies, Communities, & Countries',
      provider: { '@id': 'https://supercivilization.xyz/#organization' },
      audience: { '@id': 'https://supercivilization.xyz/audiences/#collective' },
      serviceType: 'Technology & Social Innovation',
      category: 'Technology',
      isRelatedTo: [
        { '@id': 'https://supercivilization.xyz/podcasts/#supersociety-advancements' },
        { '@id': 'https://supercivilization.xyz/apps/#supersociety-advancements' },
      ],
    } as Service,

    {
      '@type': 'Service',
      '@id': 'https://supercivilization.xyz/services/#business-success-puzzle',
      name: 'Business Success Puzzle',
      url: 'https://supercivilization.xyz/services/business-success-puzzle',
      description: 'Enjoy Greater Business Successes Faster by Enhancing Your Network and also Advancing Your Net Worth',
      provider: { '@id': 'https://supercivilization.xyz/#organization' },
      audience: { '@id': 'https://supercivilization.xyz/audiences/#collective' },
      serviceType: 'Business & Entrepreneurship',
      category: 'Business',
      isRelatedTo: [
        { '@id': 'https://supercivilization.xyz/podcasts/#business-success-puzzle' },
        { '@id': 'https://supercivilization.xyz/apps/#business-success-puzzle' },
      ],
    } as Service,

    {
      '@type': 'Service',
      '@id': 'https://supercivilization.xyz/services/#supergenius-breakthroughs',
      name: 'Supergenius Breakthroughs',
      url: 'https://supercivilization.xyz/services/supergenius-breakthroughs',
      description: 'Solve Superpuzzles via Supergenius Breakthroughs That Help Grow Ventures, Enterprises, & Industries',
      provider: { '@id': 'https://supercivilization.xyz/#organization' },
      audience: { '@id': 'https://supercivilization.xyz/audiences/#ecosystem' },
      serviceType: 'Finance & Investment',
      category: 'Finance',
      isRelatedTo: [
        { '@id': 'https://supercivilization.xyz/podcasts/#supergenius-breakthroughs' },
        { '@id': 'https://supercivilization.xyz/apps/#supergenius-breakthroughs' },
      ],
    } as Service,

    {
      '@type': 'Service',
      '@id': 'https://supercivilization.xyz/services/#supermind-superpowers',
      name: 'Supermind Superpowers',
      url: 'https://supercivilization.xyz/services/supermind-superpowers',
      description: 'Improve Your Ability to Solve a Conflict, Create a Plan for the Future & Implement Your Action Plan',
      provider: { '@id': 'https://supercivilization.xyz/#organization' },
      audience: { '@id': 'https://supercivilization.xyz/audiences/#ecosystem' },
      serviceType: 'Productivity & Spirituality',
      category: 'Productivity',
      isRelatedTo: [
        { '@id': 'https://supercivilization.xyz/podcasts/#supermind-superpowers' },
        { '@id': 'https://supercivilization.xyz/apps/#supermind-superpowers' },
      ],
    } as Service,

    // ============================================
    // PODCAST SERIES ENTITIES (7)
    // ============================================
    {
      '@type': 'PodcastSeries',
      '@id': 'https://supercivilization.xyz/podcasts/#superpuzzle-developments',
      name: 'Superpuzzle Developments Podcast',
      url: 'https://supercivilization.xyz/podcasts/superpuzzle-developments',
      description: 'Documentary and news commentary on our grand superpuzzle and worldwide drive to ensure wealth, health, and peace in your lifetime.',
      genre: ['Documentary', 'News Commentary'],
      author: { '@id': 'https://joshuaseymour.com/#person' },
      publisher: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
    } as PodcastSeries,

    {
      '@type': 'PodcastSeries',
      '@id': 'https://supercivilization.xyz/podcasts/#superhuman-enhancements',
      name: 'Superhuman Enhancements Podcast',
      url: 'https://supercivilization.xyz/podcasts/superhuman-enhancements',
      description: 'Philosophy and parenting insights for superhuman enhancements supporting child, youth, and adult development.',
      genre: ['Philosophy', 'Parenting'],
      author: { '@id': 'https://joshuaseymour.com/#person' },
      publisher: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
    } as PodcastSeries,

    {
      '@type': 'PodcastSeries',
      '@id': 'https://supercivilization.xyz/podcasts/#personal-success-puzzle',
      name: 'Personal Success Puzzle Podcast',
      url: 'https://supercivilization.xyz/podcasts/personal-success-puzzle',
      description: 'Self-improvement and how-to guidance for boosting your health, wealth, and peace in life.',
      genre: ['Self-Improvement', 'How To'],
      author: { '@id': 'https://joshuaseymour.com/#person' },
      publisher: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
    } as PodcastSeries,

    {
      '@type': 'PodcastSeries',
      '@id': 'https://supercivilization.xyz/podcasts/#supersociety-advancements',
      name: 'Supersociety Advancements Podcast',
      url: 'https://supercivilization.xyz/podcasts/supersociety-advancements',
      description: 'Technology and social sciences exploration of supersociety advancements helping companies, communities, and countries.',
      genre: ['Technology', 'Social Sciences'],
      author: { '@id': 'https://joshuaseymour.com/#person' },
      publisher: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
    } as PodcastSeries,

    {
      '@type': 'PodcastSeries',
      '@id': 'https://supercivilization.xyz/podcasts/#business-success-puzzle',
      name: 'Business Success Puzzle Podcast',
      url: 'https://supercivilization.xyz/podcasts/business-success-puzzle',
      description: 'Entrepreneurship and how-to strategies for enhancing your network and advancing your net worth.',
      genre: ['Entrepreneurship', 'How To'],
      author: { '@id': 'https://joshuaseymour.com/#person' },
      publisher: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
    } as PodcastSeries,

    {
      '@type': 'PodcastSeries',
      '@id': 'https://supercivilization.xyz/podcasts/#supergenius-breakthroughs',
      name: 'Supergenius Breakthroughs Podcast',
      url: 'https://supercivilization.xyz/podcasts/supergenius-breakthroughs',
      description: 'Management and investing insights for solving superpuzzles and growing ventures, enterprises, and industries.',
      genre: ['Management', 'Investing'],
      author: { '@id': 'https://joshuaseymour.com/#person' },
      publisher: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
    } as PodcastSeries,

    {
      '@type': 'PodcastSeries',
      '@id': 'https://supercivilization.xyz/podcasts/#supermind-superpowers',
      name: 'Supermind Superpowers Podcast',
      url: 'https://supercivilization.xyz/podcasts/supermind-superpowers',
      description: 'Spirituality and personal journals exploring your ability to solve conflicts, create plans, and implement actions.',
      genre: ['Spirituality', 'Personal Journals'],
      author: { '@id': 'https://joshuaseymour.com/#person' },
      publisher: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
    } as PodcastSeries,

    // ============================================
    // SOFTWARE APPLICATION ENTITIES (7)
    // ============================================
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://supercivilization.xyz/apps/#superpuzzle-developments',
      name: 'Superpuzzle Developments App',
      url: 'https://supercivilization.xyz/apps/superpuzzle-developments',
      description: 'News application for tracking our grand superpuzzle progress and worldwide drive for wealth, health, and peace.',
      applicationCategory: 'NewsApplication',
      operatingSystem: 'Web-based, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: { '@id': 'https://joshuaseymour.com/#person' },
      sourceOrganization: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
      softwareVersion: '1.0',
    } as SoftwareApplication,

    {
      '@type': 'SoftwareApplication',
      '@id': 'https://supercivilization.xyz/apps/#superhuman-enhancements',
      name: 'Superhuman Enhancements App',
      url: 'https://supercivilization.xyz/apps/superhuman-enhancements',
      description: 'Education application for superhuman development across academy, university, and institute levels.',
      applicationCategory: 'EducationApplication',
      operatingSystem: 'Web-based, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: { '@id': 'https://joshuaseymour.com/#person' },
      sourceOrganization: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
      softwareVersion: '1.0',
    } as SoftwareApplication,

    {
      '@type': 'SoftwareApplication',
      '@id': 'https://supercivilization.xyz/apps/#personal-success-puzzle',
      name: 'Personal Success Puzzle App',
      url: 'https://supercivilization.xyz/apps/personal-success-puzzle',
      description: 'Lifestyle application for boosting your health, wealth, and peace through personalized guidance.',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Web-based, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: { '@id': 'https://joshuaseymour.com/#person' },
      sourceOrganization: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
      softwareVersion: '1.0',
    } as SoftwareApplication,

    {
      '@type': 'SoftwareApplication',
      '@id': 'https://supercivilization.xyz/apps/#supersociety-advancements',
      name: 'Supersociety Advancements App',
      url: 'https://supercivilization.xyz/apps/supersociety-advancements',
      description: 'Social networking application for building startup societies and network unions.',
      applicationCategory: 'SocialApplication',
      operatingSystem: 'Web-based, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: { '@id': 'https://joshuaseymour.com/#person' },
      sourceOrganization: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
      softwareVersion: '1.0',
    } as SoftwareApplication,

    {
      '@type': 'SoftwareApplication',
      '@id': 'https://supercivilization.xyz/apps/#business-success-puzzle',
      name: 'Business Success Puzzle App',
      url: 'https://supercivilization.xyz/apps/business-success-puzzle',
      description: 'Business application for enhancing your network and advancing your net worth.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web-based, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: { '@id': 'https://joshuaseymour.com/#person' },
      sourceOrganization: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
      softwareVersion: '1.0',
    } as SoftwareApplication,

    {
      '@type': 'SoftwareApplication',
      '@id': 'https://supercivilization.xyz/apps/#supergenius-breakthroughs',
      name: 'Supergenius Breakthroughs App',
      url: 'https://supercivilization.xyz/apps/supergenius-breakthroughs',
      description: 'Finance application for inventing, improving, and managing growth engine portfolios.',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web-based, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: { '@id': 'https://joshuaseymour.com/#person' },
      sourceOrganization: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
      softwareVersion: '1.0',
    } as SoftwareApplication,

    {
      '@type': 'SoftwareApplication',
      '@id': 'https://supercivilization.xyz/apps/#supermind-superpowers',
      name: 'Supermind Superpowers App',
      url: 'https://supercivilization.xyz/apps/supermind-superpowers',
      description: 'Productivity application for solving conflicts, creating plans, and implementing action plans.',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web-based, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: { '@id': 'https://joshuaseymour.com/#person' },
      sourceOrganization: { '@id': 'https://supercivilization.xyz/#organization' },
      datePublished: '2025-10-01',
      softwareVersion: '1.0',
    } as SoftwareApplication,

    // ============================================
    // WEBSITE ENTITY
    // ============================================
    {
      '@type': 'WebSite',
      '@id': 'https://supercivilization.xyz/#website',
      url: 'https://supercivilization.xyz',
      name: 'Supercivilization',
      description:
        'We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.',
      inLanguage: 'en-US',
      publisher: {
        '@type': 'Organization',
        '@id': 'https://supercivilization.xyz/#organization',
      },
      copyrightHolder: {
        '@type': 'Organization',
        '@id': 'https://supercivilization.xyz/#organization',
      },
      copyrightYear: '2026',
      creator: {
        '@type': 'Person',
        '@id': 'https://joshuaseymour.com/#person',
      },
      mainEntity: {
        '@type': 'Organization',
        '@id': 'https://supercivilization.xyz/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://supercivilization.xyz/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
      about: [
        {
          '@type': 'Thing',
          name: 'Superhuman Enhancements',
          description:
            'Individual superachiever development through learning, applying, and teaching',
        },
        {
          '@type': 'Thing',
          name: 'Supersociety Advancements',
          description:
            'Collective of superachievers development through personalizing, globalizing, and localizing',
        },
        {
          '@type': 'Thing',
          name: 'Supergenius Breakthroughs',
          description:
            'Supercivilization ecosystem development through creating, evolving, and managing',
        },
      ],
    } as WebSite,

    // ============================================
    // WEBPAGE ENTITY
    // ============================================
    {
      '@type': 'WebPage',
      '@id': 'https://supercivilization.xyz/#webpage',
      url: 'https://supercivilization.xyz',
      name: 'Supercivilization | Vivify Further, Unify Faster, Thrive Forever',
      description:
        'We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://supercivilization.xyz/#website',
      },
      about: {
        '@type': 'Organization',
        '@id': 'https://supercivilization.xyz/#organization',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        '@id': 'https://supercivilization.xyz/#logo',
      },
      datePublished: '2026-01-01',
      dateModified: '2025-10-15',
      inLanguage: 'en-US',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        '@id': 'https://supercivilization.xyz/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://supercivilization.xyz',
          },
        ],
      },
    } as WebPage,

    // ============================================
    // AVOLVE.IO SOFTWARE APPLICATION
    // ============================================
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://avolve.io/#application',
      name: 'Avolve.io Platform',
      url: 'https://avolve.io',
      description:
        'A knowledge graph for the modern web stack. Get verified compatibility patterns for Next.js 15, React 19, Vercel AI, Supabase auth, shadcn/ui, and more.',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: {
        '@type': 'Organization',
        '@id': 'https://supercivilization.xyz/#organization',
      },
      author: {
        '@type': 'Person',
        '@id': 'https://joshuaseymour.com/#person',
      },
      sourceOrganization: {
        '@type': 'Organization',
        '@id': 'https://supercivilization.xyz/#organization',
      },
    } as SoftwareApplication,
  ],
};

/**
 * Export the schema graph as a JSON-LD string for embedding in HTML
 */
export const SUPERCIVILIZATION_SCHEMA_JSON_LD = JSON.stringify(SUPERCIVILIZATION_SCHEMA_GRAPH);
