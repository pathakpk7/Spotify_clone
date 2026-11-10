import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Heart, Music } from 'lucide-react';
import { Track } from '../../types/music';

interface SectionCarouselProps {
  title: string;
  subtitle: string;
  tracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  onPlayTrack: (track: Track) => void;
  onToggleLike: (trackId: string) => void;
}

export const SectionCarousel: React.FC<SectionCarouselProps> = ({
  title,
  subtitle,
  tracks,
  currentTrack,
  isPlaying,
  onPlayTrack,
  onToggleLike
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmt = 420;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmt : scrollAmt,
        behavior: 'smooth'
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!tracks || tracks.length === 0) return null;

  return (
    <section className="px-4 md:px-12 py-6 md:py-10 border-b border-white/10">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs font-body text-zinc-400 mt-1">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            aria-label="Previous items"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            aria-label="Next items"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Draggable & Scrollable Carousel Area */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
      >
        {tracks.map((track) => {
          const isCurrent = currentTrack.id === track.id;
          const isThisPlaying = isCurrent && isPlaying;

          return (
            <motion.article
              key={track.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-36 sm:w-48 sm:w-52 flex flex-col group cursor-pointer"
              onClick={() => onPlayTrack(track)}
            >
              {/* Image Thumbnail Container */}
              <div className="relative w-full aspect-square bg-[#14161c] rounded-md overflow-hidden mb-3 border border-white/10 shadow-lg flex items-center justify-center">
                {track.art ? (
                  <img
                    src={track.art}
                    alt={track.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <Music size={40} className="text-zinc-600 group-hover:text-signal-green transition-colors" />
                )}

                {/* Quality Badge */}
                {track.qualityBadge && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/75 backdrop-blur-md rounded text-[9px] font-mono font-medium text-white tracking-wider border border-white/10">
                    {track.qualityBadge}
                  </span>
                )}

                {/* Play Button Overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayTrack(track);
                  }}
                  className={`absolute bottom-3 right-3 w-11 h-11 rounded-full bg-signal-green text-black flex items-center justify-center shadow-xl transition-all duration-300 ${
                    isThisPlaying
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-90 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0'
                  }`}
                  aria-label={isThisPlaying ? 'Pause' : 'Play'}
                >
                  {isThisPlaying ? (
                    <Pause size={18} fill="currentColor" />
                  ) : (
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                  )}
                </button>
              </div>

              {/* Title & Artist Metadata */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-sm font-semibold truncate ${isCurrent ? 'text-signal-green' : 'text-white'} group-hover:text-signal-green transition-colors`}>
                    {track.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLike(track.id);
                    }}
                    className="text-zinc-500 hover:text-red-400 transition-colors shrink-0"
                  >
                    <Heart size={14} fill={track.isLiked ? '#ef4444' : 'none'} className={track.isLiked ? 'text-red-500' : ''} />
                  </button>
                </div>

                <p className="text-xs text-zinc-400 truncate mt-0.5 font-body">
                  {track.artist}
                </p>

                <div className="flex items-center gap-2 mt-1 font-mono text-[11px] text-zinc-500">
                  <span>{track.album || 'Audio File'}</span>
                  <span>•</span>
                  <span>{formatTime(track.duration)}</span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
