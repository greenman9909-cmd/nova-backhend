import { Hono } from 'hono';

const sports = new Hono();

// Helper to get time relative to now
const getRelativeTime = (params: { hours?: number; minutes?: number }) => {
    const now = new Date();
    if (params.hours) now.setHours(now.getHours() + params.hours);
    if (params.minutes) now.setMinutes(now.getMinutes() + params.minutes);
    return now.getTime();
};

// Dynamic Mock Data
const getLiveMatches = () => [
    {
        id: 'match-1',
        title: 'Real Madrid vs Barcelona',
        category: 'football',
        date: getRelativeTime({ minutes: -45 }), // Started 45 mins ago (LIVE)
        poster: '/images/el-clasico.jpg',
        popular: true,
        teams: {
            home: { name: 'Real Madrid', badge: 'real_madrid' },
            away: { name: 'Barcelona', badge: 'barcelona' }
        },
        sources: [{ source: 'streamed', id: 'rm-vs-barca' }]
    },
    {
        id: 'match-2',
        title: 'Lakers vs Warriors',
        category: 'basketball',
        date: getRelativeTime({ minutes: -20 }), // Started 20 mins ago (LIVE)
        poster: '/images/nba.jpg',
        popular: true,
        teams: {
            home: { name: 'Lakers', badge: 'lakers' },
            away: { name: 'Warriors', badge: 'warriors' }
        },
        sources: [{ source: 'streamed', id: 'lakers-warriors' }]
    },
    {
        id: 'match-3',
        title: 'Man City vs Arsenal',
        category: 'football',
        date: getRelativeTime({ minutes: 15 }), // Starts in 15 mins (UPCOMING)
        popular: true,
        teams: {
            home: { name: 'Man City', badge: 'man_city' },
            away: { name: 'Arsenal', badge: 'arsenal' }
        },
        sources: [{ source: 'streamed', id: 'mancity-arsenal' }]
    },
    {
        id: 'match-4',
        title: 'Ferrari vs Red Bull',
        category: 'f1',
        date: getRelativeTime({ minutes: -60 }), // LIVE
        popular: true,
        teams: {
            home: { name: 'Ferrari', badge: 'ferrari' },
            away: { name: 'Red Bull', badge: 'red_bull' }
        },
        sources: [{ source: 'streamed', id: 'f1-gp' }]
    }
];

// Routes
sports.get('/matches/live', (c) => {
    const matches = getLiveMatches();
    // Return matches that have started or start very soon
    const live = matches.filter(m => m.date <= Date.now() + 1000 * 60 * 15);
    return c.json(live);
});

sports.get('/matches/all-today', (c) => {
    return c.json(getLiveMatches());
});

sports.get('/sports', (c) => {
    return c.json([
        { id: 'football', name: 'Football' },
        { id: 'basketball', name: 'Basketball' },
        { id: 'hockey', name: 'Hockey' },
        { id: 'tennis', name: 'Tennis' },
        { id: 'f1', name: 'Formula 1' }
    ]);
});

sports.get('/matches/:sport', (c) => {
    const sport = c.req.param('sport');
    const matches = getLiveMatches();
    if (sport === 'all') return c.json(matches);
    return c.json(matches.filter(m => m.category === sport));
});

// Stream Source Mock
sports.get('/stream/:source/:id', (c) => {
    return c.json([
        {
            id: 'stream-1',
            streamNo: 1,
            language: 'English',
            hd: true,
            embedUrl: 'https://vidsrc.to/embed/movie/385687', // Placeholder
            source: 'mock'
        }
    ]);
});

export { sports as sportsRouter };
