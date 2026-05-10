import { useState, useEffect, useCallback } from 'react';

export interface TrackData {
  title: string;
  artist: string;
  albumArt?: string;
  spotifyId: string;
  ytmusicId?: string;
}

export function useMusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState<TrackData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [platform, setPlatform] = useState<'spotify' | 'ytmusic'>('spotify');

  useEffect(() => {
    if (!currentTrack || !('mediaSession' in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.artist,
      artwork: currentTrack.albumArt ? [
        { src: currentTrack.albumArt, sizes: '512x512', type: 'image/jpeg' }
      ] : []
    });

    navigator.mediaSession.setActionHandler('play', () => play());
    navigator.mediaSession.setActionHandler('pause', () => pause());
    navigator.mediaSession.setActionHandler('previoustrack', () => previousTrack());
    navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack());

    return () => {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
    };
  }, [currentTrack]);

  const play = useCallback(() => {
    setIsPlaying(true);
    // Add actual play logic here
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    // Add actual pause logic here
  }, []);

  const previousTrack = useCallback(() => {
    console.log('Previous track');
  }, []);

  const nextTrack = useCallback(() => {
    console.log('Next track');
  }, []);

  const handleSpotifyError = useCallback(() => {
    if (currentTrack && currentTrack.ytmusicId) {
      console.log(`Fallback: Switching from Spotify to YTMusic for track ${currentTrack.title}`);
      setPlatform('ytmusic');
      play();
    } else {
      console.error('Track failed to play on Spotify and no YTMusic fallback ID found.');
    }
  }, [currentTrack, play]);

  const playTrack = useCallback((track: TrackData) => {
    setCurrentTrack(track);
    setPlatform('spotify'); // Try Spotify first
    play();

    // Simulate Spotify Premium check/error after short delay
    setTimeout(() => {
        // Mock error: user doesn't have premium
        const mockSpotifyError = true;
        if (mockSpotifyError) {
             handleSpotifyError();
        }
    }, 1000);
  }, [play, handleSpotifyError]);

  return {
    currentTrack,
    isPlaying,
    platform,
    playTrack,
    play,
    pause,
    previousTrack,
    nextTrack,
    handleSpotifyError
  };
}