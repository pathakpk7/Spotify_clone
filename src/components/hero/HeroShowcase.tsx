import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, Plus, Disc, Sparkles } from 'lucide-react';
import { Track } from '../../types/music';

interface HeroShowcaseProps {
  tracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  onPlayTrack: (track: Track) => void;
  onTogglePlay: () => void;
  onAddToQueue: (track: Track) => void;
  onToggleLike: (trackId: string) => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onPlayTrack,
  onTogglePlay,
  onAddToQueue,
  onToggleLike
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const featuredTrack = tracks[activeSlideIndex] || currentTrack;
  const isCurrentPlaying = isPlaying && currentTrack.id === featuredTrack.id;

  const handleNextSlide = (idx: number) => {
    setActiveSlideIndex(idx);
  };

  return (
    <section className="relative px-8 md:px-12 py-12 md:py-16 border-b border-white/10 overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
        
        {/* Left Narrative */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Telemetry metadata kicker */}
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">
            <span className="text-signal-green font-semibold flex items-center gap-1.5">
              <Sparkles size={13} />
              Curated Release
            </span>
            <span className="text-zinc-600">•</span>
            <span>{featuredTrack.genre}</span>
            <span className="text-zinc-600">•</span>
            <span>{featuredTrack.year}</span>
          </div>

          {/* Heading */}
          <motion.h1
            key={featuredTrack.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] mb-5"
          >
            {featuredTrack.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`${featuredTrack.id}-artist`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-zinc-300 max-w-xl font-body leading-relaxed mb-8"
          >
            By <span className="text-white font-semibold">{featuredTrack.artist}</span>. Engineered for pristine acoustic depth and dynamic spatial response on studio reference hardware.
          </motion.p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => {
                if (currentTrack.id === featuredTrack.id) {
                  onTogglePlay();
                } else {
                  onPlayTrack(featuredTrack);
                }
              }}
              className="px-6 py-3.5 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded text-sm font-body flex items-center gap-2.5 transition-all shadow-signal active:scale-95"
            >
              {isCurrentPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              <span>{isCurrentPlaying ? 'Pause Audio' : 'Start Playback'}</span>
            </button>

            <button
              onClick={() => onAddToQueue(featuredTrack)}
              className="px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded text-sm font-body font-medium flex items-center gap-2 transition-all"
            >
              <Plus size={16} />
              <span>Add to Queue</span>
            </button>

            <button
              onClick={() => onToggleLike(featuredTrack.id)}
              className={`w-12 h-12 rounded border flex items-center justify-center transition-all ${
                featuredTrack.isLiked
                  ? 'border-red-500/50 bg-red-500/10 text-red-500'
                  : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart size={18} fill={featuredTrack.isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-zinc-500 tracking-wider">
              <span className="text-white font-bold">0{activeSlideIndex + 1}</span> / 0{Math.min(5, tracks.length)}
            </span>
            <div className="flex items-center gap-2">
              {tracks.slice(0, 5).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNextSlide(idx)}
                  className={`h-1 rounded-full transition-all ${
                    idx === activeSlideIndex
                      ? 'w-8 bg-signal-green'
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right 3D Vinyl Showcase */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative group w-72 h-72 sm:w-80 sm:h-80 cursor-pointer">
            
            {/* Spinning Vinyl Disc */}
            <motion.div
              className={`absolute top-2 right-[-24px] sm:right-[-40px] w-68 h-68 sm:w-76 sm:h-76 w-[270px] h-[270px] sm:w-[300px] sm:h-[300px] rounded-full bg-gradient-to-tr from-black via-zinc-900 to-black border border-white/10 shadow-vinyl flex items-center justify-center transition-transform duration-700 ease-out ${
                isCurrentPlaying
                  ? 'translate-x-16 sm:translate-x-20 animate-spin-slow'
                  : 'group-hover:translate-x-12 sm:group-hover:translate-x-16'
              }`}
            >
              {/* Vinyl Grooves */}
              <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-10 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none" />

              {/* Center Vinyl Label */}
              <div className="w-20 h-20 rounded-full bg-signal-green flex items-center justify-center border-4 border-black text-black font-display font-extrabold text-[10px] tracking-wider shadow-inner">
                PULSE
              </div>
            </motion.div>

            {/* Album Sleeve Art Cover */}
            <motion.div
              key={featuredTrack.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 w-full h-full rounded-md overflow-hidden shadow-2xl bg-black border border-white/10"
            >
              <img
                src={featuredTrack.art}
                alt={featuredTrack.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded font-mono text-[10px] font-semibold text-white tracking-widest border border-white/10">
                {featuredTrack.qualityBadge || 'LOSSLESS'}
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
