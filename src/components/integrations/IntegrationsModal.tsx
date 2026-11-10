import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Youtube, 
  CheckCircle2, 
  Plus, 
  Music2, 
  Key, 
  Clipboard, 
  Sparkles, 
  Radio, 
  AlertCircle,
  ExternalLink,
  Loader2
} from 'lucide-react';
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

type TabType = 'smart' | 'spotify' | 'youtube' | 'settings';

interface DetectedLink {
  source: 'spotify' | 'youtube' | null;
  type: 'playlist' | 'track' | 'search' | null;
  id: string | null;
  label: string;
}

export const IntegrationsModal: React.FC<IntegrationsModalProps> = ({
  isOpen,
  onClose,
  connections,
  onConnectionsChange,
  onTrackAdded,
  onChannelAdded
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('smart');
  
  // Smart Import state
  const [smartUrl, setSmartUrl] = useState('');
  const [customName, setCustomName] = useState('');
  const [detected, setDetected] = useState<DetectedLink>({ source: null, type: null, id: null, label: '' });

  // Dedicated Spotify tab state
  const [spotifyPlaylistUrl, setSpotifyPlaylistUrl] = useState('');
  const [spotifyPlaylistName, setSpotifyPlaylistName] = useState('');
  const [spotifyTrackUrl, setSpotifyTrackUrl] = useState('');

  // Dedicated YouTube tab state
  const [ytPlaylistUrl, setYtPlaylistUrl] = useState('');
  const [ytPlaylistName, setYtPlaylistName] = useState('');
  const [ytTrackUrl, setYtTrackUrl] = useState('');
  const [ytTrackTitle, setYtTrackTitle] = useState('');

  // Settings
  const [apiKeyInput, setApiKeyInput] = useState(connections.youtube?.apiKey || '');

  // Loading & status
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // Auto-detect link as user types or pastes
  useEffect(() => {
    const raw = smartUrl.trim();
    if (!raw) {
      setDetected({ source: null, type: null, id: null, label: '' });
      return;
    }

    // Check Spotify
    const spotifyParsed = spotifyService.parseSpotifyUrl(raw);
    if (spotifyParsed.type && spotifyParsed.id) {
      setDetected({
        source: 'spotify',
        type: spotifyParsed.type === 'track' ? 'track' : 'playlist',
        id: spotifyParsed.id,
        label: spotifyParsed.type === 'track' ? 'Spotify Single Track' : `Spotify ${spotifyParsed.type === 'album' ? 'Album' : 'Playlist'}`
      });
      return;
    }

    // Check YouTube playlist
    const ytListId = youtubeService.extractPlaylistId(raw);
    if (ytListId) {
      setDetected({
        source: 'youtube',
        type: 'playlist',
        id: ytListId,
        label: 'YouTube Live Sync Playlist'
      });
      return;
    }

    // Check YouTube track
    const ytVideoId = youtubeService.extractVideoId(raw);
    if (ytVideoId) {
      setDetected({
        source: 'youtube',
        type: 'track',
        id: ytVideoId,
        label: 'YouTube Audio Track'
      });
      return;
    }

    // Generic search query
    if (raw.length > 3) {
      setDetected({
        source: 'youtube',
        type: 'search',
        id: null,
        label: 'YouTube Search & Stream'
      });
    } else {
      setDetected({ source: null, type: null, id: null, label: '' });
    }
  }, [smartUrl]);

  // Handle clipboard paste
  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setSmartUrl(text.trim());
          setStatusMsg({ text: 'Link pasted from clipboard!' });
          setTimeout(() => setStatusMsg(null), 2000);
        }
      }
    } catch {
      setStatusMsg({ text: 'Tap the input box and paste directly', isError: true });
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  // Smart unified import handler
  const handleSmartImport = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = smartUrl.trim();
    if (!raw) return;

    setIsLoading(true);
    setStatusMsg(null);

    try {
      // 1. Spotify playlist / album
      if (detected.source === 'spotify' && detected.type === 'playlist') {
        setStatusMsg({ text: 'Extracting Spotify playlist & metadata...' });
        const channel = await spotifyService.fetchPlaylistDetails(raw, customName.trim() || undefined);
        setIsLoading(false);

        if (channel) {
          onChannelAdded?.(channel);
          storageService.saveCustomChannel(channel);
          setSmartUrl('');
          setCustomName('');
          setStatusMsg({ text: `Connected Spotify Playlist: "${channel.name}"!` });
          setTimeout(() => setStatusMsg(null), 4000);
          return;
        }
        setStatusMsg({ text: 'Could not fetch Spotify playlist. Verify the playlist is public.', isError: true });
        setTimeout(() => setStatusMsg(null), 4000);
        return;
      }

      // 2. Spotify single track
      if (detected.source === 'spotify' && detected.type === 'track') {
        setStatusMsg({ text: 'Resolving Spotify track...' });
        const track = await spotifyService.fetchTrackFromUrl(raw);
        setIsLoading(false);

        if (track) {
          if (customName.trim()) track.title = customName.trim();
          onTrackAdded(track);
          setSmartUrl('');
          setCustomName('');
          setStatusMsg({ text: `Added "${track.title}" from Spotify!` });
          setTimeout(() => setStatusMsg(null), 3500);
          return;
        }
        setStatusMsg({ text: 'Invalid Spotify track link.', isError: true });
        setTimeout(() => setStatusMsg(null), 3500);
        return;
      }

      // 3. YouTube playlist
      if (detected.source === 'youtube' && detected.type === 'playlist') {
        setStatusMsg({ text: 'Syncing YouTube playlist tracks...' });
        const res = await youtubeService.fetchPlaylistDetails(raw);
        setIsLoading(false);

        if (res && res.tracks.length > 0) {
          const channel: StreamChannel = {
            id: `channel-${res.playlistId}`,
            name: customName.trim() || res.title,
            description: `Live synced playlist (${res.tracks.length} tracks)`,
            playlistId: res.playlistId,
            channelType: 'youtube',
            tracks: res.tracks,
            lastSynced: Date.now()
          };

          onChannelAdded?.(channel);
          storageService.saveCustomChannel(channel);
          setSmartUrl('');
          setCustomName('');
          setStatusMsg({ text: `Imported "${channel.name}" with ${res.tracks.length} tracks!` });
          setTimeout(() => setStatusMsg(null), 4000);
          return;
        }
        setStatusMsg({ text: 'Could not fetch playlist. Verify the playlist is Public or Unlisted.', isError: true });
        setTimeout(() => setStatusMsg(null), 4000);
        return;
      }

      // 4. YouTube single track or search
      if (detected.source === 'youtube' || detected.type === 'track' || detected.type === 'search') {
        setStatusMsg({ text: 'Connecting audio stream...' });
        const track = await youtubeService.fetchTrackFromLink(raw, customName.trim());
        setIsLoading(false);

        if (track) {
          onTrackAdded(track);
          setSmartUrl('');
          setCustomName('');
          setStatusMsg({ text: `Added "${track.title}" to audio queue!` });
          setTimeout(() => setStatusMsg(null), 3500);
          return;
        }
        setStatusMsg({ text: 'Invalid YouTube link or ID. Try format https://youtu.be/...', isError: true });
        setTimeout(() => setStatusMsg(null), 3500);
        return;
      }

      setIsLoading(false);
      setStatusMsg({ text: 'Unrecognized URL. Please paste a valid YouTube or Spotify link.', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch {
      setIsLoading(false);
      setStatusMsg({ text: 'An error occurred while importing. Please try again.', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  // Dedicated Spotify Playlist handler
  const handleImportSpotifyPlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotifyPlaylistUrl.trim()) return;

    setIsLoading(true);
    setStatusMsg({ text: 'Extracting Spotify playlist...' });

    const channel = await spotifyService.fetchPlaylistDetails(
      spotifyPlaylistUrl.trim(),
      spotifyPlaylistName.trim() || undefined
    );
    setIsLoading(false);

    if (channel) {
      onChannelAdded?.(channel);
      storageService.saveCustomChannel(channel);
      setSpotifyPlaylistUrl('');
      setSpotifyPlaylistName('');
      setStatusMsg({ text: `Connected Spotify Playlist "${channel.name}"!` });
      setTimeout(() => setStatusMsg(null), 4000);
    } else {
      setStatusMsg({ text: 'Could not fetch Spotify playlist. Ensure link is public.', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  // Dedicated Spotify Track handler
  const handleAddSpotifyTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotifyTrackUrl.trim()) return;

    setIsLoading(true);
    setStatusMsg(null);

    const track = await spotifyService.fetchTrackFromUrl(spotifyTrackUrl.trim());
    setIsLoading(false);

    if (track) {
      onTrackAdded(track);
      setSpotifyTrackUrl('');
      setStatusMsg({ text: `Added "${track.title}" from Spotify!` });
      setTimeout(() => setStatusMsg(null), 3000);
    } else {
      setStatusMsg({ text: 'Invalid Spotify track link.', isError: true });
      setTimeout(() => setStatusMsg(null), 3500);
    }
  };

  // Dedicated YouTube Playlist handler
  const handleImportYtPlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ytPlaylistUrl.trim()) return;

    setIsLoading(true);
    setStatusMsg({ text: 'Syncing playlist from YouTube...' });

    const res = await youtubeService.fetchPlaylistDetails(ytPlaylistUrl.trim());
    setIsLoading(false);

    if (res && res.tracks.length > 0) {
      const channel: StreamChannel = {
        id: `channel-${res.playlistId}`,
        name: ytPlaylistName.trim() || res.title,
        description: `Live synced playlist (${res.tracks.length} tracks)`,
        playlistId: res.playlistId,
        channelType: 'youtube',
        tracks: res.tracks,
        lastSynced: Date.now()
      };

      onChannelAdded?.(channel);
      storageService.saveCustomChannel(channel);
      setYtPlaylistUrl('');
      setYtPlaylistName('');
      setStatusMsg({ text: `Imported "${channel.name}" with ${res.tracks.length} tracks!` });
      setTimeout(() => setStatusMsg(null), 4000);
    } else {
      setStatusMsg({ text: 'Could not fetch YouTube playlist. Verify link is public/unlisted.', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  // Dedicated YouTube Track handler
  const handleAddYtTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ytTrackUrl.trim()) return;

    setIsLoading(true);
    setStatusMsg(null);

    const track = await youtubeService.fetchTrackFromLink(ytTrackUrl.trim(), ytTrackTitle.trim());
    setIsLoading(false);

    if (track) {
      onTrackAdded(track);
      setYtTrackUrl('');
      setYtTrackTitle('');
      setStatusMsg({ text: `Added "${track.title}" from YouTube!` });
      setTimeout(() => setStatusMsg(null), 3000);
    } else {
      setStatusMsg({ text: 'Invalid YouTube URL or ID.', isError: true });
      setTimeout(() => setStatusMsg(null), 3500);
    }
  };

  // Save YouTube API Key
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
    setStatusMsg({ text: 'YouTube Data API key saved successfully!' });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl bg-[#0e1014] border border-white/10 rounded-t-2xl sm:rounded-xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden"
          >
            {/* Mobile Drag Indicator */}
            <div className="sm:hidden pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2">
                  <span>Stream Bridges</span>
                  <span className="text-[10px] font-mono uppercase bg-signal-green/10 text-signal-green px-2 py-0.5 rounded border border-signal-green/20">
                    Direct Access
                  </span>
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">
                  Import Spotify & YouTube playlists or single tracks
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Horizontal Tabs (Mobile-Perfect) */}
            <div className="flex items-center gap-1.5 px-4 sm:px-5 py-3 border-b border-white/[0.08] overflow-x-auto scrollbar-none bg-black/20">
              <button
                onClick={() => setActiveTab('smart')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === 'smart'
                    ? 'bg-signal-green text-black font-bold shadow-[0_0_10px_rgba(0,229,117,0.25)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles size={13} />
                <span>Smart Auto-Detect</span>
              </button>

              <button
                onClick={() => setActiveTab('spotify')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === 'spotify'
                    ? 'bg-signal-green/20 text-signal-green border border-signal-green/40 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Music2 size={13} />
                <span>Spotify</span>
              </button>

              <button
                onClick={() => setActiveTab('youtube')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === 'youtube'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Youtube size={13} />
                <span>YouTube</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === 'settings'
                    ? 'bg-white/15 text-white font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Key size={13} />
                <span>API Keys</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* TAB 1: SMART AUTO-DETECT (Mobile Best UX) */}
              {activeTab === 'smart' && (
                <form onSubmit={handleSmartImport} className="space-y-4">
                  {/* Smart Input Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-zinc-300">
                        Paste Any Song or Playlist Link:
                      </label>
                      <button
                        type="button"
                        onClick={handlePasteClipboard}
                        className="text-[11px] font-mono text-signal-green hover:underline flex items-center gap-1 bg-signal-green/10 border border-signal-green/20 px-2 py-0.5 rounded transition-colors"
                      >
                        <Clipboard size={11} />
                        <span>Paste from Clipboard</span>
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={smartUrl}
                        onChange={(e) => setSmartUrl(e.target.value)}
                        placeholder="Paste YouTube or Spotify URL here..."
                        className="w-full bg-black/60 border border-white/15 focus:border-signal-green rounded-lg px-3.5 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                      />
                      {smartUrl && (
                        <button
                          type="button"
                          onClick={() => setSmartUrl('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Auto-Detection Card */}
                  {detected.source && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3.5 rounded-lg border text-xs flex flex-col gap-2.5 ${
                        detected.source === 'spotify'
                          ? 'bg-signal-green/5 border-signal-green/30'
                          : 'bg-red-500/5 border-red-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {detected.source === 'spotify' ? (
                            <Music2 size={16} className="text-signal-green" />
                          ) : (
                            <Youtube size={16} className="text-red-400" />
                          )}
                          <span className="font-semibold text-white">
                            {detected.label}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono uppercase text-zinc-400">
                          Ready to import
                        </span>
                      </div>

                      {/* Optional custom title/name */}
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder={
                          detected.type === 'playlist'
                            ? 'Custom Station Name (Optional)'
                            : 'Custom Track Title (Optional)'
                        }
                        className="w-full bg-black/50 border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                      />
                    </motion.div>
                  )}

                  {/* Big Primary Action Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !smartUrl.trim()}
                    className={`w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                      detected.source === 'youtube'
                        ? 'bg-red-600 hover:bg-red-500 text-white'
                        : 'bg-signal-green hover:bg-signal-green-hover text-black'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Connecting Stream...</span>
                      </>
                    ) : detected.type === 'playlist' ? (
                      <>
                        <Radio size={16} />
                        <span>Import & Connect Playlist Station</span>
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>Add Track & Stream Now</span>
                      </>
                    )}
                  </button>

                  {/* Quick Preset Examples */}
                  <div className="pt-2">
                    <span className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                      Try Quick Examples:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSmartUrl('https://open.spotify.com/playlist/37i9dQZF1DX0XUfTFmNBRM')}
                        className="text-[11px] bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 px-2.5 py-1 rounded-md transition-colors"
                      >
                        Spotify: Bollywood Butter
                      </button>
                      <button
                        type="button"
                        onClick={() => setSmartUrl('https://www.youtube.com/playlist?list=PLw-VjHDlEOgs658kAHR_LAa4PecR46u5C')}
                        className="text-[11px] bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 px-2.5 py-1 rounded-md transition-colors"
                      >
                        YouTube: Top Hits
                      </button>
                      <button
                        type="button"
                        onClick={() => setSmartUrl('https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM')}
                        className="text-[11px] bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 px-2.5 py-1 rounded-md transition-colors"
                      >
                        Spotify: Punjabi 101
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 2: DEDICATED SPOTIFY */}
              {activeTab === 'spotify' && (
                <div className="space-y-4">
                  {/* Playlist Import */}
                  <form onSubmit={handleImportSpotifyPlaylist} className="p-4 bg-black/30 border border-white/10 rounded-lg space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-signal-green">
                      <Music2 size={15} />
                      <span>Import Full Spotify Playlist</span>
                    </div>

                    <input
                      type="text"
                      value={spotifyPlaylistUrl}
                      onChange={(e) => setSpotifyPlaylistUrl(e.target.value)}
                      placeholder="https://open.spotify.com/playlist/..."
                      className="w-full bg-black/60 border border-white/15 focus:border-signal-green rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={spotifyPlaylistName}
                        onChange={(e) => setSpotifyPlaylistName(e.target.value)}
                        placeholder="Custom Name (Optional)"
                        className="flex-1 bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isLoading || !spotifyPlaylistUrl.trim()}
                        className="py-2 px-4 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                      >
                        <Plus size={14} />
                        <span>Add Station</span>
                      </button>
                    </div>
                  </form>

                  {/* Single Track */}
                  <form onSubmit={handleAddSpotifyTrack} className="p-4 bg-black/20 border border-white/10 rounded-lg space-y-3">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Import Single Spotify Track:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={spotifyTrackUrl}
                        onChange={(e) => setSpotifyTrackUrl(e.target.value)}
                        placeholder="https://open.spotify.com/track/..."
                        className="flex-1 bg-black/60 border border-white/15 focus:border-signal-green rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isLoading || !spotifyTrackUrl.trim()}
                        className="py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                      >
                        <Plus size={14} />
                        <span>Add Track</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: DEDICATED YOUTUBE */}
              {activeTab === 'youtube' && (
                <div className="space-y-4">
                  {/* Playlist Import */}
                  <form onSubmit={handleImportYtPlaylist} className="p-4 bg-black/30 border border-white/10 rounded-lg space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-400">
                      <Youtube size={15} />
                      <span>Import Full YouTube Playlist</span>
                    </div>

                    <input
                      type="text"
                      value={ytPlaylistUrl}
                      onChange={(e) => setYtPlaylistUrl(e.target.value)}
                      placeholder="https://youtube.com/playlist?list=PL..."
                      className="w-full bg-black/60 border border-white/15 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={ytPlaylistName}
                        onChange={(e) => setYtPlaylistName(e.target.value)}
                        placeholder="Custom Station Name (Optional)"
                        className="flex-1 bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isLoading || !ytPlaylistUrl.trim()}
                        className="py-2 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                      >
                        <Plus size={14} />
                        <span>Add Station</span>
                      </button>
                    </div>
                  </form>

                  {/* Single Track */}
                  <form onSubmit={handleAddYtTrack} className="p-4 bg-black/20 border border-white/10 rounded-lg space-y-3">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Import Single YouTube Audio:
                    </label>
                    <input
                      type="text"
                      value={ytTrackUrl}
                      onChange={(e) => setYtTrackUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=... or youtu.be/..."
                      className="w-full bg-black/60 border border-white/15 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={ytTrackTitle}
                        onChange={(e) => setYtTrackTitle(e.target.value)}
                        placeholder="Custom Title (Optional)"
                        className="flex-1 bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isLoading || !ytTrackUrl.trim()}
                        className="py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                      >
                        <Plus size={14} />
                        <span>Add Track</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 4: SETTINGS / API KEYS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveApiKey} className="p-4 bg-black/30 border border-white/10 rounded-lg space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Key size={14} className="text-zinc-400" />
                    <span>YouTube Data API Key (Optional)</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    By default, Pulse uses public fallback proxies. Adding a free YouTube API key gives you instant direct syncing with zero rate limits.
                  </p>
                  <input
                    type="text"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full bg-black/60 border border-white/15 focus:border-signal-green rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded-lg text-xs transition-colors"
                  >
                    Save API Key
                  </button>
                </form>
              )}

              {/* Status Message Notification */}
              {statusMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg border flex items-center gap-2 text-xs ${
                    statusMsg.isError
                      ? 'bg-red-500/10 border-red-500/20 text-red-300'
                      : 'bg-signal-green/10 border-signal-green/20 text-signal-green'
                  }`}
                >
                  {statusMsg.isError ? (
                    <AlertCircle size={15} className="shrink-0" />
                  ) : (
                    <CheckCircle2 size={15} className="shrink-0" />
                  )}
                  <span>{statusMsg.text}</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
