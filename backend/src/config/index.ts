import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  thronesApiBaseUrl:
    process.env.THRONES_API_BASE_URL || 'https://thronesapi.com/api/v2',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
} as const;
