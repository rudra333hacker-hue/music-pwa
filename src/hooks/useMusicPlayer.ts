import { useState, useEffect, useCallback, useRef } from 'react';

export interface TrackData {
  title: string;
  artist: string;
  albumArt?: string;
  ytmusicId: string;
}

export function useMusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState<TrackData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.onplay = () => setIsPlaying(true);
      audioRef.current.onpause = () => setIsPlaying(false);
      audioRef.current.onended = () => setIsPlaying(false); // Can trigger next track here later
      audioRef.current.onerror = (e) => {
        console.error("Audio playback error:", e);
        setError("Failed to play audio.");
        setIsPlaying(false);
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Set up MediaSession API
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
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.play().catch(e => {
        console.error("Playback failed:", e);
        setError("Playback failed. Please interact with the document first.");
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const previousTrack = useCallback(() => {
    console.log('Previous track clicked');
  }, []);

  const nextTrack = useCallback(() => {
    console.log('Next track clicked');
  }, []);

  const playTrack = useCallback(async (track: TrackData) => {
    setCurrentTrack(track);
    setIsLoading(true);
    setError(null);

    try {
      // Fetch the actual streaming URL
      const response = await fetch(`/api/stream?id=${track.ytmusicId}`);
      if (!response.ok) {
        throw new Error('Failed to get stream URL');
      }
      const data = await response.json();

      if (data.url && audioRef.current) {
        audioRef.current.src = data.url;
        audioRef.current.load();
        await audioRef.current.play();
      } else {
         throw new Error("No URL returned from stream API");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error playing track');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    currentTrack,
    isPlaying,
    isLoading,
    error,
    playTrack,
    play,
    pause,
    previousTrack,
    nextTrack,
  };
}