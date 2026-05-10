import { NextResponse } from 'next/server';
import YTMusic from 'ytmusic-api';

interface Track {
  id: string;
  name: string;
  artist: string;
  durationMs: number;
  platform: 'spotify' | 'ytmusic';
}

function fuzzyMatch(track1: Track, track2: Track): boolean {
  const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

  const nameMatch = normalize(track1.name) === normalize(track2.name);
  const artistMatch = normalize(track1.artist) === normalize(track2.artist);
  const durationMatch = Math.abs(track1.durationMs - track2.durationMs) <= 5000;

  return nameMatch && artistMatch && durationMatch;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter q is required' }, { status: 400 });
  }

  try {
    const ytmusic = new YTMusic();
    await ytmusic.initialize();

    const ytResults = await ytmusic.searchSongs(query);
    const mappedYtResults: Track[] = ytResults.map(song => ({
      id: song.videoId,
      name: song.name,
      artist: song.artist.name,
      durationMs: (song.duration || 0) * 1000,
      platform: 'ytmusic'
    }));

    // Mock Spotify API call (since we don't have auth tokens set up)
    const mockSpotifyResults: Track[] = mappedYtResults.map(song => ({
      ...song,
      id: `spotify_${song.id}`,
      platform: 'spotify',
      durationMs: song.durationMs + (Math.random() * 4000 - 2000) // Within 5s margin
    }));

    const matchedPairs = mockSpotifyResults.map(spotifyTrack => {
      const match = mappedYtResults.find(ytTrack => fuzzyMatch(spotifyTrack, ytTrack));
      return {
        spotify: spotifyTrack,
        ytmusic: match || null
      };
    });

    return NextResponse.json({
      query,
      results: matchedPairs
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
