import { Router, type Router as ExpressRouter } from 'express';
import {
  getAllCharacters,
  getCharacterById,
  searchCharacters,
} from '@/controllers/characterController';

const router: ExpressRouter = Router();

// GET /characters - Get all characters with optional filtering
router.get('/', getAllCharacters);

// GET /characters/search?q=query - Search characters by name
router.get('/search', searchCharacters);

// GET /characters/:id - Get a single character by ID
router.get('/:id', getCharacterById);

export default router;
