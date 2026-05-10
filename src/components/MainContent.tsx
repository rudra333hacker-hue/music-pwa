import React from 'react';

export default function MainContent() {
  return (
    <main className="flex-1 bg-gradient-to-b from-neutral-800 to-[#121212] overflow-y-auto">
      <header className="sticky top-0 bg-neutral-900/80 backdrop-blur-md p-4 flex justify-between items-center z-10">
        <div className="flex gap-2">
          <button className="bg-black/50 rounded-full w-8 h-8 flex items-center justify-center text-white cursor-not-allowed">
            &lt;
          </button>
          <button className="bg-black/50 rounded-full w-8 h-8 flex items-center justify-center text-white cursor-not-allowed">
            &gt;
          </button>
        </div>
        <div>
          <button className="bg-white text-black font-semibold rounded-full py-2 px-6 hover:scale-105 transition">
            Explore Premium
          </button>
        </div>
      </header>

      <div className="p-6">
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
      </div>
    </main>
  );
}