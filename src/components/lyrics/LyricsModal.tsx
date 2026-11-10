import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic2, Disc3, Edit3, Save, FileText, Sparkles, Loader2, VolumeX, Volume2 } from 'lucide-react';
import { Track, LyricLine } from '../../types/music';
import { audioEngine } from '../../services/audioEngine';

interface LyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: Track;
  currentTime: number;
  onSeek: (time: number) => void;
  onSaveLyrics: (trackId: string, lyrics: LyricLine[]) => void;
}

export const LyricsModal: React.FC<LyricsModalProps> = ({
  isOpen,
  onClose,
  currentTrack,
  currentTime,
  onSeek,
  onSaveLyrics
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [lyricsRawText, setLyricsRawText] = useState('');
  const [isFetchingOnline, setIsFetchingOnline] = useState(false);
  const [isKaraokeActive, setIsKaraokeActive] = useState(audioEngine.isKaraokeEnabled());
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  const lyrics = currentTrack.lyrics || [];

  // Toggle Karaoke vocal attenuation
  const handleToggleKaraoke = () => {
    const nextState = !isKaraokeActive;
    setIsKaraokeActive(nextState);
    audioEngine.toggleKaraokeMode(nextState);
  };

  // Helper to parse LRC or raw text lines into LyricLine[]
  const parseLrcText = (raw: string): LyricLine[] => {
    const lines = raw.split('\n').filter((l) => l.trim().length > 0);
    const parsed: LyricLine[] = [];

    lines.forEach((line, idx) => {
      const match = line.match(/\[(\d+):(\d+(?:\.\d+)?)\](.*)/);
      if (match) {
        const mins = parseInt(match[1], 10);
        const secs = parseFloat(match[2]);
        parsed.push({
          time: mins * 60 + secs,
          text: match[3].trim()
        });
      } else {
        const lineInterval = Math.max(3, (currentTrack.duration || 180) / lines.length);
        parsed.push({
          time: Math.round(idx * lineInterval),
          text: line.trim()
        });
      }
    });

    return parsed.sort((a, b) => a.time - b.time);
  };

  // Auto-fetch from free open LRCLIB database
  const handleAutoFetchLyrics = async () => {
    setIsFetchingOnline(true);
    try {
      // Clean track title (strip "(Official Audio)", "(Lyrics)", etc.)
      const cleanTitle = currentTrack.title
        .replace(/\(.*?\)/g, '')
        .replace(/\[.*?\]/g, '')
        .replace(/ft\..*$/i, '')
        .replace(/feat\..*$/i, '')
        .trim();

      const cleanArtist = currentTrack.artist
        .replace(/\(.*?\)/g, '')
        .replace(/t-series/i, '')
        .trim();

      const url = `https://lrclib.net/api/get?track_name=${encodeURIComponent(cleanTitle)}&artist_name=${encodeURIComponent(cleanArtist)}`;
      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();
        if (data.syncedLyrics) {
          const parsed = parseLrcText(data.syncedLyrics);
          if (parsed.length > 0) {
            onSaveLyrics(currentTrack.id, parsed);
            setIsFetchingOnline(false);
            return;
          }
        } else if (data.plainLyrics) {
          const parsed = parseLrcText(data.plainLyrics);
          if (parsed.length > 0) {
            onSaveLyrics(currentTrack.id, parsed);
            setIsFetchingOnline(false);
            return;
          }
        }
      }

      // Search fallback on LRCLIB
      const searchUrl = `https://lrclib.net/api/search?q=${encodeURIComponent(cleanTitle + ' ' + cleanArtist)}`;
      const searchRes = await fetch(searchUrl);
      if (searchRes.ok) {
        const results = await searchRes.json();
        if (Array.isArray(results) && results.length > 0) {
          const best = results[0];
          if (best.syncedLyrics || best.plainLyrics) {
            const parsed = parseLrcText(best.syncedLyrics || best.plainLyrics);
            if (parsed.length > 0) {
              onSaveLyrics(currentTrack.id, parsed);
              setIsFetchingOnline(false);
              return;
            }
          }
        }
      }
    } catch (e) {
      console.warn('LRCLIB fetch error:', e);
    }
    setIsFetchingOnline(false);
    setIsEditing(true); // Open edit if not found so user can paste
  };

  const handleSave = () => {
    const parsed = parseLrcText(lyricsRawText);
    onSaveLyrics(currentTrack.id, parsed);
    setIsEditing(false);
  };

  // Find active line index based on currentTime
  let activeIndex = -1;
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].time) {
      activeIndex = i;
    }
  }

  // Auto-scroll active line to center
  useEffect(() => {
    if (activeLineRef.current && !isEditing) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [activeIndex, isEditing]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl h-[90vh] bg-[#0c0e12] border border-white/10 rounded-2xl p-4 sm:p-8 flex flex-col shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10 z-10 gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-black flex items-center justify-center border border-white/10 text-signal-green shrink-0 overflow-hidden">
                  {currentTrack.art ? (
                    <img src={currentTrack.art} alt={currentTrack.title} className="w-full h-full object-cover" />
                  ) : (
                    <Mic2 size={20} />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-base sm:text-xl text-white truncate">{currentTrack.title}</h3>
                  <p className="text-[11px] sm:text-xs font-mono text-zinc-400 truncate">{currentTrack.artist}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Karaoke Vocal Remover Toggle */}
                <button
                  onClick={handleToggleKaraoke}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                    isKaraokeActive
                      ? 'bg-signal-green text-black font-bold shadow-[0_0_12px_rgba(0,229,117,0.3)]'
                      : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'
                  }`}
                  title={isKaraokeActive ? 'Karaoke Active: Center vocals attenuated' : 'Enable Karaoke Mode'}
                >
                  <Sparkles size={13} />
                  <span className="hidden sm:inline">Karaoke Mode</span>
                  <span className="sm:hidden">Karaoke</span>
                </button>

                {/* Edit / Import */}
                <button
                  onClick={() => {
                    if (!isEditing) {
                      setLyricsRawText(
                        lyrics.map((l) => {
                          const m = Math.floor(l.time / 60);
                          const s = Math.floor(l.time % 60);
                          return `[${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}] ${l.text}`;
                        }).join('\n')
                      );
                    }
                    setIsEditing(!isEditing);
                  }}
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 size={13} />
                  <span className="hidden sm:inline">{isEditing ? 'Cancel' : 'Edit .LRC'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            {isEditing ? (
              <div className="flex-grow flex flex-col my-4 sm:my-6 z-10">
                <label className="text-xs font-mono text-zinc-400 mb-2">
                  Paste lyrics text or standard LRC format [mm:ss] text:
                </label>
                <textarea
                  value={lyricsRawText}
                  onChange={(e) => setLyricsRawText(e.target.value)}
                  placeholder={`[00:12] First line of song\n[00:24] Second line of song`}
                  className="flex-grow w-full bg-black/60 border border-white/15 rounded-lg p-4 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-signal-green resize-none"
                />
                <button
                  onClick={handleSave}
                  className="mt-4 py-2.5 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded-lg text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <Save size={14} />
                  Save Synchronized Lyrics
                </button>
              </div>
            ) : lyrics.length > 0 ? (
              <div className="flex-grow overflow-y-auto my-4 sm:my-6 pr-2 sm:pr-4 space-y-5 sm:space-y-6 scrollbar-none z-10">
                {lyrics.map((line, idx) => {
                  const isActive = idx === activeIndex;
                  const isPast = idx < activeIndex;

                  return (
                    <div
                      key={idx}
                      ref={isActive ? activeLineRef : null}
                      onClick={() => onSeek(line.time)}
                      className={`cursor-pointer transition-all duration-300 select-none py-1.5 ${
                        isActive
                          ? 'text-white font-bold text-xl sm:text-2xl md:text-3xl scale-[1.02] origin-left'
                          : isPast
                          ? 'text-zinc-500 text-base sm:text-lg md:text-xl font-medium'
                          : 'text-zinc-600 text-base sm:text-lg md:text-xl hover:text-zinc-300 font-medium'
                      }`}
                    >
                      <span className="flex items-baseline gap-3">
                        {isActive && <Mic2 size={18} className="text-signal-green shrink-0 animate-pulse" />}
                        <span>{line.text}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center my-6 z-10 text-center px-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
                  <FileText size={28} />
                </div>
                <h4 className="text-white font-semibold text-lg mb-1">No Lyrics Available</h4>
                <p className="text-xs text-zinc-400 max-w-sm mb-6">
                  Fetch live synchronized lyrics for "{currentTrack.title}" or paste your own .LRC file.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAutoFetchLyrics}
                    disabled={isFetchingOnline}
                    className="px-4 py-2.5 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,117,0.25)] disabled:opacity-50"
                  >
                    {isFetchingOnline ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Searching Global Lyrics...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} />
                        <span>Auto-Fetch Online Lyrics</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg text-xs font-mono text-white flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit3 size={14} />
                    <span>Paste / Write Lyrics</span>
                  </button>
                </div>
              </div>
            )}

            {/* Footer Telemetry */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500 z-10">
              <span className="flex items-center gap-2">
                <Disc3 size={14} className="text-signal-green" />
                Tap any line to seek track
              </span>
              <span>{isKaraokeActive ? '🎤 Karaoke Active' : 'Stereo Audio'}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
