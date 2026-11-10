import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic2, Disc3, Edit3, Save, FileText } from 'lucide-react';
import { Track, LyricLine } from '../../types/music';

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
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  const lyrics = currentTrack.lyrics || [];

  // Parse .lrc or raw text
  const handleSave = () => {
    const lines = lyricsRawText.split('\n').filter((l) => l.trim().length > 0);
    const parsed: LyricLine[] = [];

    lines.forEach((line, idx) => {
      // Check for [mm:ss.xx] or [mm:ss] timestamp
      const match = line.match(/\[(\d+):(\d+(?:\.\d+)?)\](.*)/);
      if (match) {
        const mins = parseInt(match[1], 10);
        const secs = parseFloat(match[2]);
        parsed.push({
          time: mins * 60 + secs,
          text: match[3].trim()
        });
      } else {
        // Line without timestamp: space them evenly across track duration
        const lineInterval = Math.max(3, (currentTrack.duration || 180) / lines.length);
        parsed.push({
          time: Math.round(idx * lineInterval),
          text: line.trim()
        });
      }
    });

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl h-[90vh] bg-[#0d0f13] border border-white/10 rounded-lg p-4 sm:p-8 flex flex-col shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10 z-10 gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-black flex items-center justify-center border border-white/10 text-signal-green shrink-0">
                  {currentTrack.art ? (
                    <img src={currentTrack.art} alt={currentTrack.title} className="w-full h-full object-cover rounded" />
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
                  className="px-3 py-1.5 rounded text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 size={13} />
                  {isEditing ? 'Cancel' : 'Edit / Import .LRC'}
                </button>

                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            {isEditing ? (
              <div className="flex-grow flex flex-col my-6 z-10">
                <label className="text-xs font-mono text-zinc-400 mb-2">
                  Paste lyrics text or standard LRC format [mm:ss] text:
                </label>
                <textarea
                  value={lyricsRawText}
                  onChange={(e) => setLyricsRawText(e.target.value)}
                  placeholder={`[00:12] First line of song\n[00:24] Second line of song`}
                  className="flex-grow w-full bg-black/60 border border-white/15 rounded p-4 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-signal-green resize-none"
                />
                <button
                  onClick={handleSave}
                  className="mt-4 py-2.5 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <Save size={14} />
                  Save Synchronized Lyrics
                </button>
              </div>
            ) : lyrics.length > 0 ? (
              <div className="flex-grow overflow-y-auto my-6 pr-4 space-y-6 scrollbar-none z-10">
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
                          ? 'text-white font-bold text-2xl md:text-3xl scale-[1.02] origin-left'
                          : isPast
                          ? 'text-zinc-500 text-lg md:text-xl font-medium'
                          : 'text-zinc-600 text-lg md:text-xl hover:text-zinc-300 font-medium'
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
              <div className="flex-grow flex flex-col items-center justify-center my-6 z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
                  <FileText size={28} />
                </div>
                <h4 className="text-white font-semibold text-lg mb-1">No Lyrics Available</h4>
                <p className="text-xs font-mono text-zinc-400 max-w-sm mb-6">
                  No lyrics or .lrc file loaded for this audio track. You can easily import or paste lyrics.
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/15 rounded text-xs font-mono text-white flex items-center gap-2 transition-colors"
                >
                  <Edit3 size={14} />
                  Add Lyrics to this Track
                </button>
              </div>
            )}

            {/* Footer Telemetry */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500 z-10">
              <span className="flex items-center gap-2">
                <Disc3 size={14} className="text-signal-green" />
                Click any line to seek instantly
              </span>
              <span>Timecode Sync</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
