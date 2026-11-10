import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Mic2, 
  ListMusic, 
  Heart,
  Eye,
  Speaker,
  Music,
  Scissors,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Headphones,
  Share2
} from 'lucide-react';
import { Track, VisualizerMode } from '../../types/music';

interface PlayerBarProps {
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffled: boolean;
  isRepeating: boolean;
  playbackRate: number;
  visualizerMode: VisualizerMode;
  queueLength: number;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onCyclePlaybackRate: () => void;
  onCycleVisualizerMode: () => void;
  onToggleLike: (trackId: string) => void;
  onOpenEQ: () => void;
  onOpenLyrics: () => void;
  onOpenQueue: () => void;
  onOpenCutter?: () => void;
  onOpenSpatial?: () => void;
  onOpenShare?: () => void;
  activeLoopRange?: [number, number] | null;
  onClearLoop?: () => void;
}

export const PlayerBar: React.FC<PlayerBarProps> = ({
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  volume,
  isShuffled,
  isRepeating,
  playbackRate,
  visualizerMode,
  queueLength,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
  onVolumeChange,
  onToggleShuffle,
  onToggleRepeat,
  onCyclePlaybackRate,
  onCycleVisualizerMode,
  onToggleLike,
  onOpenEQ,
  onOpenLyrics,
  onOpenQueue,
  onOpenCutter,
  onOpenSpatial,
  onOpenShare,
  activeLoopRange,
  onClearLoop
}) => {
  const [hoverSeekTime, setHoverSeekTime] = useState<number | null>(null);
  const [hoverPercent, setHoverPercent] = useState<number>(0);
  const [lastVolume, setLastVolume] = useState<number>(0.7);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [isDeviceMenuOpen, setIsDeviceMenuOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('default');
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const mobileProgressRef = useRef<HTMLDivElement | null>(null);

  // Fetch real connected audio output devices
  useEffect(() => {
    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const outputs = devices.filter((d) => d.kind === 'audiooutput');
        setAudioDevices(outputs);
      }).catch(() => {});
    }
  }, []);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(pct * (duration || currentTrack.duration));
  };

  const handleMobileProgressClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!mobileProgressRef.current) return;
    const rect = mobileProgressRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clickX = clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(pct * (duration || currentTrack.duration));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const moveX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, moveX / rect.width));
    setHoverPercent(pct * 100);
    setHoverSeekTime(pct * (duration || currentTrack.duration));
  };

  const handleMouseLeave = () => {
    setHoverSeekTime(null);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setLastVolume(volume);
      onVolumeChange(0);
    } else {
      onVolumeChange(lastVolume || 0.7);
    }
  };

  const totalDuration = duration > 0 ? duration : currentTrack.duration > 0 ? currentTrack.duration : 1;
  const currentPercent = Math.min(100, Math.max(0, (currentTime / totalDuration) * 100));

  return (
    <>
      {/* =========================================================================
          1. DESKTOP STUDIO PLAYER BAR (md:flex, hidden on mobile)
         ========================================================================= */}
      <footer className="hidden md:flex fixed bottom-0 left-0 right-0 h-24 bg-[#0d0f13]/95 backdrop-blur-2xl border-t border-white/10 px-6 md:px-8 z-40 items-center justify-between select-none">
        {/* LEFT: Track Info & Artwork */}
        <div className="flex items-center gap-4 min-w-0 w-1/4 max-w-xs">
          <div className="relative w-14 h-14 rounded overflow-hidden bg-black shrink-0 border border-white/10 shadow-lg flex items-center justify-center">
            {currentTrack.art ? (
              <img
                src={currentTrack.art}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Music size={24} className="text-zinc-500" />
            )}

            {/* Equalizer Wavelet Bar Overlay */}
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-end justify-center gap-1 p-2">
                <span className="w-1 bg-signal-green rounded-full animate-eq-1" />
                <span className="w-1 bg-signal-green rounded-full animate-eq-2" />
                <span className="w-1 bg-signal-green rounded-full animate-eq-3" />
                <span className="w-1 bg-signal-green rounded-full animate-eq-4" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex flex-col justify-center">
            <h4 className="text-sm font-semibold text-white truncate hover:underline cursor-pointer">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-zinc-400 truncate font-body">
              {currentTrack.artist}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                {currentTrack.qualityBadge || currentTrack.source.toUpperCase()}
              </span>
              {activeLoopRange && (
                <button
                  onClick={onOpenCutter}
                  className="text-[9px] font-mono text-signal-green bg-signal-green/10 border border-signal-green/30 px-1.5 py-0.5 rounded flex items-center gap-1 hover:bg-signal-green/20 transition-colors"
                  title="Cut active - Click to adjust"
                >
                  <Scissors size={9} />
                  <span>CUT {formatTime(activeLoopRange[0])}-{formatTime(activeLoopRange[1])}</span>
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => onToggleLike(currentTrack.id)}
            className="text-zinc-500 hover:text-red-500 transition-colors shrink-0 ml-1"
          >
            <Heart
              size={18}
              fill={currentTrack.isLiked ? '#ef4444' : 'none'}
              className={currentTrack.isLiked ? 'text-red-500' : ''}
            />
          </button>
        </div>

        {/* CENTER: Transport Controls & Scrubber */}
        <div className="flex flex-col items-center max-w-2xl w-full mx-4">
          {/* Buttons */}
          <div className="flex items-center gap-6 mb-2">
            <button
              onClick={onToggleShuffle}
              className={`transition-colors ${isShuffled ? 'text-signal-green' : 'text-zinc-400 hover:text-white'}`}
              title="Shuffle Playback"
            >
              <Shuffle size={16} />
            </button>

            <button
              onClick={onPrev}
              className="text-zinc-300 hover:text-white transition-colors"
              title="Previous Track"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={onTogglePlay}
              className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-signal-green transition-all shadow-md active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={20} fill="currentColor" />
              ) : (
                <Play size={20} fill="currentColor" className="ml-0.5" />
              )}
            </button>

            <button
              onClick={onNext}
              className="text-zinc-300 hover:text-white transition-colors"
              title="Next Track"
            >
              <SkipForward size={20} />
            </button>

            <button
              onClick={onToggleRepeat}
              className={`transition-colors ${isRepeating ? 'text-signal-green' : 'text-zinc-400 hover:text-white'}`}
              title="Loop Track"
            >
              <Repeat size={16} />
            </button>
          </div>

          {/* Scrubber */}
          <div className="w-full flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-400 w-10 text-right shrink-0">
              {formatTime(currentTime)}
            </span>

            <div
              ref={progressBarRef}
              onClick={handleProgressBarClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative flex-grow h-2 bg-white/10 rounded-full cursor-pointer group flex items-center"
            >
              {/* Hover preview tooltip */}
              {hoverSeekTime !== null && (
                <div
                  className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 bg-black/90 border border-white/20 rounded font-mono text-[10px] text-white pointer-events-none z-30"
                  style={{ left: `${hoverPercent}%` }}
                >
                  {formatTime(hoverSeekTime)}
                </div>
              )}

              {/* Cut Loop Region Highlight */}
              {activeLoopRange && totalDuration > 0 && (
                <div
                  className="absolute top-0 bottom-0 bg-signal-green/35 border-x border-signal-green rounded pointer-events-none"
                  style={{
                    left: `${(activeLoopRange[0] / totalDuration) * 100}%`,
                    width: `${Math.max(1, ((activeLoopRange[1] - activeLoopRange[0]) / totalDuration) * 100)}%`
                  }}
                />
              )}

              {/* Filled progress */}
              <div
                className="h-full bg-white group-hover:bg-signal-green rounded-full transition-colors relative"
                style={{ width: `${currentPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <span className="font-mono text-xs text-zinc-400 w-10 text-left shrink-0">
              {formatTime(totalDuration)}
            </span>
          </div>
        </div>

        {/* RIGHT: Studio Features & Volume Controls */}
        <div className="flex items-center justify-end gap-3 w-1/4 max-w-xs relative">
          {/* Visualizer Mode Toggle */}
          <button
            onClick={onCycleVisualizerMode}
            className="p-2 text-zinc-400 hover:text-signal-green hover:bg-white/5 rounded transition-colors relative"
            title={`Visualizer Mode: ${visualizerMode.toUpperCase()}`}
          >
            <Eye size={17} />
            <span className="absolute -top-1 -right-1 font-mono text-[8px] bg-black border border-white/20 text-zinc-300 px-1 rounded">
              {visualizerMode[0].toUpperCase()}
            </span>
          </button>

          {/* Audio Clipper / Cutter Button */}
          {onOpenCutter && (
            <button
              onClick={onOpenCutter}
              className={`p-2 rounded transition-all ${
                activeLoopRange
                  ? 'text-signal-green bg-signal-green/15 border border-signal-green/40 shadow-[0_0_12px_rgba(0,229,117,0.35)]'
                  : 'text-zinc-400 hover:text-signal-green hover:bg-white/5'
              }`}
              title={activeLoopRange ? 'Cut Active - Click to adjust or clear cut' : 'Cut & Loop Current Playing Song'}
            >
              <Scissors size={17} />
            </button>
          )}

          {/* 8D Spatial & Acoustics Button */}
          {onOpenSpatial && (
            <button
              onClick={onOpenSpatial}
              className="p-2 text-zinc-400 hover:text-signal-green hover:bg-white/5 rounded transition-colors"
              title="8D Spatial Audio & Room Acoustics"
            >
              <Headphones size={17} />
            </button>
          )}

          {/* EQ Modal Button */}
          <button
            onClick={onOpenEQ}
            className="p-2 text-zinc-400 hover:text-signal-green hover:bg-white/5 rounded transition-colors"
            title="Parametric Equalizer"
          >
            <Sliders size={17} />
          </button>

          {/* Lyrics Modal Button */}
          <button
            onClick={onOpenLyrics}
            className="p-2 text-zinc-400 hover:text-signal-green hover:bg-white/5 rounded transition-colors"
            title="Synchronized Lyrics & Karaoke"
          >
            <Mic2 size={17} />
          </button>

          {/* Share Card & Deep Link */}
          {onOpenShare && (
            <button
              onClick={onOpenShare}
              className="p-2 text-zinc-400 hover:text-signal-green hover:bg-white/5 rounded transition-colors"
              title="Share Music Card & Direct Link"
            >
              <Share2 size={17} />
            </button>
          )}

          {/* Speed toggle */}
          <button
            onClick={onCyclePlaybackRate}
            className="px-1.5 py-1 text-zinc-400 hover:text-white font-mono text-xs hover:bg-white/5 rounded transition-colors"
            title="Playback Rate"
          >
            {playbackRate}x
          </button>

          {/* Audio Output Devices Popover */}
          <div className="relative">
            <button
              onClick={() => setIsDeviceMenuOpen(!isDeviceMenuOpen)}
              className={`p-2 rounded transition-colors ${isDeviceMenuOpen ? 'text-signal-green bg-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
              title="Audio Output Device"
            >
              <Speaker size={17} />
            </button>

            {isDeviceMenuOpen && (
              <div className="absolute bottom-12 right-0 w-64 bg-[#14161c] border border-white/15 rounded-md shadow-2xl p-3 z-50 text-xs font-mono">
                <span className="block text-[10px] text-zinc-400 uppercase tracking-wider mb-2">
                  Real Audio Outputs
                </span>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  <button
                    onClick={() => { setSelectedDeviceId('default'); setIsDeviceMenuOpen(false); }}
                    className={`w-full text-left p-1.5 rounded truncate ${selectedDeviceId === 'default' ? 'bg-signal-green text-black font-semibold' : 'text-zinc-300 hover:bg-white/5'}`}
                  >
                    Default System Speaker
                  </button>
                  {audioDevices.map((dev) => (
                    <button
                      key={dev.deviceId}
                      onClick={() => { setSelectedDeviceId(dev.deviceId); setIsDeviceMenuOpen(false); }}
                      className={`w-full text-left p-1.5 rounded truncate ${selectedDeviceId === dev.deviceId ? 'bg-signal-green text-black font-semibold' : 'text-zinc-300 hover:bg-white/5'}`}
                    >
                      {dev.label || `Audio Device (${dev.deviceId.slice(0, 5)})`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 group">
            <button
              onClick={toggleMute}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-20 h-1 appearance-none bg-white/20 rounded-full cursor-pointer accent-signal-green"
            />
          </div>

          {/* Queue Drawer Button */}
          <button
            onClick={onOpenQueue}
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-colors relative ml-1"
            title="Playback Queue"
          >
            <ListMusic size={18} />
            {queueLength > 0 && (
              <span className="absolute -top-1 -right-1 font-mono text-[9px] bg-signal-green text-black font-bold px-1 rounded-full">
                {queueLength}
              </span>
            )}
          </button>
        </div>
      </footer>

      {/* =========================================================================
          2. MOBILE MINI-PLAYER (md:hidden, docked directly above bottom nav)
         ========================================================================= */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 h-14 bg-[#111317]/95 backdrop-blur-2xl border-t border-white/10 px-3 z-40 flex items-center justify-between select-none">
        {/* Thin top progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-white/10">
          <div
            className="h-full bg-signal-green transition-all"
            style={{ width: `${currentPercent}%` }}
          />
        </div>

        {/* Tappable left info: Expands full-screen mobile player */}
        <div
          onClick={() => setIsMobileExpanded(true)}
          className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer pr-2"
        >
          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-black shrink-0 border border-white/10 flex items-center justify-center">
            {currentTrack.art ? (
              <img
                src={currentTrack.art}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Music size={18} className="text-zinc-500" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-white truncate leading-tight">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] text-zinc-400 truncate leading-tight mt-0.5">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Mobile Mini Quick Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onToggleLike(currentTrack.id)}
            className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
          >
            <Heart
              size={18}
              fill={currentTrack.isLiked ? '#ef4444' : 'none'}
              className={currentTrack.isLiked ? 'text-red-500' : ''}
            />
          </button>

          <button
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-signal-green transition-all shadow-md active:scale-95"
          >
            {isPlaying ? (
              <Pause size={17} fill="currentColor" />
            ) : (
              <Play size={17} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <button
            onClick={onNext}
            className="p-2 text-zinc-300 hover:text-white transition-colors"
          >
            <SkipForward size={18} />
          </button>

          <button
            onClick={() => setIsMobileExpanded(true)}
            className="p-2 text-zinc-400 hover:text-white"
            title="Expand Full Player"
          >
            <ChevronUp size={18} />
          </button>
        </div>
      </div>

      {/* =========================================================================
          3. FULL-SCREEN EXPANDED MOBILE PLAYER (md:hidden, slide-up sheet)
         ========================================================================= */}
      <AnimatePresence>
        {isMobileExpanded && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="md:hidden fixed inset-0 z-50 bg-[#07080b] flex flex-col justify-between p-6 pb-10 overflow-y-auto select-none"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-2">
              <button
                onClick={() => setIsMobileExpanded(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <ChevronDown size={24} />
              </button>

              <div className="text-center">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  PLAYING FROM
                </span>
                <span className="text-xs font-semibold text-white truncate max-w-[200px] block">
                  {currentTrack.album || 'Pulse Stream Engine'}
                </span>
              </div>

              <button
                onClick={() => {
                  setIsMobileExpanded(false);
                  onOpenQueue();
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 relative"
              >
                <ListMusic size={20} />
                {queueLength > 0 && (
                  <span className="absolute top-1 right-1 font-mono text-[9px] bg-signal-green text-black font-bold px-1 rounded-full">
                    {queueLength}
                  </span>
                )}
              </button>
            </div>

            {/* Big Center Artwork */}
            <div className="my-auto py-6 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 aspect-square rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15">
                {currentTrack.art ? (
                  <img
                    src={currentTrack.art}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#12141a] flex items-center justify-center text-zinc-600">
                    <Music size={64} />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls Area */}
            <div className="space-y-5">
              {/* Song Title & Like Button */}
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-white truncate">
                    {currentTrack.title}
                  </h3>
                  <p className="text-sm text-zinc-400 truncate mt-0.5">
                    {currentTrack.artist}
                  </p>
                  {activeLoopRange && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-signal-green bg-signal-green/10 border border-signal-green/30 px-2 py-0.5 rounded mt-1.5">
                      <Scissors size={10} />
                      CUT LOOP ACTIVE ({formatTime(activeLoopRange[0])} - {formatTime(activeLoopRange[1])})
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onToggleLike(currentTrack.id)}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <Heart
                    size={24}
                    fill={currentTrack.isLiked ? '#ef4444' : 'none'}
                    className={currentTrack.isLiked ? 'text-red-500' : ''}
                  />
                </button>
              </div>

              {/* Scrubber Bar */}
              <div className="space-y-1.5">
                <div
                  ref={mobileProgressRef}
                  onClick={handleMobileProgressClick}
                  onTouchStart={handleMobileProgressClick}
                  className="relative h-2 bg-white/15 rounded-full cursor-pointer flex items-center py-2"
                >
                  {/* Cut Loop Region Highlight */}
                  {activeLoopRange && totalDuration > 0 && (
                    <div
                      className="absolute top-0 bottom-0 bg-signal-green/40 border-x border-signal-green rounded pointer-events-none"
                      style={{
                        left: `${(activeLoopRange[0] / totalDuration) * 100}%`,
                        width: `${Math.max(1, ((activeLoopRange[1] - activeLoopRange[0]) / totalDuration) * 100)}%`
                      }}
                    />
                  )}

                  <div
                    className="h-1.5 bg-signal-green rounded-full relative"
                    style={{ width: `${currentPercent}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(totalDuration)}</span>
                </div>
              </div>

              {/* Main Transport Buttons */}
              <div className="flex items-center justify-between px-2">
                <button
                  onClick={onToggleShuffle}
                  className={`p-3 rounded-full transition-colors ${
                    isShuffled ? 'text-signal-green' : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Shuffle"
                >
                  <Shuffle size={20} />
                </button>

                <button
                  onClick={onPrev}
                  className="p-3 text-zinc-200 hover:text-white transition-colors"
                  title="Previous"
                >
                  <SkipBack size={26} />
                </button>

                <button
                  onClick={onTogglePlay}
                  className="w-16 h-16 rounded-full bg-signal-green text-black flex items-center justify-center shadow-signal transition-transform active:scale-95"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause size={28} fill="currentColor" />
                  ) : (
                    <Play size={28} fill="currentColor" className="ml-1" />
                  )}
                </button>

                <button
                  onClick={onNext}
                  className="p-3 text-zinc-200 hover:text-white transition-colors"
                  title="Next"
                >
                  <SkipForward size={26} />
                </button>

                <button
                  onClick={onToggleRepeat}
                  className={`p-3 rounded-full transition-colors ${
                    isRepeating ? 'text-signal-green' : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Repeat"
                >
                  <Repeat size={20} />
                </button>
              </div>

              {/* Mobile Accessories & Utility Icons Strip */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 pt-2 border-t border-white/10 text-center">
                {/* 1. Equalizer */}
                <button
                  onClick={() => {
                    setIsMobileExpanded(false);
                    onOpenEQ();
                  }}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                >
                  <Sliders size={18} className="text-signal-green" />
                  <span className="text-[10px] font-mono mt-1">EQ</span>
                </button>

                {/* 2. 8D Spatial Audio */}
                {onOpenSpatial && (
                  <button
                    onClick={() => {
                      setIsMobileExpanded(false);
                      onOpenSpatial();
                    }}
                    className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                  >
                    <Headphones size={18} className="text-signal-green" />
                    <span className="text-[10px] font-mono mt-1">8D Audio</span>
                  </button>
                )}

                {/* 3. Lyrics */}
                <button
                  onClick={() => {
                    setIsMobileExpanded(false);
                    onOpenLyrics();
                  }}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                >
                  <Mic2 size={18} className="text-signal-green" />
                  <span className="text-[10px] font-mono mt-1">Lyrics</span>
                </button>

                {/* 4. Share Card */}
                {onOpenShare && (
                  <button
                    onClick={() => {
                      setIsMobileExpanded(false);
                      onOpenShare();
                    }}
                    className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                  >
                    <Share2 size={18} className="text-signal-green" />
                    <span className="text-[10px] font-mono mt-1">Share</span>
                  </button>
                )}

                {/* 5. Audio Cutter */}
                {onOpenCutter && (
                  <button
                    onClick={() => {
                      setIsMobileExpanded(false);
                      onOpenCutter();
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                      activeLoopRange
                        ? 'bg-signal-green text-black font-semibold'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-300'
                    }`}
                  >
                    <Scissors size={18} />
                    <span className="text-[10px] font-mono mt-1">Cutter</span>
                  </button>
                )}

                {/* 6. Visualizer */}
                <button
                  onClick={onCycleVisualizerMode}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                >
                  <Eye size={18} className="text-signal-green" />
                  <span className="text-[10px] font-mono mt-1 uppercase">{visualizerMode[0]}</span>
                </button>

                {/* 7. Speed */}
                <button
                  onClick={onCyclePlaybackRate}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                >
                  <span className="font-mono text-sm font-bold text-signal-green leading-none">{playbackRate}x</span>
                  <span className="text-[10px] font-mono mt-1">Speed</span>
                </button>
              </div>

              {/* Volume Slider for Mobile */}
              <div className="flex items-center gap-3 pt-2 px-1">
                <button onClick={toggleMute} className="text-zinc-400">
                  {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 appearance-none bg-white/20 rounded-full cursor-pointer accent-signal-green"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
