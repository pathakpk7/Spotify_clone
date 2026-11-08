import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Youtube, CheckCircle2, Plus, ExternalLink, Music2 } from 'lucide-react';
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
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeTitle, setYoutubeTitle] = useState('');
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
      setStatusMsg(`Added "${track.title}" from YouTube Music!`);
      setTimeout(() => setStatusMsg(null), 3000);
    } else {
      setStatusMsg('Invalid YouTube URL or ID. Try format https://youtu.be/... or watch?v=...');
      setTimeout(() => setStatusMsg(null), 3500);
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
                <h3 className="font-display font-bold text-lg text-white">Streaming Bridge</h3>
                <p className="text-xs font-mono text-zinc-400">Import Real Spotify & YouTube Audio Streams</p>
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
                <Music2 size={14} />
                Spotify URL Import
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
                YouTube Music Stream
              </button>
            </div>

            {/* Spotify Tab */}
            {activeTab === 'spotify' && (
              <form onSubmit={handleAddSpotifyTrack} className="space-y-4">
                <div className="p-4 bg-black/40 border border-white/10 rounded-md">
                  <label className="block text-xs font-mono text-zinc-300 mb-2">
                    Paste Any Spotify Track / Album / Playlist Link:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={spotifyUrl}
                      onChange={(e) => setSpotifyUrl(e.target.value)}
                      placeholder="https://open.spotify.com/track/..."
                      className="flex-grow bg-black/60 border border-white/15 rounded px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-signal-green"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <Plus size={14} />
                      {isLoading ? 'Fetching...' : 'Import'}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/5 rounded text-xs text-zinc-400 leading-relaxed font-body">
                  Paste any public Spotify song link. Pulse automatically pulls the real metadata, album art, and integrates the audio stream.
                </div>
              </form>
            )}

            {/* YouTube Tab */}
            {activeTab === 'youtube' && (
              <form onSubmit={handleAddYoutubeLink} className="space-y-4">
                <div className="p-4 bg-black/40 border border-white/10 rounded-md space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1">
                      Paste YouTube or YouTube Music URL:
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
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50"
                      >
                        <Plus size={14} />
                        {isLoading ? 'Fetching...' : 'Add Track'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={youtubeTitle}
                      onChange={(e) => setYoutubeTitle(e.target.value)}
                      placeholder="Custom Display Title (Optional)"
                      className="w-full bg-black/60 border border-white/10 rounded px-3 py-1.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/5 rounded text-xs text-zinc-400 leading-relaxed font-body">
                  Input any YouTube or YouTube Music track link. Pulse queries YouTube's real metadata and streams real audio with waveform visualizers.
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
