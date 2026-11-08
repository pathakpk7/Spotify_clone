import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, Plus, Music, UploadCloud } from 'lucide-react';
import { Track } from '../../types/music';

interface HeroShowcaseProps {
  tracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  onPlayTrack: (track: Track) => void;
  onTogglePlay: () => void;
  onAddToQueue: (track: Track) => void;
  onToggleLike: (trackId: string) => void;
  onOpenUpload: () => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onPlayTrack,
  onTogglePlay,
  onAddToQueue,
  onToggleLike,
  onOpenUpload
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const featuredTrack = tracks[activeSlideIndex] || currentTrack;
  const isCurrentPlaying = isPlaying && currentTrack.id === featuredTrack.id;

  const formatSource = (source: string) => {
    switch (source) {
      case 'local': return 'Local File';
      case 'upload': return 'Imported Audio';
      case 'spotify': return 'Spotify Stream';
      case 'youtube': return 'YouTube Stream';
      default: return 'Audio File';
    }
  };

  return (
    <section className="relative px-8 md:px-12 py-12 md:py-16 border-b border-white/10 overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
        
        {/* Left Narrative */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Metadata Kicker */}
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">
            <span className="text-signal-green font-semibold">
              {formatSource(featuredTrack.source)}
            </span>
            <span className="text-zinc-600">•</span>
            <span>{featuredTrack.album || 'Audio Vault'}</span>
            {featuredTrack.qualityBadge && (
              <>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300 font-semibold">{featuredTrack.qualityBadge}</span>
              </>
            )}
          </div>

          {/* Heading */}
          <motion.h1
            key={featuredTrack.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-4 truncate"
          >
            {featuredTrack.title}
          </motion.h1>

          {/* Artist & Info */}
          <motion.p
            key={`${featuredTrack.id}-artist`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-zinc-300 max-w-xl font-body leading-relaxed mb-8"
          >
            {featuredTrack.artist}
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
              <span>{isCurrentPlaying ? 'Pause Audio' : 'Play Track'}</span>
            </button>

            <button
              onClick={() => onAddToQueue(featuredTrack)}
              className="px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded text-sm font-body font-medium flex items-center gap-2 transition-all"
            >
              <Plus size={16} />
              <span>Add to Queue</span>
            </button>

            <button
              onClick={onOpenUpload}
              className="px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded text-sm font-body font-medium flex items-center gap-2 transition-all"
            >
              <UploadCloud size={16} className="text-signal-green" />
              <span>Add Your Music</span>
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

          {/* Slide Indicators if multiple tracks */}
          {tracks.length > 1 && (
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-zinc-500 tracking-wider">
                <span className="text-white font-bold">0{activeSlideIndex + 1}</span> / 0{Math.min(5, tracks.length)}
              </span>
              <div className="flex items-center gap-2">
                {tracks.slice(0, 5).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`h-1 rounded-full transition-all ${
                      idx === activeSlideIndex
                        ? 'w-8 bg-signal-green'
                        : 'w-2.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 3D Vinyl Showcase */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative group w-72 h-72 sm:w-80 sm:h-80 cursor-pointer">
            
            {/* Spinning Vinyl Disc */}
            <div
              className={`absolute top-2 right-[-24px] sm:right-[-40px] w-[270px] h-[270px] sm:w-[300px] sm:h-[300px] rounded-full bg-gradient-to-tr from-black via-zinc-900 to-black border border-white/10 shadow-vinyl flex items-center justify-center transition-transform duration-700 ease-out ${
                isCurrentPlaying
                  ? 'translate-x-16 sm:translate-x-20 animate-spin-slow'
                  : 'group-hover:translate-x-12 sm:group-hover:translate-x-16'
              }`}
            >
              <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-10 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none" />

              <div className="w-20 h-20 rounded-full bg-signal-green flex items-center justify-center border-4 border-black text-black font-display font-extrabold text-[10px] tracking-wider">
                PULSE
              </div>
            </div>

            {/* Sleeve Art Cover */}
            <motion.div
              key={featuredTrack.id}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 w-full h-full rounded-md overflow-hidden shadow-2xl bg-black border border-white/10 flex items-center justify-center"
            >
              {featuredTrack.art ? (
                <img
                  src={featuredTrack.art}
                  alt={featuredTrack.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-zinc-500 p-6 text-center">
                  <Music size={56} className="mb-3 text-signal-green" />
                  <span className="font-mono text-xs text-zinc-400 font-semibold">{featuredTrack.title}</span>
                  <span className="font-mono text-[10px] text-zinc-600">{featuredTrack.artist}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
