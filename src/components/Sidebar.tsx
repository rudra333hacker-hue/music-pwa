import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black flex-shrink-0 flex-col hidden md:flex">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-8">Spotify Clone</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center text-gray-300 hover:text-white transition">
            <span className="font-semibold">Home</span>
          </a>
          <a href="#" className="flex items-center text-gray-300 hover:text-white transition">
            <span className="font-semibold">Search</span>
          </a>
          <a href="#" className="flex items-center text-gray-300 hover:text-white transition">
            <span className="font-semibold">Your Library</span>
          </a>
        </nav>
      </div>

      <div className="mt-4 px-6">
        <nav className="space-y-4">
          <a href="#" className="flex items-center text-gray-300 hover:text-white transition">
            <span className="font-semibold">Create Playlist</span>
          </a>
          <a href="#" className="flex items-center text-gray-300 hover:text-white transition">
            <span className="font-semibold">Liked Songs</span>
          </a>
        </nav>
      </div>
    </aside>
  );
}