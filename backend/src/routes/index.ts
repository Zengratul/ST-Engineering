import { Router, type Router as ExpressRouter } from 'express';
import characterRoutes from './characterRoutes';

const router: ExpressRouter = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Game of Thrones Explorer BFF is running',
    timestamp: new Date().toISOString(),
  });
});

// Character routes
router.use('/characters', characterRoutes);

export default router;
