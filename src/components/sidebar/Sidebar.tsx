import React, { useState } from 'react';
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
  Music2
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
  onOpenPortal
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

  return (
    <aside className="w-72 bg-[#111317] border-r border-white/10 flex flex-col h-screen sticky top-0 shrink-0 p-6 overflow-y-auto scrollbar-none z-30">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8">
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
          onClick={() => { setActiveView('feed'); onSelectPlaylist(null); onSelectStation(null); }}
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
          onClick={() => { setActiveView('library'); onSelectPlaylist(null); onSelectStation(null); }}
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
            onClick={onOpenPortal}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Sparkles size={16} className="text-white" />
            <span>3D Spatial Portal</span>
          </button>
        )}
      </nav>

      {/* Spotify Connected Playlists */}
      {channels.filter((c) => c.channelType === 'spotify' || c.id.startsWith('spotify-')).length > 0 && (
        <div className="space-y-1 mb-6">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-signal-green px-3 mb-2 flex items-center gap-1.5">
            <Music2 size={11} />
            Spotify Playlists
          </span>
          {channels
            .filter((c) => c.channelType === 'spotify' || c.id.startsWith('spotify-'))
            .map((channel) => {
              const isSelected = activeStationId === channel.id;
              return (
                <button
                  key={channel.id}
                  onClick={() => {
                    onSelectStation(channel.id);
                    onSelectPlaylist(null);
                    setActiveView('station');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs transition-all ${
                    isSelected
                      ? 'bg-signal-green text-black font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    {getStationIcon(channel)}
                    <span className="truncate">{channel.name}</span>
                  </span>
                  <span className={`font-mono text-[10px] ${isSelected ? 'text-black/80' : 'text-zinc-600'}`}>
                    {channel.tracks.length}
                  </span>
                </button>
              );
            })}
        </div>
      )}

      {/* Deluxe Salon Style Stations / Themes */}
      <div className="space-y-1 mb-6">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 px-3 mb-2">
          Radio Stations (Method 1)
        </span>
        {channels
          .filter((c) => c.channelType !== 'spotify' && !c.id.startsWith('spotify-'))
          .map((channel) => {
            const isSelected = activeStationId === channel.id;
            return (
              <button
                key={channel.id}
                onClick={() => {
                  onSelectStation(channel.id);
                  onSelectPlaylist(null);
                  setActiveView('station');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs transition-all ${
                  isSelected
                    ? 'bg-signal-green text-black font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  {getStationIcon(channel)}
                  <span className="truncate">{channel.name}</span>
                </span>
                <span className={`font-mono text-[10px] ${isSelected ? 'text-black/80' : 'text-zinc-600'}`}>
                  {channel.tracks.length}
                </span>
              </button>
            );
          })}
      </div>

      {/* Cloud & Import Triggers */}
      <div className="space-y-2 mb-6">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 px-3 mb-2">
          Stream Sources
        </span>

        <button
          onClick={onOpenIntegrations}
          className="w-full flex items-center justify-between px-3 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-all group"
        >
          <span className="flex items-center gap-2">
            <Radio size={14} className="text-red-400 group-hover:scale-110 transition-transform" />
            <span>Add YouTube / Spotify Link</span>
          </span>
          <Plus size={14} className="text-zinc-500" />
        </button>

        <button
          onClick={onOpenUpload}
          className="w-full flex items-center justify-between px-3 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-all group"
        >
          <span className="flex items-center gap-2">
            <UploadCloud size={14} className="text-signal-green group-hover:scale-110 transition-transform" />
            <span>Import Local Files</span>
          </span>
          <Plus size={14} className="text-zinc-500" />
        </button>
      </div>

      {/* Playlists Management */}
      <div className="flex-grow flex flex-col mb-6">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            Playlists
          </span>
          <button
            onClick={() => setIsCreatingPlaylist(!isCreatingPlaylist)}
            className="p-1 text-zinc-400 hover:text-white transition-colors"
            title="Create Playlist"
          >
            <FolderPlus size={14} />
          </button>
        </div>

        {/* Create playlist input */}
        {isCreatingPlaylist && (
          <form onSubmit={handleCreateSubmit} className="px-3 mb-3">
            <input
              type="text"
              autoFocus
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist name..."
              className="w-full bg-black/60 border border-signal-green rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none font-mono"
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

      {/* Hardware Telemetry Badge */}
      <div className="pt-4 border-t border-white/10 flex flex-col gap-1.5 font-mono text-[10px] text-zinc-500">
        <div className="flex justify-between items-center">
          <span>STREAM CDN</span>
          <span className="text-signal-green font-semibold">METHOD 1 ACTIVE</span>
        </div>
        <div className="flex justify-between items-center">
          <span>SERVER OVERHEAD</span>
          <span className="text-zinc-300 font-semibold">0 MB</span>
        </div>
        <div className="flex justify-between items-center">
          <span>LATENCY</span>
          <span className="text-signal-green">Instant Buffer</span>
        </div>
      </div>
    </aside>
  );
};
