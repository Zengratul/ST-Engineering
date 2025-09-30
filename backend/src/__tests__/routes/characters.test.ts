import request from 'supertest';
import express from 'express';
import routes from '@/routes';

const app = express();
app.use('/api', routes);

describe('Character Routes', () => {
  describe('GET /api/characters', () => {
    it('should return characters list', async () => {
      const response = await request(app)
        .get('/api/characters')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should filter characters by name query parameter', async () => {
      const response = await request(app)
        .get('/api/characters?name=Daenerys')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should filter characters by family query parameter', async () => {
      const response = await request(app)
        .get('/api/characters?family=Stark')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/characters/:id', () => {
    it('should return character by valid ID', async () => {
      const response = await request(app)
        .get('/api/characters/0')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', 0);
      expect(response.body.data).toHaveProperty('name');
      expect(response.body.data).toHaveProperty('title');
      expect(response.body.data).toHaveProperty('family');
      expect(response.body.data).toHaveProperty('image');
    });

    it('should return 400 for invalid character ID', async () => {
      const response = await request(app)
        .get('/api/characters/invalid')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Invalid character ID');
    });

    it('should return 502 for negative character ID (external API error)', async () => {
      const response = await request(app).get('/api/characters/-1').expect(502);

      // The response might be empty or have different structure
      expect(response.status).toBe(502);
    });
  });

  describe('GET /api/characters/search', () => {
    it('should search characters by query parameter', async () => {
      const response = await request(app)
        .get('/api/characters/search?q=Jon')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return 400 when query parameter is missing', async () => {
      const response = await request(app)
        .get('/api/characters/search')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Search query is required');
    });

    it('should return 400 when query parameter is not a string', async () => {
      const response = await request(app)
        .get('/api/characters/search?q[]=test')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Search query is required');
    });
  });

  describe('GET /api/health', () => {
    it('should return health check status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty(
        'message',
        'Game of Thrones Explorer BFF is running'
      );
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});
