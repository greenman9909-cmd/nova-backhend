import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { animeRouter } from './routes/anime';
import { sportsRouter } from './routes/sports';
import { tmdbRouter } from './routes/tmdb';
import { moviesRouter } from './routes/movies';
import { authRouter } from './routes/auth';

const app = new Hono();

// Enable CORS for frontend
app.use('/*', cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
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
app.route('/api/tmdb', tmdbRouter);
app.route('/api/movies', moviesRouter);
app.route('/api/auth', authRouter);

// Start server
const port = 3030;
console.log(`🚀 NOVA Backend running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};

export { app };
