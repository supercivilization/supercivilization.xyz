// Standard configuration for API routes
export const apiConfig = {
  runtime: "edge" as const,
  dynamic: "force-dynamic" as const,
  revalidate: 0 as const,
}

// Helper to apply standard configuration to API routes
export function withApiConfig<T extends Record<string, unknown>>(routeExports: T): T & typeof apiConfig {
  return {
    ...routeExports,
    ...apiConfig,
  }
}

