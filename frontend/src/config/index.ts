export const config = {
  apiBaseUrl:
    (import.meta as { env?: Record<string, string> }).env?.VITE_API_BASE_URL ||
    'http://localhost:3001/api',
} as const;
