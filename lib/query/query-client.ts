import { QueryClient, DefaultOptions } from '@tanstack/react-query';
import * as Sentry from '@sentry/nextjs';

const queryConfig: DefaultOptions = {
  queries: {
    // Data is considered fresh for 60 seconds
    staleTime: 60 * 1000,
    // Data is kept in cache for 5 minutes
    gcTime: 5 * 60 * 1000,
    // Retry failed requests 3 times with exponential backoff
    retry: 3,
    // Don't refetch on window focus in development
    refetchOnWindowFocus: process.env.NODE_ENV === 'production',
  },
  mutations: {
    // Retry mutations once
    retry: 1,
  },
};

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      ...queryConfig,
      queries: {
        ...queryConfig.queries,
        // Add error handling with Sentry
        throwOnError: (error) => {
          // Log all query errors to Sentry
          Sentry.captureException(error, {
            tags: { type: 'react-query-error' },
          });
          return false;
        },
      },
      mutations: {
        ...queryConfig.mutations,
        // Add error handling for mutations
        onError: (error) => {
          Sentry.captureException(error, {
            tags: { type: 'mutation-error' },
          });
        },
      },
    },
  });
}

// Browser query client (singleton)
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always create a new QueryClient
    return makeQueryClient();
  } else {
    // Browser: reuse existing QueryClient
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
