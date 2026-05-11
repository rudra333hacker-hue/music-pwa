"use client";

import React, { createContext, useContext } from 'react';
import { useMusicPlayer as useMusicPlayerHook } from '@/hooks/useMusicPlayer';

type PlayerContextType = ReturnType<typeof useMusicPlayerHook>;

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const player = useMusicPlayerHook();

  return (
    <PlayerContext.Provider value={player}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
}