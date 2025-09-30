import { config } from '@/config';

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000', // Frontend dev server
  'http://localhost:4173', // Frontend preview server
  'https://st-engineering-fe.minhviet.xyz', // Production frontend
  config.corsOrigin, // From environment variable
].filter((origin, index, arr) => arr.indexOf(origin) === index); // Remove duplicates

export const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
