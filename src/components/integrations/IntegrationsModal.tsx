import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Youtube, CheckCircle2, Link as LinkIcon, Plus, ExternalLink } from 'lucide-react';
import { ServiceConnection, Track } from '../../types/music';
import { storageService } from '../../services/storageService';
import { youtubeService } from '../../services/youtubeService';
import { spotifyService } from '../../services/spotifyService';

interface IntegrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  connections: ServiceConnection;
  onConnectionsChange: (conn: ServiceConnection) => void;
  onTrackAdded: (track: Track) => void;
}

export const IntegrationsModal: React.FC<IntegrationsModalProps> = ({
  isOpen,
  onClose,
  connections,
  onConnectionsChange,
  onTrackAdded
}) => {
  const [activeTab, setActiveTab] = useState<'spotify' | 'youtube'>('spotify');
  const [spotifyClientId, setSpotifyClientId] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeTitle, setYoutubeTitle] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleConnectSpotify = () => {
    const res = spotifyService.connectAccount(spotifyClientId);
    const updated: ServiceConnection = {
      ...connections,
      spotify: {
        isConnected: true,
        username: res.username,
        clientId: spotifyClientId || undefined
      }
    };
    storageService.saveConnections(updated);
    onConnectionsChange(updated);

    // Also import curated Spotify tracks into catalog!
    spotifyService.curatedSpotifyTracks.forEach((t) => onTrackAdded(t));

    setStatusMsg('Spotify connected! Synced curated high-res Spotify library.');
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleDisconnectSpotify = () => {
    const updated: ServiceConnection = {
      ...connections,
      spotify: { isConnected: false }
    };
    storageService.saveConnections(updated);
    onConnectionsChange(updated);
  };

  const handleConnectYoutube = () => {
    const updated: ServiceConnection = {
      ...connections,
      youtube: {
        isConnected: true,
        channelName: 'YT Music Streamer'
      }
    };
    storageService.saveConnections(updated);
    onConnectionsChange(updated);

    youtubeService.curatedYoutubeTracks.forEach((t) => onTrackAdded(t));
    setStatusMsg('YouTube Music connected! Stream library added.');
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleAddYoutubeLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl) return;

    const track = youtubeService.createTrackFromLink(youtubeUrl, youtubeTitle);
    if (track) {
      onTrackAdded(track);
      setYoutubeUrl('');
      setYoutubeTitle('');
      setStatusMsg(`Added "${track.title}" from YouTube Music!`);
      setTimeout(() => setStatusMsg(null), 3000);
    } else {
      setStatusMsg('Invalid YouTube URL or ID. Try format https://youtu.be/...');
      setTimeout(() => setStatusMsg(null), 3000);
    }
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
            className="w-full max-w-xl bg-[#111317] border border-white/10 rounded-lg p-6 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Streaming Integrations</h3>
                <p className="text-xs font-mono text-zinc-400">Spotify Web API & YouTube Music Audio Bridge</p>
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
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-medium transition-all ${
                  activeTab === 'spotify'
                    ? 'bg-signal-green text-black font-semibold'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current"></span>
                Spotify Account
                {connections.spotify.isConnected && <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded">Active</span>}
              </button>

              <button
                onClick={() => setActiveTab('youtube')}
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-medium transition-all ${
                  activeTab === 'youtube'
                    ? 'bg-red-500 text-white font-semibold'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Youtube size={14} />
                YouTube Music
                {connections.youtube.isConnected && <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded">Active</span>}
              </button>
            </div>

            {/* Tab 1: Spotify */}
            {activeTab === 'spotify' && (
              <div className="space-y-4">
                <div className="p-4 bg-black/40 border border-white/10 rounded-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-zinc-400">Connection Status:</span>
                    <span className={`text-xs font-mono flex items-center gap-1.5 ${connections.spotify.isConnected ? 'text-signal-green' : 'text-zinc-500'}`}>
                      <span className={`w-2 h-2 rounded-full ${connections.spotify.isConnected ? 'bg-signal-green' : 'bg-zinc-600'}`}></span>
                      {connections.spotify.isConnected ? connections.spotify.username : 'Disconnected'}
                    </span>
                  </div>

                  {connections.spotify.isConnected ? (
                    <button
                      onClick={handleDisconnectSpotify}
                      className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded text-xs font-mono transition-colors"
                    >
                      Disconnect Spotify Session
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">
                          Spotify Client ID (Optional for custom app):
                        </label>
                        <input
                          type="text"
                          value={spotifyClientId}
                          onChange={(e) => setSpotifyClientId(e.target.value)}
                          placeholder="e.g. 7f3a8b92c4e1..."
                          className="w-full bg-black/60 border border-white/15 rounded px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-signal-green"
                        />
                      </div>
                      <button
                        onClick={handleConnectSpotify}
                        className="w-full py-2.5 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-signal"
                      >
                        <ExternalLink size={14} />
                        Connect Spotify Account
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-white/5 border border-white/5 rounded text-xs text-zinc-400 leading-relaxed font-body">
                  Connecting to Spotify syncs curated top-tier electronic, synthwave, and indie tracks directly into your Pulse playback queue, with lossless playback buffers.
                </div>
              </div>
            )}

            {/* Tab 2: YouTube Music */}
            {activeTab === 'youtube' && (
              <div className="space-y-4">
                <div className="p-4 bg-black/40 border border-white/10 rounded-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-zinc-400">YouTube Music Bridge:</span>
                    <span className={`text-xs font-mono flex items-center gap-1.5 ${connections.youtube.isConnected ? 'text-red-400' : 'text-zinc-500'}`}>
                      <span className={`w-2 h-2 rounded-full ${connections.youtube.isConnected ? 'bg-red-500' : 'bg-zinc-600'}`}></span>
                      {connections.youtube.isConnected ? 'Connected Stream' : 'Inactive'}
                    </span>
                  </div>

                  {!connections.youtube.isConnected && (
                    <button
                      onClick={handleConnectYoutube}
                      className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded text-xs font-mono flex items-center justify-center gap-2 mb-4 transition-colors"
                    >
                      <Youtube size={15} />
                      Connect YouTube Music Stream
                    </button>
                  )}

                  <form onSubmit={handleAddYoutubeLink} className="space-y-3 pt-2 border-t border-white/10">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">
                        Paste YouTube Video or Music URL:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=... or ID"
                          className="flex-grow bg-black/60 border border-white/15 rounded px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded text-xs font-mono font-medium text-white flex items-center gap-1.5 transition-colors"
                        >
                          <Plus size={14} />
                          Add Track
                        </button>
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={youtubeTitle}
                        onChange={(e) => setYoutubeTitle(e.target.value)}
                        placeholder="Custom Track Title (Optional)"
                        className="w-full bg-black/60 border border-white/10 rounded px-3 py-1.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </form>
                </div>

                <div className="p-3 bg-white/5 border border-white/5 rounded text-xs text-zinc-400 leading-relaxed font-body">
                  You can paste any YouTube or YouTube Music song link to stream directly through Pulse's audio engine with full equalizer and visualizer support.
                </div>
              </div>
            )}

            {/* Status Feedback */}
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
