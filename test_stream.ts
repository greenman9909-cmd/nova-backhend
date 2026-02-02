
async function testStream() {
    const baseUrl = 'https://anime-peach-eight.vercel.app/api';

    // 1. Get Trending to find a valid anime ID
    console.log('Fetching trending...');
    try {
        const trendRes = await fetch(`${baseUrl}/trending`);
        const trendData = await trendRes.json();

        if (!trendData.results?.trending?.length) {
            console.error('No trending anime found');
            return;
        }

        const anime = trendData.results.trending[0];
        console.log(`Found anime: ${anime.title.english || anime.title} (ID: ${anime.id})`);

        // 2. Get Episodes
        console.log(`Fetching episodes for ${anime.id}...`);
        const epRes = await fetch(`${baseUrl}/episodes/${anime.id}`);
        const epData = await epRes.json();

        if (!epData.results?.episodes?.length) {
            console.error('No episodes found');
            return;
        }

        const episode = epData.results.episodes[0];
        console.log(`Found episode: ${episode.number} (ID: ${episode.id})`);

        // 3. Get Stream
        console.log(`Fetching stream for ${episode.id}...`);
        const streamRes = await fetch(`${baseUrl}/stream?id=${episode.id}&server=hd-1`);
        const streamData = await streamRes.json();
        console.log('Stream response:', JSON.stringify(streamData, null, 2));

    } catch (e) {
        console.error('Error:', e);
    }
}

testStream();
