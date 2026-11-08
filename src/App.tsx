import React, { useState, useEffect, useMemo } from 'react';
import { audioEngine } from './services/audioEngine';
import { storageService } from './services/storageService';
import { INITIAL_TRACKS } from './data/defaultCatalog';
import { Track, Playlist, VisualizerMode, ServiceConnection } from './types/music';

// Components
import { Sidebar } from './components/sidebar/Sidebar';
import { HeroShowcase } from './components/hero/HeroShowcase';
import { AudioVisualizer } from './components/visualizer/AudioVisualizer';
import { SectionCarousel } from './components/carousels/SectionCarousel';
import { PlayerBar } from './components/player/PlayerBar';
import { EqualizerModal } from './components/equalizer/EqualizerModal';
import { LyricsModal } from './components/lyrics/LyricsModal';
import { LocalMusicDropzone } from './components/upload/LocalMusicDropzone';
import { IntegrationsModal } from './components/integrations/IntegrationsModal';
import { QueueDrawer } from './components/queue/QueueDrawer';
import { EditorialFooter } from './components/footer/EditorialFooter';

export const App: React.FC = () => {
  // State: Tracks & Playback
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [queue, setQueue] = useState<Track[]>(INITIAL_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(INITIAL_TRACKS[0].duration);
  const [volume, setVolume] = useState<number>(0.7);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [isRepeating, setIsRepeating] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [visualizerMode, setVisualizerMode] = useState<VisualizerMode>('waveform');

  // State: Navigation & Views
  const [activeView, setActiveView] = useState<string>('feed');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);

  // State: Modals
  const [isEQOpen, setIsEQOpen] = useState<boolean>(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState<boolean>(false);
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);

  // State: Persistent Data
  const [playlists, setPlaylists] = useState<Playlist[]>(() => storageService.getPlaylists());
  const [connections, setConnections] = useState<ServiceConnection>(() => storageService.getConnections());

  const currentTrack = queue[currentTrackIndex] || tracks[0];

  // Load custom tracks from IndexedDB on startup
  useEffect(() => {
    storageService.loadCustomTracks().then((customTracks) => {
      if (customTracks.length > 0) {
        setTracks((prev) => [...prev, ...customTracks]);
        setQueue((prev) => [...prev, ...customTracks]);
      }
    });

    // Sync liked tracks
    const likedIds = storageService.getLikedTrackIds();
    setTracks((prev) =>
      prev.map((t) => ({ ...t, isLiked: likedIds.includes(t.id) }))
    );
  }, []);

  // Connect AudioEngine Callbacks
  useEffect(() => {
    audioEngine.onTimeUpdate = (time, dur) => {
      setCurrentTime(time);
      if (dur > 0) setDuration(dur);
    };

    audioEngine.onStateChange = (playing) => {
      setIsPlaying(playing);
    };

    audioEngine.onEnded = () => {
      if (isRepeating) {
        audioEngine.seek(0);
        audioEngine.play();
      } else {
        handleNext();
      }
    };
  }, [isRepeating, currentTrackIndex, queue.length, isShuffled]);

  // Audio Playback Handlers
  const handlePlayTrack = (track: Track) => {
    const queueIndex = queue.findIndex((t) => t.id === track.id);
    if (queueIndex !== -1) {
      setCurrentTrackIndex(queueIndex);
    } else {
      setQueue((prev) => [track, ...prev]);
      setCurrentTrackIndex(0);
    }

    audioEngine.play(track.src);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.pause();
    } else {
      audioEngine.play(currentTrack.src);
    }
  };

  const handleNext = () => {
    if (queue.length === 0) return;
    let nextIdx: number;
    if (isShuffled) {
      nextIdx = Math.floor(Math.random() * queue.length);
    } else {
      nextIdx = (currentTrackIndex + 1) % queue.length;
    }
    setCurrentTrackIndex(nextIdx);
    audioEngine.play(queue[nextIdx].src);
  };

  const handlePrev = () => {
    if (currentTime > 3) {
      audioEngine.seek(0);
      return;
    }
    if (queue.length === 0) return;
    const prevIdx = (currentTrackIndex - 1 + queue.length) % queue.length;
    setCurrentTrackIndex(prevIdx);
    audioEngine.play(queue[prevIdx].src);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    audioEngine.seek(time);
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    audioEngine.setVolume(vol);
  };

  const handleToggleShuffle = () => {
    setIsShuffled((prev) => !prev);
  };

  const handleToggleRepeat = () => {
    setIsRepeating((prev) => !prev);
  };

  const handleCyclePlaybackRate = () => {
    const rates = [1.0, 1.25, 1.5, 0.75];
    const currIdx = rates.indexOf(playbackRate);
    const nextRate = rates[(currIdx + 1) % rates.length];
    setPlaybackRate(nextRate);
    audioEngine.setPlaybackRate(nextRate);
  };

  const handleCycleVisualizerMode = () => {
    const modes: VisualizerMode[] = ['waveform', 'bars', 'radial', 'orb'];
    const currIdx = modes.indexOf(visualizerMode);
    setVisualizerMode(modes[(currIdx + 1) % modes.length]);
  };

  const handleToggleLike = (trackId: string) => {
    const likedIds = storageService.getLikedTrackIds();
    let updatedIds: string[];
    if (likedIds.includes(trackId)) {
      updatedIds = likedIds.filter((id) => id !== trackId);
    } else {
      updatedIds = [...likedIds, trackId];
    }
    storageService.saveLikedTrackIds(updatedIds);

    // Update in state
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, isLiked: !t.isLiked } : t))
    );
    setQueue((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, isLiked: !t.isLiked } : t))
    );
  };

  const handleAddToQueue = (track: Track) => {
    setQueue((prev) => [...prev, track]);
  };

  const handleRemoveFromQueue = (index: number) => {
    setQueue((prev) => prev.filter((_, i) => i !== index));
    if (index === currentTrackIndex && queue.length > 1) {
      handleNext();
    }
  };

  const handleClearQueue = () => {
    setQueue([currentTrack]);
    setCurrentTrackIndex(0);
  };

  // Upload track handler
  const handleTrackUploaded = (newTrack: Track) => {
    setTracks((prev) => [newTrack, ...prev]);
    setQueue((prev) => [newTrack, ...prev]);
  };

  // Create playlist handler
  const handleCreatePlaylist = (name: string) => {
    const newPl: Playlist = {
      id: `pl-${Date.now()}`,
      name,
      trackIds: [],
      isCustom: true
    };
    const updated = [...playlists, newPl];
    setPlaylists(updated);
    storageService.savePlaylists(updated);
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        handleVolumeChange(Math.min(1, volume + 0.05));
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        handleVolumeChange(Math.max(0, volume - 0.05));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentTrack, volume, currentTrackIndex, queue]);

  // Search Filtered Tracks
  const filteredTracks = useMemo(() => {
    if (!searchQuery.trim()) return tracks;
    const q = searchQuery.toLowerCase();
    return tracks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.genre.toLowerCase().includes(q)
    );
  }, [tracks, searchQuery]);

  // Playlist Filtered Tracks
  const displayTracks = useMemo(() => {
    if (activePlaylistId === 'liked') {
      return tracks.filter((t) => t.isLiked);
    }
    if (activePlaylistId) {
      const pl = playlists.find((p) => p.id === activePlaylistId);
      if (pl) {
        return tracks.filter((t) => pl.trackIds.includes(t.id));
      }
    }
    if (activeView === 'library') {
      return tracks.filter((t) => t.source === 'upload' || t.source === 'local');
    }
    return filteredTracks;
  }, [tracks, activePlaylistId, activeView, filteredTracks, playlists]);

  return (
    <div className="flex min-h-screen bg-canvas text-white font-body selection:bg-signal-green selection:text-black">
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        playlists={playlists}
        activePlaylistId={activePlaylistId}
        onSelectPlaylist={setActivePlaylistId}
        onCreatePlaylist={handleCreatePlaylist}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenIntegrations={() => setIsIntegrationsOpen(true)}
        connections={connections}
      />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0 pb-32">
        {/* Top Header Bar */}
        <header className="h-16 px-8 md:px-12 flex items-center justify-between border-b border-white/10 sticky top-0 bg-[#090a0d]/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="uppercase text-zinc-500">Audio Stream</span>
            <span>/</span>
            <span className="text-white font-semibold">
              {activePlaylistId
                ? playlists.find((p) => p.id === activePlaylistId)?.name || 'Playlist'
                : activeView.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
              <span className="hidden sm:inline">Engine Online</span>
            </div>
          </div>
        </header>

        {/* Hero Showcase with Live Canvas Visualizer Backdrop */}
        {activeView === 'feed' && !activePlaylistId && !searchQuery && (
          <div className="relative">
            <AudioVisualizer mode={visualizerMode} isPlaying={isPlaying} />
            <HeroShowcase
              tracks={tracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayTrack={handlePlayTrack}
              onTogglePlay={handleTogglePlay}
              onAddToQueue={handleAddToQueue}
              onToggleLike={handleToggleLike}
            />
          </div>
        )}

        {/* Dynamic Catalog Content Sections */}
        {searchQuery ? (
          <div className="p-8 md:p-12">
            <h2 className="font-display font-bold text-2xl text-white mb-2">
              Search Results for "{searchQuery}"
            </h2>
            <p className="text-xs font-mono text-zinc-400 mb-8">
              Found {filteredTracks.length} matching audio recordings
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredTracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => handlePlayTrack(track)}
                  className="bg-black/40 border border-white/10 rounded-md p-3 cursor-pointer group hover:border-signal-green/50 transition-all"
                >
                  <div className="relative aspect-square rounded overflow-hidden mb-3">
                    <img src={track.art} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="text-sm font-semibold truncate text-white group-hover:text-signal-green">
                    {track.title}
                  </h4>
                  <p className="text-xs text-zinc-400 truncate">{track.artist}</p>
                </div>
              ))}
            </div>
          </div>
        ) : activePlaylistId || activeView === 'library' ? (
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display font-bold text-3xl text-white mb-2">
                  {activePlaylistId
                    ? playlists.find((p) => p.id === activePlaylistId)?.name
                    : 'Local Offline Library'}
                </h2>
                <p className="text-xs font-mono text-zinc-400">
                  {displayTracks.length} High-Resolution Tracks Available
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {displayTracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => handlePlayTrack(track)}
                  className="bg-black/40 border border-white/10 rounded-md p-3 cursor-pointer group hover:border-signal-green/50 transition-all"
                >
                  <div className="relative aspect-square rounded overflow-hidden mb-3">
                    <img src={track.art} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/80 rounded font-mono text-[9px] text-signal-green">
                      {track.qualityBadge || 'LOCAL'}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold truncate text-white group-hover:text-signal-green">
                    {track.title}
                  </h4>
                  <p className="text-xs text-zinc-400 truncate">{track.artist}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Standard Feed Carousels */}
            <SectionCarousel
              title="Recently Mastered"
              subtitle="Pick up your acoustic session with zero latency"
              tracks={tracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayTrack={handlePlayTrack}
              onToggleLike={handleToggleLike}
            />

            <SectionCarousel
              title="Featured Sound Architects"
              subtitle="Pioneering producers sculpting spatial and modular soundscapes"
              tracks={tracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayTrack={handlePlayTrack}
              onToggleLike={handleToggleLike}
              isArtistCircle={true}
            />

            <SectionCarousel
              title="Acoustic Tendencies"
              subtitle="Algorithmic flow tuned to your studio monitors"
              tracks={[...tracks].reverse()}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayTrack={handlePlayTrack}
              onToggleLike={handleToggleLike}
            />

            <SectionCarousel
              title="Fresh Studio Drops"
              subtitle="Direct from master reel to browser DAC"
              tracks={tracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayTrack={handlePlayTrack}
              onToggleLike={handleToggleLike}
            />
          </>
        )}

        {/* Editorial Architecture Footer */}
        <EditorialFooter />
      </main>

      {/* Hardware Player Bottom Bar */}
      <PlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isShuffled={isShuffled}
        isRepeating={isRepeating}
        playbackRate={playbackRate}
        visualizerMode={visualizerMode}
        queueLength={queue.length}
        onTogglePlay={handleTogglePlay}
        onPrev={handlePrev}
        onNext={handleNext}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onToggleShuffle={handleToggleShuffle}
        onToggleRepeat={handleToggleRepeat}
        onCyclePlaybackRate={handleCyclePlaybackRate}
        onCycleVisualizerMode={handleCycleVisualizerMode}
        onToggleLike={handleToggleLike}
        onOpenEQ={() => setIsEQOpen(true)}
        onOpenLyrics={() => setIsLyricsOpen(true)}
        onOpenQueue={() => setIsQueueOpen(true)}
      />

      {/* Studio Parametric Equalizer Modal */}
      <EqualizerModal isOpen={isEQOpen} onClose={() => setIsEQOpen(false)} />

      {/* Synchronized Lyrics Modal */}
      <LyricsModal
        isOpen={isLyricsOpen}
        onClose={() => setIsLyricsOpen(false)}
        currentTrack={currentTrack}
        currentTime={currentTime}
        onSeek={handleSeek}
      />

      {/* Local Music File Upload Modal */}
      <LocalMusicDropzone
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onTrackUploaded={handleTrackUploaded}
      />

      {/* Spotify & YouTube Music Integrations Modal */}
      <IntegrationsModal
        isOpen={isIntegrationsOpen}
        onClose={() => setIsIntegrationsOpen(false)}
        connections={connections}
        onConnectionsChange={setConnections}
        onTrackAdded={handleTrackUploaded}
      />

      {/* Queue Drawer */}
      <QueueDrawer
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        queue={queue}
        currentTrackIndex={currentTrackIndex}
        onSelectTrack={(idx) => {
          setCurrentTrackIndex(idx);
          audioEngine.play(queue[idx].src);
        }}
        onRemoveTrack={handleRemoveFromQueue}
        onClearQueue={handleClearQueue}
      />
    </div>
  );
};
