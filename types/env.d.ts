declare namespace NodeJS {
  interface ProcessEnv {
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;

    // Sentry
    SENTRY_DSN: string;
    NEXT_PUBLIC_SENTRY_DSN: string;
    SENTRY_AUTH_TOKEN?: string;
    SENTRY_ORG?: string;
    SENTRY_PROJECT?: string;

    // Upstash Redis
    UPSTASH_REDIS_REST_URL: string;
    UPSTASH_REDIS_REST_TOKEN: string;

    // Node Environment
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
