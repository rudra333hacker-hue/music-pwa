import { NextResponse } from 'next/server';
import { search } from 'youtube-ext';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter q is required' }, { status: 400 });
  }

  try {
    const ytResults = await search(query, { filterType: 'video' });

    const mappedResults = ytResults.videos.map(song => {
      // Parse "3:34" into milliseconds
      let durationMs = 0;
      if (song.duration?.text) {
        const parts = song.duration.text.split(':').map(Number);
        if (parts.length === 2) durationMs = (parts[0] * 60 + parts[1]) * 1000;
        if (parts.length === 3) durationMs = (parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000;
      }

      return {
        id: song.id,
        name: song.title,
        artist: song.channel?.name || 'Unknown Artist',
        durationMs: durationMs,
        thumbnails: song.thumbnails || [],
        platform: 'youtube'
      };
    });

    return NextResponse.json({
      query,
      results: mappedResults
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}