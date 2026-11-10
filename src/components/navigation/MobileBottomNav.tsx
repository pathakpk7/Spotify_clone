import React from 'react';
import { Home, Compass, Radio, Library, Search, Menu } from 'lucide-react';

interface MobileBottomNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
  activePlaylistId: string | null;
  onSelectPlaylist: (id: string | null) => void;
  activeStationId: string | null;
  onSelectStation: (stationId: string | null) => void;
  onOpenSearch: () => void;
  onOpenSidebar: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeView,
  setActiveView,
  activePlaylistId,
  onSelectPlaylist,
  activeStationId,
  onSelectStation,
  onOpenSearch,
  onOpenSidebar
}) => {
  const isHome = activeView === 'feed' && activePlaylistId === null && activeStationId === null;
  const isLibrary = activeView === 'library' && activePlaylistId === null && activeStationId === null;
  const isStation = activeStationId !== null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#0a0c10]/95 backdrop-blur-2xl border-t border-white/10 z-40 flex items-center justify-around px-2 select-none">
      {/* 1. Discover / Home */}
      <button
        onClick={() => {
          setActiveView('feed');
          onSelectPlaylist(null);
          onSelectStation(null);
        }}
        className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors ${
          isHome ? 'text-signal-green' : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Compass size={18} />
        <span className="text-[10px] font-mono mt-1 font-medium">Discover</span>
      </button>

      {/* 2. Stations / Radio */}
      <button
        onClick={() => {
          onOpenSidebar();
        }}
        className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors ${
          isStation ? 'text-signal-green' : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Radio size={18} />
        <span className="text-[10px] font-mono mt-1 font-medium">Radio</span>
      </button>

      {/* 3. Search */}
      <button
        onClick={onOpenSearch}
        className="flex flex-col items-center justify-center flex-1 h-full py-1 text-zinc-400 hover:text-white transition-colors"
      >
        <Search size={18} />
        <span className="text-[10px] font-mono mt-1 font-medium">Search</span>
      </button>

      {/* 4. Library */}
      <button
        onClick={() => {
          setActiveView('library');
          onSelectPlaylist(null);
          onSelectStation(null);
        }}
        className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors ${
          isLibrary ? 'text-signal-green' : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Library size={18} />
        <span className="text-[10px] font-mono mt-1 font-medium">Library</span>
      </button>

      {/* 5. Menu / Channels & More */}
      <button
        onClick={onOpenSidebar}
        className="flex flex-col items-center justify-center flex-1 h-full py-1 text-zinc-400 hover:text-white transition-colors"
      >
        <Menu size={18} />
        <span className="text-[10px] font-mono mt-1 font-medium">Menu</span>
      </button>
    </nav>
  );
};
