import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, Plus, Scissors, UploadCloud, Radio, Disc3 } from 'lucide-react';
import { Track } from '../../types/music';
import { RotatingHeadphone } from './RotatingHeadphone';
import { CardioWaveform } from './CardioWaveform';

interface HeroShowcaseProps {
  tracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  onPlayTrack: (track: Track) => void;
  onTogglePlay: () => void;
  onAddToQueue: (track: Track) => void;
  onToggleLike: (trackId: string) => void;
  onOpenUpload: () => void;
  onOpenCutter: () => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onPlayTrack,
  onTogglePlay,
  onAddToQueue,
  onToggleLike,
  onOpenUpload,
  onOpenCutter
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const featuredTrack = tracks[activeSlideIndex] || currentTrack;
  const isCurrentPlaying = isPlaying && currentTrack.id === featuredTrack.id;

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] px-6 sm:px-12 py-12 flex items-center border-b border-white/10 overflow-hidden bg-[#07080a]">
      {/* 1. Flowing Heartbeat String Waveform (Traverses behind the headphone) */}
      <CardioWaveform isPlaying={isPlaying} />

      {/* 2. Main High-Impact Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Minimal Sculptural Editorial Typography */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.04] mb-4"
          >
            Featured Track
          </motion.h1>

          {/* Featured Song Title & Artist */}
          <motion.div
            key={featuredTrack.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-signal-green truncate">
              {featuredTrack.title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-body mt-0.5">
              {featuredTrack.artist}
            </p>
          </motion.div>

          {/* Core Action Suite: Audio Controls & Precision Trimmer */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {/* Play / Pause Main CTA */}
            <button
              onClick={() => {
                if (currentTrack.id === featuredTrack.id) {
                  onTogglePlay();
                } else {
                  onPlayTrack(featuredTrack);
                }
              }}
              className="px-6 py-3.5 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded-lg text-sm font-body flex items-center gap-2.5 transition-all shadow-signal active:scale-95"
            >
              {isCurrentPlaying ? (
                <Pause size={17} fill="currentColor" />
              ) : (
                <Play size={17} fill="currentColor" />
              )}
              <span>{isCurrentPlaying ? 'Pause' : 'Play Track'}</span>
            </button>

            {/* Precision Song Cutter / Trimmer Button */}
            <button
              onClick={onOpenCutter}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium rounded-lg text-sm font-body flex items-center gap-2 transition-all hover:border-signal-green/40 group active:scale-95"
              title="Cut, isolate, and loop any segment of this track"
            >
              <Scissors size={16} className="text-signal-green group-hover:rotate-12 transition-transform" />
              <span>Cut Song</span>
            </button>

            {/* Add to Queue */}
            <button
              onClick={() => onAddToQueue(featuredTrack)}
              className="px-4 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-lg text-sm font-body flex items-center gap-2 transition-all"
              title="Add to queue"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Queue</span>
            </button>

            {/* Like Toggle */}
            <button
              onClick={() => onToggleLike(featuredTrack.id)}
              className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all ${
                featuredTrack.isLiked
                  ? 'border-red-500/50 bg-red-500/10 text-red-500'
                  : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart size={18} fill={featuredTrack.isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Quick Track Switcher Pagination */}
          {tracks.length > 1 && (
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-zinc-500">
                0{activeSlideIndex + 1} / 0{Math.min(5, tracks.length)}
              </span>
              <div className="flex items-center gap-1.5">
                {tracks.slice(0, 5).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`h-1 rounded-full transition-all ${
                      idx === activeSlideIndex
                        ? 'w-7 bg-signal-green'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 3D Rotating Black Headphone with Ambient Aura Glow */}
        <div className="lg:col-span-6 flex justify-center items-center relative py-6">
          <RotatingHeadphone isPlaying={isPlaying} />
        </div>

      </div>
    </section>
  );
};
