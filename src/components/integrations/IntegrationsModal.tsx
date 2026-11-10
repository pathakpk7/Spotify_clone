import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Youtube, CheckCircle2, Plus, Music2, RefreshCw, Key } from 'lucide-react';
import { ServiceConnection, Track, StreamChannel } from '../../types/music';
import { storageService } from '../../services/storageService';
import { youtubeService } from '../../services/youtubeService';
import { spotifyService } from '../../services/spotifyService';

interface IntegrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  connections: ServiceConnection;
  onConnectionsChange: (conn: ServiceConnection) => void;
  onTrackAdded: (track: Track) => void;
  onChannelAdded?: (channel: StreamChannel) => void;
}

export const IntegrationsModal: React.FC<IntegrationsModalProps> = ({
  isOpen,
  onClose,
  connections,
  onConnectionsChange,
  onTrackAdded,
  onChannelAdded
}) => {
  const [activeTab, setActiveTab] = useState<'spotify' | 'youtube' | 'settings'>('spotify');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [spotifyPlaylistUrl, setSpotifyPlaylistUrl] = useState('');
  const [spotifyPlaylistName, setSpotifyPlaylistName] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeTitle, setYoutubeTitle] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [playlistStationName, setPlaylistStationName] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState(connections.youtube?.apiKey || '');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleAddSpotifyTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotifyUrl.trim()) return;

    setIsLoading(true);
    setStatusMsg(null);

    const track = await spotifyService.fetchTrackFromUrl(spotifyUrl.trim());
    setIsLoading(false);

    if (track) {
      onTrackAdded(track);
      setSpotifyUrl('');
      setStatusMsg(`Added "${track.title}" from Spotify!`);
      setTimeout(() => setStatusMsg(null), 3000);
    } else {
      setStatusMsg('Invalid Spotify link. Use format: https://open.spotify.com/track/...');
      setTimeout(() => setStatusMsg(null), 3500);
    }
  };

  const handleImportSpotifyPlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotifyPlaylistUrl.trim()) return;

    setIsLoading(true);
    setStatusMsg('Extracting Spotify playlist & metadata...');

    const channel = await spotifyService.fetchPlaylistDetails(
      spotifyPlaylistUrl.trim(),
      spotifyPlaylistName.trim() || undefined
    );
    setIsLoading(false);

    if (channel) {
      if (onChannelAdded) {
        onChannelAdded(channel);
      }
      storageService.saveCustomChannel(channel);
      setSpotifyPlaylistUrl('');
      setSpotifyPlaylistName('');
      setStatusMsg(`Connected Spotify Playlist "${channel.name}"!`);
      setTimeout(() => setStatusMsg(null), 4000);
    } else {
      setStatusMsg('Could not fetch Spotify playlist. Ensure the link or playlist ID is valid.');
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  const handleAddYoutubeLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl.trim()) return;

    setIsLoading(true);
    setStatusMsg(null);

    const track = await youtubeService.fetchTrackFromLink(youtubeUrl.trim(), youtubeTitle.trim());
    setIsLoading(false);

    if (track) {
      onTrackAdded(track);
      setYoutubeUrl('');
      setYoutubeTitle('');
      setStatusMsg(`Added "${track.title}" from YouTube!`);
      setTimeout(() => setStatusMsg(null), 3000);
    } else {
      setStatusMsg('Invalid YouTube URL or ID. Try format https://youtu.be/... or watch?v=...');
      setTimeout(() => setStatusMsg(null), 3500);
    }
  };

  const handleImportPlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playlistUrl.trim()) return;

    setIsLoading(true);
    setStatusMsg('Extracting playlist tracks from YouTube live...');

    const res = await youtubeService.fetchPlaylistDetails(playlistUrl.trim());
    setIsLoading(false);

    if (res && res.tracks.length > 0) {
      const channel: StreamChannel = {
        id: `channel-${res.playlistId}`,
        name: playlistStationName.trim() || res.title,
        description: `Live synced playlist (${res.tracks.length} tracks)`,
        playlistId: res.playlistId,
        channelType: 'youtube',
        tracks: res.tracks,
        lastSynced: Date.now()
      };

      if (onChannelAdded) {
        onChannelAdded(channel);
      }
      storageService.saveCustomChannel(channel);
      setPlaylistUrl('');
      setPlaylistStationName('');
      setStatusMsg(`Imported "${channel.name}" with ${res.tracks.length} tracks!`);
      setTimeout(() => setStatusMsg(null), 4000);
    } else {
      setStatusMsg('Could not fetch playlist. Verify the playlist is Public or Unlisted.');
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ServiceConnection = {
      ...connections,
      youtube: {
        ...connections.youtube,
        isConnected: Boolean(apiKeyInput.trim()),
        apiKey: apiKeyInput.trim()
      }
    };
    onConnectionsChange(updated);
    storageService.saveConnections(updated);
    setStatusMsg('YouTube Data API key saved successfully!');
    setTimeout(() => setStatusMsg(null), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl bg-[#111317] border border-white/10 rounded-lg p-4 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Streaming & Playlist Bridges</h3>
                <p className="text-xs font-mono text-zinc-400">Directly Access Spotify & YouTube Playlists</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Service Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
              <button
                onClick={() => setActiveTab('spotify')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                  activeTab === 'spotify'
                    ? 'bg-signal-green text-black font-semibold'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Music2 size={14} />
                Spotify Playlist / Track
              </button>

              <button
                onClick={() => setActiveTab('youtube')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                  activeTab === 'youtube'
                    ? 'bg-red-600 text-white font-semibold'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Youtube size={14} />
                YouTube Playlist / Track
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                  activeTab === 'settings'
                    ? 'bg-zinc-700 text-white font-semibold'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Key size={14} />
                API Keys
              </button>
            </div>

            {/* Spotify Tab */}
            {activeTab === 'spotify' && (
              <div className="space-y-6">
                {/* 1. Import Full Spotify Playlist */}
                <form onSubmit={handleImportSpotifyPlaylist} className="p-4 bg-black/40 border border-white/10 rounded-md space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-signal-green font-semibold flex items-center gap-1.5">
                      <Music2 size={13} />
                      Import & Direct-Access Spotify Playlist:
                    </label>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Native Embed + Audio</span>
                  </div>

                  <input
                    type="text"
                    value={spotifyPlaylistUrl}
                    onChange={(e) => setSpotifyPlaylistUrl(e.target.value)}
                    placeholder="https://open.spotify.com/playlist/... or spotify:playlist:..."
                    className="w-full bg-black/60 border border-white/15 rounded px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-signal-green"
                  />

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={spotifyPlaylistName}
                      onChange={(e) => setSpotifyPlaylistName(e.target.value)}
                      placeholder="Custom Station Name (Optional)"
                      className="flex-grow bg-black/60 border border-white/10 rounded px-3 py-1.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-1.5 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0"
                    >
                      <Plus size={14} />
                      {isLoading ? 'Connecting...' : 'Add Spotify Station'}
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-400 font-body leading-normal">
                    Paste your Spotify playlist URL. Pulse pulls the playlist metadata, artwork, and tracks, and embeds the interactive official Spotify player for seamless direct listening.
                  </p>
                </form>

                {/* 2. Import Single Spotify Track */}
                <form onSubmit={handleAddSpotifyTrack} className="p-4 bg-black/20 border border-white/10 rounded-md space-y-3">
                  <label className="block text-xs font-mono text-zinc-300 font-semibold">
                    Or Import Single Spotify Track Link:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={spotifyUrl}
                      onChange={(e) => setSpotifyUrl(e.target.value)}
                      placeholder="https://open.spotify.com/track/..."
                      className="flex-grow bg-black/60 border border-white/15 rounded px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-signal-green"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <Plus size={14} />
                      Import Track
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* YouTube Tab */}
            {activeTab === 'youtube' && (
              <div className="space-y-6">
                {/* 1. Import Full Playlist */}
                <form onSubmit={handleImportPlaylist} className="p-4 bg-black/40 border border-white/10 rounded-md space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-1.5">
                      <RefreshCw size={12} className="text-red-400" />
                      Import & Sync Full YouTube Playlist:
                    </label>
                    <span className="text-[10px] font-mono text-signal-green uppercase">Method 1 CDN</span>
                  </div>

                  <input
                    type="text"
                    value={playlistUrl}
                    onChange={(e) => setPlaylistUrl(e.target.value)}
                    placeholder="https://youtube.com/playlist?list=PL..."
                    className="w-full bg-black/60 border border-white/15 rounded px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
                  />

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={playlistStationName}
                      onChange={(e) => setPlaylistStationName(e.target.value)}
                      placeholder="Custom Station Name (e.g. Punjabi Vibes)"
                      className="flex-grow bg-black/60 border border-white/10 rounded px-3 py-1.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0"
                    >
                      <Plus size={14} />
                      {isLoading ? 'Syncing...' : 'Add Station'}
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-500 font-body leading-normal">
                    Paste any YouTube playlist link. The station becomes permanently playable and supports one-click live updating whenever you add songs to it on YouTube.
                  </p>
                </form>

                {/* 2. Import Single Song */}
                <form onSubmit={handleAddYoutubeLink} className="p-4 bg-black/20 border border-white/10 rounded-md space-y-3">
                  <label className="block text-xs font-mono text-zinc-300 font-semibold">
                    Or Import Single YouTube Track:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=... or youtu.be/..."
                      className="flex-grow bg-black/60 border border-white/15 rounded px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <Plus size={14} />
                      Add Track
                    </button>
                  </div>
                  <input
                    type="text"
                    value={youtubeTitle}
                    onChange={(e) => setYoutubeTitle(e.target.value)}
                    placeholder="Custom Track Title (Optional)"
                    className="w-full bg-black/60 border border-white/10 rounded px-3 py-1.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                  />
                </form>
              </div>
            )}

            {/* Settings / API Key Tab */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveApiKey} className="space-y-4">
                <div className="p-4 bg-black/40 border border-white/10 rounded-md space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1 font-semibold">
                      Google / YouTube Data API v3 Key (Optional):
                    </label>
                    <p className="text-[11px] text-zinc-400 mb-2 font-body leading-relaxed">
                      By default, Pulse uses automatic public CORS proxies. Adding a free YouTube API key allows 100% direct, high-speed syncing without any rate limits.
                    </p>
                    <input
                      type="text"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full bg-black/60 border border-white/15 rounded px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-signal-green"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    Save API Key
                  </button>
                </div>
              </form>
            )}

            {/* Status Message */}
            {statusMsg && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-white/10 border border-white/20 rounded flex items-center gap-2 text-xs font-mono text-white"
              >
                <CheckCircle2 size={16} className="text-signal-green shrink-0" />
                <span>{statusMsg}</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
