"use client";

import React, { useState } from 'react';
import { usePlayerContext } from '@/context/PlayerContext';

export default function MainContent() {
  const { playTrack } = usePlayerContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.results) {
        setSearchResults(data.results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="flex-1 bg-gradient-to-b from-neutral-800 to-[#121212] overflow-y-auto">
      <header className="sticky top-0 bg-neutral-900/80 backdrop-blur-md p-4 flex justify-between items-center z-10">
        <div className="flex gap-2">
          <button className="bg-black/50 rounded-full w-8 h-8 flex items-center justify-center text-white cursor-not-allowed hidden sm:flex">
            &lt;
          </button>
          <button className="bg-black/50 rounded-full w-8 h-8 flex items-center justify-center text-white cursor-not-allowed hidden sm:flex">
            &gt;
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#242424] text-white px-6 py-3 rounded-full outline-none focus:ring-2 focus:ring-white transition"
          />
        </form>

        <div>
          <button className="bg-white text-black font-semibold rounded-full py-2 px-6 hover:scale-105 transition">
            Explore
          </button>
        </div>
      </header>

      <div className="p-6">
        {searchResults.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
            <div className="space-y-4">
              {searchResults.map((track) => (
                <div
                  key={track.id}
                  onClick={() => playTrack({
                    title: track.name,
                    artist: track.artist,
                    albumArt: track.thumbnails?.[0]?.url,
                    ytmusicId: track.id
                  })}
                  className="bg-white/5 hover:bg-white/20 transition p-4 flex items-center gap-4 rounded-md cursor-pointer group"
                >
                  {track.thumbnails?.[0]?.url ? (
                    <img src={track.thumbnails[0].url} alt={track.name} className="w-12 h-12 rounded object-cover shadow-lg" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-700 rounded shadow-lg flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate group-hover:underline">{track.name}</h3>
                    <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {Math.floor(track.durationMs / 60000)}:
                    {Math.floor((track.durationMs % 60000) / 1000).toString().padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-white mb-6">Good evening</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/10 hover:bg-white/20 transition flex items-center rounded overflow-hidden cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0" />
                  <span className="text-white font-semibold px-4">Liked Songs</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">Made for you</h2>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-[#181818] hover:bg-[#282828] transition p-4 rounded-md w-48 flex-shrink-0 cursor-pointer">
                  <div className="w-full aspect-square bg-gray-700 mb-4 rounded shadow-lg" />
                  <h3 className="text-white font-semibold mb-1 truncate">Daily Mix {i}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">Spotify • Endless music tailored for you</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}