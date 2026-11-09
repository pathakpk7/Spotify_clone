import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Trash2, ListMusic, Disc, Shuffle } from 'lucide-react';
import { Track } from '../../types/music';

interface QueueDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  queue: Track[];
  currentTrackIndex: number;
  onSelectTrack: (index: number) => void;
  onRemoveTrack: (index: number) => void;
  onClearQueue: () => void;
  onShuffleQueue?: () => void;
}

export const QueueDrawer: React.FC<QueueDrawerProps> = ({
  isOpen,
  onClose,
  queue,
  currentTrackIndex,
  onSelectTrack,
  onRemoveTrack,
  onClearQueue,
  onShuffleQueue
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#111317] border-l border-white/10 shadow-2xl flex flex-col p-6 z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-black border border-white/10 flex items-center justify-center text-signal-green">
                  <ListMusic size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Playback Queue</h3>
                  <p className="text-xs font-mono text-zinc-400">{queue.length} Tracks in Pipeline</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {queue.length > 1 && onShuffleQueue && (
                  <button
                    onClick={onShuffleQueue}
                    title="Shuffle Queue"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <Shuffle size={14} className="text-signal-green" />
                    <span>Shuffle</span>
                  </button>
                )}
                {queue.length > 0 && (
                  <button
                    onClick={onClearQueue}
                    title="Clear Queue"
                    className="p-2 rounded text-zinc-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto space-y-2 pr-1 scrollbar-none">
              {queue.map((track, idx) => {
                const isCurrent = idx === currentTrackIndex;
                return (
                  <motion.div
                    layout
                    key={`${track.id}-${idx}`}
                    className={`flex items-center gap-3 p-3 rounded border transition-all ${
                      isCurrent
                        ? 'bg-signal-green/10 border-signal-green/40'
                        : 'bg-black/30 border-white/5 hover:bg-white/5'
                    }`}
                  >
                    {/* Art thumbnail */}
                    <div className="relative w-11 h-11 rounded overflow-hidden shrink-0 border border-white/10">
                      <img src={track.art} alt={track.title} className="w-full h-full object-cover" />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-signal-green">
                          <Disc size={18} className="animate-spin-slow" />
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div
                      onClick={() => onSelectTrack(idx)}
                      className="flex-grow min-w-0 cursor-pointer"
                    >
                      <h4 className={`text-sm font-semibold truncate ${isCurrent ? 'text-signal-green' : 'text-white'}`}>
                        {track.title}
                      </h4>
                      <p className="text-xs text-zinc-400 truncate font-body">
                        {track.artist}
                      </p>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        {track.qualityBadge || track.source}
                      </span>
                    </div>

                    {/* Time & remove */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-mono text-zinc-400">
                        {formatTime(track.duration)}
                      </span>
                      <button
                        onClick={() => onRemoveTrack(idx)}
                        className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer telemetry */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Automatic Gapless Buffer</span>
              <span className="text-signal-green">Ready</span>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
