import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Search, 
  Compass, 
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
  X
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
  onOpenPortal?: () => void;
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
  onOpenPortal,
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
      return <Music2 size={14} className="text-signal-green shrink-0" />;
    }
    switch (channel.id) {
      case 'highway-radio': return <Flame size={14} className="text-amber-400 shrink-0" />;
      case 'lofi-ambient': return <Moon size={14} className="text-blue-400 shrink-0" />;
      case 'synthwave-night': return <Sparkles size={14} className="text-pink-400 shrink-0" />;
      default: return <Radio size={14} className="text-signal-green shrink-0" />;
    }
  };

  const renderContent = () => (
    <>
      {/* Brand Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-black border border-white/10 flex items-center justify-center text-signal-green shadow-signal">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl tracking-tight text-white leading-none">
              Pulse
            </h1>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              Cloud Stream Engine
            </span>
          </div>
        </div>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="md:hidden w-8 h-8 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
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
          className="w-full bg-black/50 border border-white/10 rounded px-3 pl-9 py-2 text-xs font-body text-white placeholder-zinc-500 focus:outline-none focus:border-signal-green transition-colors"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-zinc-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
          /
        </span>
      </div>

      {/* Primary Navigation */}
      <nav className="space-y-1 mb-6">
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
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold transition-all ${
            activeView === 'feed' && activePlaylistId === null && activeStationId === null
              ? 'bg-white/10 text-white font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Home size={16} className={activeView === 'feed' && activePlaylistId === null && activeStationId === null ? 'text-signal-green' : 'text-zinc-500'} />
          <span>All Streams</span>
        </button>

        <button
          onClick={() => {
            setActiveView('library');
            onSelectPlaylist(null);
            onSelectStation(null);
            onMobileClose?.();
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold transition-all ${
            activeView === 'library' && activePlaylistId === null && activeStationId === null
              ? 'bg-white/10 text-white font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Library size={16} className={activeView === 'library' ? 'text-signal-green' : 'text-zinc-500'} />
          <span>Your Library</span>
        </button>

        {onOpenPortal && (
          <button
            onClick={() => {
              onOpenPortal();
              onMobileClose?.();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Sparkles size={16} className="text-white" />
            <span>3D Spatial Portal</span>
          </button>
        )}
      </nav>

      {/* Cloud Radio Stations (Method 1) */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            Radio Stations (Method 1)
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
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
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs transition-all ${
                  isSelected
                    ? 'bg-signal-green text-black font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {getStationIcon(ch)}
                  <span className="truncate">{ch.name}</span>
                </div>
                <span className={`font-mono text-[10px] ${isSelected ? 'text-black/80' : 'text-zinc-600'}`}>
                  {ch.tracks.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stream Connectors */}
      <div className="mb-6">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 px-3 mb-2">
          Stream Sources
        </span>

        <button
          onClick={() => {
            onOpenIntegrations();
            onMobileClose?.();
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 border border-white/5 transition-all mb-2"
        >
          <div className="flex items-center gap-2">
            <Radio size={14} className={connections.youtube.isConnected ? 'text-signal-green' : 'text-zinc-600'} />
            <span>Add YouTube / Spotify Link</span>
          </div>
          <Plus size={14} className="text-zinc-500" />
        </button>

        <button
          onClick={() => {
            onOpenUpload();
            onMobileClose?.();
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 border border-white/5 transition-all"
        >
          <div className="flex items-center gap-2">
            <UploadCloud size={14} className="text-blue-400" />
            <span>Import Local Audio</span>
          </div>
          <Plus size={14} className="text-zinc-500" />
        </button>
      </div>

      {/* Playlists Management */}
      <div className="flex-grow mb-6">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            Playlists
          </span>
          <button
            onClick={() => setIsCreatingPlaylist(!isCreatingPlaylist)}
            className="text-zinc-400 hover:text-signal-green transition-colors"
            title="Create Playlist"
          >
            <FolderPlus size={14} />
          </button>
        </div>

        {isCreatingPlaylist && (
          <form onSubmit={handleCreateSubmit} className="px-3 mb-3">
            <input
              type="text"
              autoFocus
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist name..."
              className="w-full bg-black/60 border border-signal-green/50 rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
            />
          </form>
        )}

        <div className="space-y-1">
          {playlists.map((pl) => {
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
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs transition-all ${
                  isSelected
                    ? 'bg-signal-green text-black font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black' : 'bg-signal-green'}`}></span>
                  <span className="truncate">{pl.name}</span>
                </span>
                <span className={`font-mono text-[10px] ${isSelected ? 'text-black/80' : 'text-zinc-600'}`}>
                  {pl.trackIds.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-72 bg-[#111317] border-r border-white/10 h-screen sticky top-0 shrink-0 p-6 overflow-y-auto scrollbar-none z-30">
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-80 max-w-[85vw] bg-[#111317] border-r border-white/10 h-full p-6 flex flex-col z-10 overflow-y-auto shadow-2xl"
            >
              {renderContent()}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
