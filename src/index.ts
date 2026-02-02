import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { animeRouter } from './routes/anime';
import { sportsRouter } from './routes/sports';

const app = new Hono();

// Enable CORS for frontend
app.use('/*', cors({
  origin: '*', // Allow all origins for public API or list specific domains
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));

// Health check
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'NOVA Backend API',
    version: '1.0.0'
  });
});

// Mount anime routes
app.route('/api', animeRouter);
app.route('/api/sports', sportsRouter);

// Start server
const port = 3030;
console.log(`🚀 NOVA Backend running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};

export { app };
