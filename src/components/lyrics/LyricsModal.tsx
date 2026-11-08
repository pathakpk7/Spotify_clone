import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic2, Disc3 } from 'lucide-react';
import { Track } from '../../types/music';

interface LyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: Track;
  currentTime: number;
  onSeek: (time: number) => void;
}

export const LyricsModal: React.FC<LyricsModalProps> = ({
  isOpen,
  onClose,
  currentTrack,
  currentTime,
  onSeek
}) => {
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  const lyrics = currentTrack.lyrics || [
    { time: 0, text: "[Instrumental audio stream]" },
    { time: 10, text: "Lyrics unavailable for this specific recording" },
    { time: 20, text: "Enjoy the high-fidelity acoustic performance" }
  ];

  // Find active line index based on currentTime
  let activeIndex = 0;
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].time) {
      activeIndex = i;
    }
  }

  // Auto-scroll active line to center
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [activeIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl h-[85vh] bg-[#0d0f13] border border-white/10 rounded-lg p-6 md:p-8 flex flex-col shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Glow from track artwork */}
            <div
              className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
              style={{ background: '#00e575' }}
            />

            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded overflow-hidden shadow-lg border border-white/10">
                  <img src={currentTrack.art} alt={currentTrack.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">{currentTrack.title}</h3>
                  <p className="text-xs font-mono text-zinc-400">{currentTrack.artist} • Synchronized Studio Lyrics</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Lyrics Scrollable Area */}
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

            {/* Footer Telemetry */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500 z-10">
              <span className="flex items-center gap-2">
                <Disc3 size={14} className="text-signal-green" />
                Click any phrase to seek instantly
              </span>
              <span>Bit-Perfect Timecode Sync</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
