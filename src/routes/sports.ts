import { Hono } from 'hono';
import axios from 'axios';

const sports = new Hono();
const BASE_URL = 'https://streamed.pk/api';

// Create a client with browser-like headers
const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://streamed.pk/',
        'Origin': 'https://streamed.pk'
    }
});

const proxyRequest = async (endpoint: string) => {
    try {
        const response = await client.get(endpoint);
        return response.data;
    } catch (error) {
        console.error(`Error proxying to ${endpoint}:`, error);
        throw error;
    }
};

sports.get('/matches/live', async (c) => {
    try {
        const data = await proxyRequest('/matches/live');
        return c.json(data);
    } catch (e) { return c.json([], 500); }
});

sports.get('/matches/all-today', async (c) => {
    try {
        const data = await proxyRequest('/matches/all-today');
        return c.json(data);
    } catch (e) { return c.json([], 500); }
});

sports.get('/matches/all/popular', async (c) => {
    try {
        const data = await proxyRequest('/matches/all/popular');
        return c.json(data);
    } catch (e) { return c.json([], 500); }
});

sports.get('/sports', async (c) => {
    try {
        const data = await proxyRequest('/sports');
        return c.json(data);
    } catch (e) { return c.json([], 500); }
});

sports.get('/matches/:sport', async (c) => {
    const sport = c.req.param('sport');
    try {
        const data = await proxyRequest(`/matches/${sport}`);
        return c.json(data);
    } catch (e) { return c.json([], 500); }
});

sports.get('/stream/:source/:id', async (c) => {
    const source = c.req.param('source');
    const id = c.req.param('id');
    try {
        const data = await proxyRequest(`/stream/${source}/${id}`);
        return c.json(data);
    } catch (e) { return c.json([], 500); }
});

// Image Proxy Routes
sports.get('/images/badge/:id', async (c) => {
    const id = c.req.param('id');
    try {
        const response = await axios.get(`https://streamed.pk/api/images/badge/${id}`, { responseType: 'arraybuffer' });
        return c.body(response.data, 200, {
            'Content-Type': response.headers['content-type']
        });
    } catch (e) { return c.text('Not Found', 404); }
});

sports.get('/images/proxy/:id', async (c) => {
    const id = c.req.param('id');
    try {
        const response = await axios.get(`https://streamed.pk/api/images/proxy/${id}`, { responseType: 'arraybuffer' });
        return c.body(response.data, 200, {
            'Content-Type': response.headers['content-type']
        });
    } catch (e) { return c.text('Not Found', 404); }
});

export { sports as sportsRouter };
