import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Pause, Scissors, Music } from 'lucide-react';
import { Track } from '../../types/music';
import { RotatingHeadphone } from './RotatingHeadphone';
import { CardioWaveform } from './CardioWaveform';

interface CinematicLandingPortalProps {
  isPlaying: boolean;
  currentTrack: Track;
  onEnterMain: () => void;
  onOpenCutter?: () => void;
  onTogglePlay?: () => void;
}

export const CinematicLandingPortal: React.FC<CinematicLandingPortalProps> = ({
  isPlaying,
  currentTrack,
  onEnterMain,
  onOpenCutter,
  onTogglePlay
}) => {
  const [isZooming, setIsZooming] = useState(false);

  const handleTriggerEnter = () => {
    if (isZooming) return;
    setIsZooming(true);
    setTimeout(() => {
      onEnterMain();
    }, 850);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isZooming ? 0 : 1 }}
      transition={{ duration: 0.9, delay: 0.1 }}
      className="fixed inset-0 w-screen h-screen z-50 flex flex-col items-center justify-between px-6 sm:px-12 py-6 sm:py-10 overflow-hidden bg-[#040507] select-none"
    >
      {/* 1. Fluid Background Heartbeat Waveform */}
      <CardioWaveform isPlaying={isPlaying} />

      {/* 2. Top Minimal Living Header - Focused on the Website */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 w-full max-w-6xl flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-white/5 pb-4"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
          <span className="tracking-widest uppercase text-white font-semibold">Pulse</span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-zinc-400 hidden sm:inline">Modern Web Music Experience</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-zinc-400">
          <span className="hidden md:inline text-zinc-400">Streaming & Studio Audio</span>
          <span className="hidden md:inline text-zinc-600">•</span>
          <span className="text-zinc-300">
            {isPlaying ? 'Playing Now' : 'Ready'}
          </span>
        </div>
      </motion.div>

      {/* 3. Centerpiece: 3D Headphone with Flanking Website Capabilities */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full max-w-5xl">
        {/* Left Side: Website Features */}
        <div className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 text-[11px] font-mono text-zinc-400 pointer-events-none">
          <div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Streaming</div>
            <div className="text-white font-semibold">YouTube & Spotify Playlists</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Audio Trimmer</div>
            <div className="text-white font-semibold">Cut & Loop Any Song</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Studio Equalizer</div>
            <div className="text-signal-green font-semibold">10-Band Parametric Curves</div>
          </div>
        </div>

        {/* Right Side: Website Features */}
        <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 text-right text-[11px] font-mono text-zinc-400 pointer-events-none">
          <div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Visualizers</div>
            <div className="text-white font-semibold">Real-Time Waveforms & Orbs</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Synchronized Lyrics</div>
            <div className="text-white font-semibold">Live Timed Tracking</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Local & Cloud</div>
            <div className="text-signal-green font-semibold">Local Audio & File Uploads</div>
          </div>
        </div>

        {/* The 3D Volumetric Headphone */}
        <RotatingHeadphone
          isPlaying={isPlaying}
          isZooming={isZooming}
          onClick={handleTriggerEnter}
        />

        {/* Website Title & Entry Action Below Headphone */}
        <motion.div
          animate={isZooming ? { scale: 1.4, opacity: 0 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-[-20px] relative z-20 select-none cursor-pointer group"
          onClick={handleTriggerEnter}
        >
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl tracking-tight text-white leading-none group-hover:text-signal-green transition-colors">
            Pulse
          </h1>
          <p className="font-mono text-xs text-zinc-400 mt-3 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
            <span>Enter web platform</span>
            <ArrowUpRight size={14} className="text-signal-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </p>
        </motion.div>
      </div>

      {/* 4. Bottom Controls & Song Bar */}
      <motion.div
        animate={isZooming ? { y: 30, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-20 w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5"
      >
        {/* Current Active Song Identity & Play/Pause */}
        <div className="flex items-center gap-3 min-w-0">
          {onTogglePlay && (
            <button
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-signal-green transition-all shadow-md shrink-0 active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={16} fill="currentColor" />
              ) : (
                <Play size={16} fill="currentColor" className="ml-0.5" />
              )}
            </button>
          )}

          {currentTrack.art ? (
            <img
              src={currentTrack.art}
              alt={currentTrack.title}
              className="w-10 h-10 rounded object-cover border border-white/10 shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-white shrink-0">
              <Music size={16} />
            </div>
          )}

          <div className="min-w-0 text-left">
            <h4 className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-sm">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] text-zinc-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Action Suite: Audio Trimmer & Enter Platform */}
        <div className="flex items-center gap-3">
          {onOpenCutter && (
            <button
              onClick={onOpenCutter}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-lg text-xs font-mono flex items-center gap-2 transition-all hover:border-signal-green/40 group active:scale-95"
              title="Cut & loop this song"
            >
              <Scissors size={14} className="text-signal-green group-hover:rotate-12 transition-transform" />
              <span>Cut Current Song</span>
            </button>
          )}

          <button
            onClick={handleTriggerEnter}
            className="px-6 py-2.5 bg-white hover:bg-zinc-200 text-black font-semibold rounded-lg text-xs font-mono flex items-center gap-2 transition-all shadow-[0_0_24px_rgba(255,255,255,0.4)] active:scale-95 hover:scale-[1.02]"
          >
            <span>Enter Platform</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
