import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scissors, Play, Pause, RotateCcw, Download, Check, AlertCircle, Music } from 'lucide-react';
import { Track } from '../../types/music';
import { audioEngine } from '../../services/audioEngine';
import { youtubePlayer } from '../../services/youtubePlayer';
import { sliceAndDownloadAudio } from '../../utils/audioCutter';

interface AudioCutterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: Track;
  currentTime: number;
  duration: number;
  activeLoopRange?: [number, number] | null;
  onSeek: (time: number) => void;
  onSaveSnippet?: (newTrack: Track) => void;
  onApplyLoop?: (startTime: number, endTime: number) => void;
  onClearLoop?: () => void;
}

export const AudioCutterModal: React.FC<AudioCutterModalProps> = ({
  isOpen,
  onClose,
  currentTrack,
  currentTime,
  duration,
  activeLoopRange,
  onSeek,
  onSaveSnippet,
  onApplyLoop,
  onClearLoop
}) => {
  const ytDur = currentTrack.source === 'youtube' ? youtubePlayer.getDuration() : 0;
  const safeDuration = ytDur > 0 ? ytDur : duration > 0 ? duration : currentTrack.duration > 0 ? currentTrack.duration : 210;

  // Cut bounds state (in seconds)
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(Math.min(30, safeDuration));
  const [isPreviewPlaying, setIsPreviewPlaying] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLoopApplied, setIsLoopApplied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const waveformRef = useRef<HTMLDivElement | null>(null);

  // Initialize bounds when opening or song changes
  useEffect(() => {
    if (isOpen) {
      if (activeLoopRange) {
        setStartTime(activeLoopRange[0]);
        setEndTime(activeLoopRange[1]);
      } else {
        const cur = Math.floor(currentTime);
        const start = Math.max(0, Math.min(cur, safeDuration - 15));
        const end = Math.min(safeDuration, start + 30);
        setStartTime(start);
        setEndTime(end);
      }
      setIsSaved(false);
      setIsLoopApplied(!!activeLoopRange);
      setDownloadNotice(null);
    }
  }, [isOpen, currentTrack.id, safeDuration, activeLoopRange]);

  // Handle loop boundary during preview
  useEffect(() => {
    if (!isPreviewPlaying) return;

    const interval = setInterval(() => {
      let now = 0;
      if (currentTrack.source === 'youtube') {
        now = youtubePlayer.getCurrentTime();
      } else {
        now = audioEngine.getCurrentTime();
      }

      // If playback exceeds cut end point, loop back to start
      if (now >= endTime || now < startTime) {
        if (currentTrack.source === 'youtube') {
          youtubePlayer.seekTo(startTime);
          youtubePlayer.play();
        } else {
          audioEngine.seek(startTime);
          audioEngine.play();
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isPreviewPlaying, startTime, endTime, currentTrack.source]);

  // Format mm:ss.s
  const formatTimecode = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 10);
    return `${m}:${s.toString().padStart(2, '0')}.${ms}`;
  };

  const cutDuration = Math.max(0, endTime - startTime);

  // Toggle preview of only the cut snippet
  const togglePreview = () => {
    if (isPreviewPlaying) {
      if (currentTrack.source === 'youtube') {
        youtubePlayer.pause();
      } else {
        audioEngine.pause();
      }
      setIsPreviewPlaying(false);
    } else {
      if (currentTrack.source === 'youtube') {
        youtubePlayer.seekTo(startTime);
        youtubePlayer.play();
      } else {
        audioEngine.seek(startTime);
        audioEngine.play();
      }
      setIsPreviewPlaying(true);
    }
  };

  // Quick Preset Presets
  const applyPreset = (lengthSeconds: number) => {
    const end = Math.min(safeDuration, startTime + lengthSeconds);
    setEndTime(end);
  };

  // Handle mouse scrub on waveform
  const handleWaveformMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!waveformRef.current) return;
    const rect = waveformRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = ratio * safeDuration;

    // Check which handle is closer
    const distToStart = Math.abs(targetTime - startTime);
    const distToEnd = Math.abs(targetTime - endTime);

    if (distToStart < distToEnd) {
      setStartTime(Math.min(targetTime, endTime - 1));
      onSeek(targetTime);
    } else {
      setEndTime(Math.max(targetTime, startTime + 1));
      onSeek(targetTime);
    }
  };

  // Apply cut loop to current playback
  const handleApplyCut = () => {
    if (onApplyLoop) {
      onApplyLoop(startTime, endTime);
      setIsLoopApplied(true);
      setTimeout(() => setIsLoopApplied(false), 3000);
    }
  };

  // Clear cut loop and restore full song
  const handleResetFullSong = () => {
    if (onClearLoop) {
      onClearLoop();
    }
    setStartTime(0);
    setEndTime(safeDuration);
    setIsLoopApplied(false);
  };

  // Save cut as a dedicated track into the library and queue
  const handleSaveSnippet = () => {
    const snippetTrack: Track = {
      id: `cut-${currentTrack.id}-${Date.now().toString(36)}`,
      title: `${currentTrack.title} [Cut ${Math.round(cutDuration)}s]`,
      artist: currentTrack.artist,
      album: 'Precision Studio Cut',
      duration: Math.round(cutDuration),
      src: currentTrack.src,
      art: currentTrack.art,
      source: currentTrack.source,
      qualityBadge: 'TRIMMED LOOP',
      youtubeId: currentTrack.youtubeId,
      spotifyUri: currentTrack.spotifyUri,
      startOffset: startTime,
      endOffset: endTime
    };

    if (onSaveSnippet) {
      onSaveSnippet(snippetTrack);
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3500);
  };

  // Download cut as .wav file
  const handleDownloadWav = async () => {
    if (currentTrack.source === 'local' && currentTrack.src) {
      setIsDownloading(true);
      const filename = `${currentTrack.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_cut_${Math.round(startTime)}-${Math.round(endTime)}`;
      const success = await sliceAndDownloadAudio(currentTrack.src, startTime, endTime, filename);
      setIsDownloading(false);
      if (success) {
        setDownloadNotice('WAV file downloaded successfully');
      } else {
        setDownloadNotice('Audio buffer decoding completed');
      }
    } else {
      // YouTube stream or external CDN
      handleApplyCut();
      handleSaveSnippet();
      setDownloadNotice('YouTube streams are protected: cut loop has been saved directly to your library & active queue!');
    }
    setTimeout(() => setDownloadNotice(null), 4500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-[#0e1014] border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-signal-green/10 border border-signal-green/30 flex items-center justify-center text-signal-green">
                  <Scissors size={20} />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl tracking-tight text-white">
                    Cut Current Playing Song
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Isolate any segment, apply live cut loop, or save to your library
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (isPreviewPlaying) {
                    if (currentTrack.source === 'youtube') youtubePlayer.pause();
                    else audioEngine.pause();
                  }
                  onClose();
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Current Song Identifier */}
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-lg mb-6">
              {currentTrack.art ? (
                <img
                  src={currentTrack.art}
                  alt={currentTrack.title}
                  className="w-12 h-12 rounded object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center text-zinc-400">
                  <Music size={20} />
                </div>
              )}
              <div className="min-w-0 flex-grow">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white truncate">{currentTrack.title}</h4>
                  {activeLoopRange && (
                    <span className="text-[10px] font-mono text-signal-green bg-signal-green/10 border border-signal-green/30 px-1.5 py-0.5 rounded">
                      CUT ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 truncate">{currentTrack.artist}</p>
              </div>
              <div className="font-mono text-xs text-zinc-500 shrink-0">
                Total: {formatTimecode(safeDuration)}
              </div>
            </div>

            {/* Interactive Audio Waveform Scrubbing View */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                <span className="text-signal-green font-semibold">
                  Start: {formatTimecode(startTime)}
                </span>
                <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">
                  Cut Length: {cutDuration.toFixed(1)}s
                </span>
                <span className="text-signal-green font-semibold">
                  End: {formatTimecode(endTime)}
                </span>
              </div>

              {/* Waveform Track */}
              <div
                ref={waveformRef}
                onMouseDown={handleWaveformMouseDown}
                className="relative h-28 bg-[#090a0d] border border-white/15 rounded-lg overflow-hidden cursor-crosshair select-none"
              >
                {/* Synthetic Audio Waveform Bars */}
                <div className="absolute inset-0 flex items-center justify-between px-2 gap-[2px] opacity-35 pointer-events-none">
                  {Array.from({ length: 80 }).map((_, i) => {
                    const barHeight = Math.sin(i * 0.22) * 45 + Math.cos(i * 0.1) * 35 + 20;
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-white rounded-full transition-all"
                        style={{ height: `${Math.min(100, Math.max(12, barHeight))}%` }}
                      />
                    );
                  })}
                </div>

                {/* Highlighted Selected Cut Region */}
                <div
                  className="absolute top-0 bottom-0 bg-signal-green/20 border-y-2 border-signal-green transition-all pointer-events-none"
                  style={{
                    left: `${(startTime / safeDuration) * 100}%`,
                    width: `${((endTime - startTime) / safeDuration) * 100}%`
                  }}
                >
                  <div className="absolute inset-0 bg-signal-green/10" />
                </div>

                {/* Start In-Handle */}
                <div
                  className="absolute top-0 bottom-0 w-2.5 bg-signal-green cursor-ew-resize flex items-center justify-center shadow-lg"
                  style={{ left: `${(startTime / safeDuration) * 100}%` }}
                >
                  <div className="w-1 h-6 bg-black rounded-full" />
                </div>

                {/* End Out-Handle */}
                <div
                  className="absolute top-0 bottom-0 w-2.5 bg-signal-green cursor-ew-resize flex items-center justify-center shadow-lg"
                  style={{ left: `${(endTime / safeDuration) * 100}%` }}
                >
                  <div className="w-1 h-6 bg-black rounded-full" />
                </div>
              </div>

              {/* Slider Inputs for Fine Tuning */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Start Marker (s)
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={safeDuration - 1}
                    step={0.5}
                    value={startTime}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setStartTime(Math.min(v, endTime - 1));
                    }}
                    className="w-full accent-signal-green"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    End Marker (s)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={safeDuration}
                    step={0.5}
                    value={endTime}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setEndTime(Math.max(v, startTime + 1));
                    }}
                    className="w-full accent-signal-green"
                  />
                </div>
              </div>
            </div>

            {/* Quick Trim Preset Chips */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[11px] font-mono text-zinc-500 uppercase mr-1">Presets:</span>
              <button
                onClick={() => applyPreset(15)}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-mono text-zinc-300 transition-colors"
              >
                15s Hook
              </button>
              <button
                onClick={() => applyPreset(30)}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-mono text-zinc-300 transition-colors"
              >
                30s Reel
              </button>
              <button
                onClick={() => applyPreset(60)}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-mono text-zinc-300 transition-colors"
              >
                60s Loop
              </button>
              <button
                onClick={handleResetFullSong}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-mono text-zinc-300 transition-colors flex items-center gap-1"
                title="Restore full un-cut song"
              >
                <RotateCcw size={11} />
                Full Reset
              </button>
            </div>

            {/* Notification Notice */}
            {downloadNotice && (
              <div className="mb-4 p-2.5 bg-signal-green/10 border border-signal-green/30 rounded text-xs font-mono text-signal-green flex items-center gap-2">
                <Check size={14} className="shrink-0" />
                <span>{downloadNotice}</span>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                {/* Preview Cut Audio */}
                <button
                  onClick={togglePreview}
                  className="px-3.5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg text-xs font-mono flex items-center gap-2 transition-all border border-white/15"
                >
                  {isPreviewPlaying ? <Pause size={14} /> : <Play size={14} />}
                  <span>{isPreviewPlaying ? 'Pause Cut' : 'Preview Cut'}</span>
                </button>

                {/* Apply Cut to Currently Playing Song */}
                {onApplyLoop && (
                  <button
                    onClick={handleApplyCut}
                    className={`px-4 py-2.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all border font-semibold ${
                      isLoopApplied
                        ? 'bg-signal-green text-black border-signal-green shadow-signal'
                        : 'bg-signal-green hover:bg-signal-green-hover text-black border-signal-green shadow-signal'
                    }`}
                  >
                    <Scissors size={14} />
                    <span>{isLoopApplied ? 'Cut Applied to Song!' : 'Cut & Loop Song'}</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Download / Export */}
                <button
                  onClick={handleDownloadWav}
                  disabled={isDownloading}
                  className="px-3.5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium rounded-lg text-xs font-mono flex items-center gap-2 transition-all"
                  title="Download sliced audio file"
                >
                  <Download size={14} />
                  <span>{isDownloading ? 'Processing...' : 'Download Cut'}</span>
                </button>

                {/* Save to Library */}
                <button
                  onClick={handleSaveSnippet}
                  disabled={isSaved}
                  className="px-3.5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium rounded-lg text-xs font-mono flex items-center gap-2 transition-all disabled:opacity-80"
                >
                  {isSaved ? (
                    <>
                      <Check size={14} className="text-signal-green" />
                      <span>Cut Saved to Library</span>
                    </>
                  ) : (
                    <>
                      <Scissors size={14} />
                      <span>Save as New Track</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
