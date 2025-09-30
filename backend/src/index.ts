import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from '@/config';
import routes from '@/routes';
import { errorHandler } from '@/utils/errors';
import { corsOptions } from '@/middleware/cors';

const app: Express = express();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Game of Thrones Explorer BFF',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      characters: '/api/characters',
      characterById: '/api/characters/:id',
      search: '/api/characters/search?q=query',
    },
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl,
  });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Game of Thrones Explorer BFF running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Characters API: http://localhost:${PORT}/api/characters`);
  console.log(
    `🔍 Search API: http://localhost:${PORT}/api/characters/search?q=query`
  );
  console.log(`🌍 Environment: ${config.nodeEnv}`);
});

export default app;
