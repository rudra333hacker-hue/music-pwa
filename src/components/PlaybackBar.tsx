"use client";

import React from 'react';
import { usePlayerContext } from '@/context/PlayerContext';

export default function PlaybackBar() {
  const { currentTrack, isPlaying, isLoading, error, play, pause, previousTrack, nextTrack } = usePlayerContext();

  return (
    <footer className="h-24 bg-[#181818] border-t border-neutral-800 flex items-center justify-between px-4 sticky bottom-0 z-50">
      <div className="flex items-center w-1/3 min-w-[180px]">
        {currentTrack ? (
           <>
             {currentTrack.albumArt ? (
               <img src={currentTrack.albumArt} alt="Album Art" className="w-14 h-14 rounded object-cover flex-shrink-0" />
             ) : (
               <div className="w-14 h-14 bg-gray-700 rounded flex-shrink-0" />
             )}
             <div className="ml-4 truncate">
               <div className="text-white text-sm hover:underline cursor-pointer truncate">{currentTrack.title}</div>
               <div className="text-xs text-gray-400 hover:underline cursor-pointer truncate">{currentTrack.artist}</div>
             </div>
             <button className="ml-4 text-gray-400 hover:text-white transition">
               <span className="text-xl">♡</span>
             </button>
           </>
        ) : (
           <div className="flex items-center">
             <div className="w-14 h-14 bg-neutral-800 rounded flex-shrink-0" />
           </div>
        )}
      </div>

      <div className="flex flex-col items-center w-1/3 max-w-[722px]">
        {error && <div className="text-red-500 text-xs mb-1 truncate">{error}</div>}
        <div className="flex items-center gap-6 mb-2">
          <button className="text-gray-400 hover:text-white transition hidden sm:block">⤨</button>
          <button onClick={previousTrack} className="text-gray-400 hover:text-white transition text-xl">⏮</button>

          <button
            onClick={isPlaying ? pause : play}
            disabled={!currentTrack || isLoading}
            className={`bg-white rounded-full w-10 h-10 flex items-center justify-center text-black hover:scale-105 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
               <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : isPlaying ? (
               <span className="text-xl">⏸</span>
            ) : (
               <span className="text-xl ml-1">▶</span>
            )}
          </button>

          <button onClick={nextTrack} className="text-gray-400 hover:text-white transition text-xl">⏭</button>
          <button className="text-gray-400 hover:text-white transition hidden sm:block">↻</button>
        </div>
        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-gray-400">0:00</span>
          <div className="h-1 bg-gray-600 rounded-full w-full group cursor-pointer flex items-center">
            <div className={`h-full bg-white group-hover:bg-[#1DB954] rounded-full relative ${isPlaying ? 'w-1/3' : 'w-0'}`}>
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow"></div>
            </div>
          </div>
          <span className="text-xs text-gray-400">-:--</span>
        </div>
      </div>

      <div className="flex items-center justify-end w-1/3 gap-4 hidden md:flex">
        <button className="text-gray-400 hover:text-white transition">🎤</button>
        <button className="text-gray-400 hover:text-white transition">🎧</button>
        <div className="flex items-center gap-2 w-24 group cursor-pointer">
          <button className="text-gray-400 hover:text-white transition">🔊</button>
          <div className="h-1 bg-gray-600 rounded-full w-full flex items-center">
             <div className="h-full bg-white group-hover:bg-[#1DB954] w-2/3 rounded-full relative">
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow"></div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}