import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Search, 
  Library, 
  Plus, 
  UploadCloud, 
  Radio, 
  FolderPlus,
  Activity,
  Flame,
  Moon,
  Sparkles,
  Music2,
  X,
  Compass,
  Link2
} from 'lucide-react';
import { Playlist, ServiceConnection, StreamChannel } from '../../types/music';
import { STREAM_CHANNELS } from '../../data/streamCatalog';

interface SidebarProps {
  channels?: StreamChannel[];
  activeView: string;
  setActiveView: (view: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  playlists: Playlist[];
  activePlaylistId: string | null;
  onSelectPlaylist: (id: string | null) => void;
  onCreatePlaylist: (name: string) => void;
  onOpenUpload: () => void;
  onOpenIntegrations: () => void;
  connections: ServiceConnection;
  activeStationId: string | null;
  onSelectStation: (stationId: string | null) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  channels = STREAM_CHANNELS,
  activeView,
  setActiveView,
  searchQuery,
  setSearchQuery,
  playlists,
  activePlaylistId,
  onSelectPlaylist,
  onCreatePlaylist,
  onOpenUpload,
  onOpenIntegrations,
  connections,
  activeStationId,
  onSelectStation,
  isMobileOpen = false,
  onMobileClose
}) => {
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      onCreatePlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setIsCreatingPlaylist(false);
    }
  };

  const getStationIcon = (channel: StreamChannel) => {
    if (channel.channelType === 'spotify' || channel.id.startsWith('spotify-')) {
      return <Music2 size={15} className="text-signal-green shrink-0" />;
    }
    switch (channel.id) {
      case 'highway-radio': return <Flame size={15} className="text-amber-400 shrink-0" />;
      case 'lofi-ambient': return <Moon size={15} className="text-blue-400 shrink-0" />;
      case 'synthwave-night': return <Sparkles size={15} className="text-pink-400 shrink-0" />;
      default: return <Radio size={15} className="text-signal-green shrink-0" />;
    }
  };

  const renderContent = () => (
    <div className="flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-black/60 border border-signal-green/30 flex items-center justify-center text-signal-green shadow-[0_0_15px_rgba(0,229,117,0.15)]">
            <Activity size={20} className="animate-pulse" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl tracking-tight text-white leading-none">
              Pulse
            </h1>
            <span className="font-mono text-[10px] text-zinc-400 tracking-wider uppercase block mt-1">
              Hi-Fi Audio Station
            </span>
          </div>
        </div>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Quick Search Input */}
      <div className="relative mb-6">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tracks, streams..."
          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 pl-9 pr-8 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-signal-green/70 transition-colors"
        />
        {searchQuery ? (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
          >
            <X size={13} />
          </button>
        ) : (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-zinc-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
            /
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-1 scrollbar-thin scrollbar-thumb-white/10">
        {/* Primary Navigation */}
        <nav className="space-y-1">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 px-3 mb-2">
            Navigation
          </span>

          <button
            onClick={() => {
              setActiveView('feed');
              onSelectPlaylist(null);
              onSelectStation(null);
              onMobileClose?.();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'feed' && activePlaylistId === null && activeStationId === null
                ? 'bg-signal-green/10 text-signal-green border border-signal-green/20 font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass size={17} className={activeView === 'feed' && activePlaylistId === null && activeStationId === null ? 'text-signal-green' : 'text-zinc-500'} />
            <span>Discover Streams</span>
          </button>

          <button
            onClick={() => {
              setActiveView('library');
              onSelectPlaylist(null);
              onSelectStation(null);
              onMobileClose?.();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'library' && activePlaylistId === null && activeStationId === null
                ? 'bg-signal-green/10 text-signal-green border border-signal-green/20 font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Library size={17} className={activeView === 'library' ? 'text-signal-green' : 'text-zinc-500'} />
            <span>Your Library</span>
          </button>
        </nav>

        {/* Live Radio Stations */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              Live Stations
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
              <span className="font-mono text-[9px] text-signal-green uppercase">Live</span>
            </div>
          </div>

          <div className="space-y-1">
            {channels.map((ch) => {
              const isSelected = activeStationId === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveView('station');
                    onSelectStation(ch.id);
                    onSelectPlaylist(null);
                    onMobileClose?.();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                    isSelected
                      ? 'bg-signal-green text-black font-bold shadow-[0_0_12px_rgba(0,229,117,0.25)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {getStationIcon(ch)}
                    <span className="truncate">{ch.name}</span>
                  </div>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-black/20 text-black font-semibold' : 'text-zinc-500 bg-white/5'
                  }`}>
                    {ch.tracks.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stream & Media Sources */}
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 px-3 mb-2">
            Audio Sources
          </span>

          <div className="space-y-2">
            <button
              onClick={() => {
                onOpenIntegrations();
                onMobileClose?.();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs bg-black/40 hover:bg-white/5 border border-white/10 hover:border-signal-green/40 transition-all text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-signal-green/10 text-signal-green flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Link2 size={14} />
                </div>
                <div>
                  <div className="text-white font-medium text-xs">Import Spotify / YouTube</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Any track or playlist URL</div>
                </div>
              </div>
              <Plus size={14} className="text-zinc-500 group-hover:text-signal-green transition-colors" />
            </button>

            <button
              onClick={() => {
                onOpenUpload();
                onMobileClose?.();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs bg-black/40 hover:bg-white/5 border border-white/10 hover:border-blue-400/40 transition-all text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <UploadCloud size={14} />
                </div>
                <div>
                  <div className="text-white font-medium text-xs">Upload Audio Files</div>
                  <div className="text-[10px] text-zinc-500 font-mono">MP3, WAV, FLAC, M4A</div>
                </div>
              </div>
              <Plus size={14} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
            </button>
          </div>
        </div>

        {/* Playlists Management */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              Playlists
            </span>
            <button
              onClick={() => setIsCreatingPlaylist(!isCreatingPlaylist)}
              className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-signal-green hover:bg-white/5 transition-colors"
              title="Create Playlist"
              aria-label="Create Playlist"
            >
              <FolderPlus size={14} />
            </button>
          </div>

          {isCreatingPlaylist && (
            <form onSubmit={handleCreateSubmit} className="px-1 mb-3">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="Playlist name..."
                  className="w-full bg-black/70 border border-signal-green/60 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-signal-green text-black font-semibold rounded text-[10px] font-mono"
                >
                  Save
                </button>
              </div>
            </form>
          )}

          <div className="space-y-1">
            {playlists.length === 0 ? (
              <p className="px-3 py-2 text-[11px] text-zinc-600 font-mono">
                No playlists yet. Tap + to add.
              </p>
            ) : (
              playlists.map((pl) => {
                const isSelected = activePlaylistId === pl.id;
                return (
                  <button
                    key={pl.id}
                    onClick={() => {
                      setActiveView('playlist');
                      onSelectPlaylist(pl.id);
                      onSelectStation(null);
                      onMobileClose?.();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                      isSelected
                        ? 'bg-signal-green text-black font-bold shadow-[0_0_12px_rgba(0,229,117,0.25)]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black' : 'bg-signal-green'}`}></span>
                      <span className="truncate">{pl.name}</span>
                    </span>
                    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-black/20 text-black font-semibold' : 'text-zinc-500 bg-white/5'
                    }`}>
                      {pl.trackIds.length}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-72 bg-[#0c0e12] border-r border-white/10 h-screen sticky top-0 shrink-0 p-5 overflow-hidden z-30">
        {renderContent()}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-80 max-w-[85vw] bg-[#0c0e12] border-r border-white/10 h-full p-5 flex flex-col z-10 overflow-hidden shadow-2xl"
            >
              {renderContent()}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
