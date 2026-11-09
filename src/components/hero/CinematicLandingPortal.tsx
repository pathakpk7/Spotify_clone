import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Volume2, Sparkles, Scissors, Disc3 } from 'lucide-react';
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
    }, 750);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isZooming ? 0 : 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="relative min-h-[620px] lg:min-h-[720px] w-full flex flex-col items-center justify-between px-6 py-12 overflow-hidden bg-[#050608] border-b border-white/10"
    >
      {/* 1. Fluid Background Heartbeat & Song Wave */}
      <CardioWaveform isPlaying={isPlaying} />

      {/* 2. Top Living Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex items-center gap-3 font-mono text-xs text-zinc-400"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_12px_#ffffff]" />
        <span className="tracking-widest uppercase text-zinc-300">Spatial Audio Engine</span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-500">24-Bit Studio Master</span>
      </motion.div>

      {/* 3. Centerpiece: 3D Rotating Headphone with Ambient White Halo */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <RotatingHeadphone
          isPlaying={isPlaying}
          isZooming={isZooming}
          onClick={handleTriggerEnter}
        />

        {/* Floating Living Title Below Headphone */}
        <motion.div
          animate={isZooming ? { scale: 0.8, opacity: 0 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mt-[-10px] relative z-20 select-none cursor-pointer"
          onClick={handleTriggerEnter}
        >
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-white leading-none hover:text-signal-green transition-colors">
            Pulse
          </h1>
          <p className="font-mono text-xs text-zinc-400 mt-2 flex items-center justify-center gap-2">
            <span>Click headphone to enter</span>
            <ArrowUpRight size={14} className="text-white" />
          </p>
        </motion.div>
      </div>

      {/* 4. Bottom Living Controls & Track Strip */}
      <motion.div
        animate={isZooming ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-20 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5"
      >
        {/* Current Active Song Identity */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0">
            <Volume2 size={15} className={isPlaying ? 'animate-pulse text-signal-green' : ''} />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-white truncate max-w-[220px] sm:max-w-xs">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] text-zinc-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Action Suite: Enter Experience & Audio Trimmer */}
        <div className="flex items-center gap-3">
          {onOpenCutter && (
            <button
              onClick={onOpenCutter}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-lg text-xs font-mono flex items-center gap-2 transition-all hover:border-signal-green/40 group active:scale-95"
              title="Cut & loop this song"
            >
              <Scissors size={14} className="text-signal-green group-hover:rotate-12 transition-transform" />
              <span>Cut Song</span>
            </button>
          )}

          <button
            onClick={handleTriggerEnter}
            className="px-5 py-2 bg-white hover:bg-zinc-200 text-black font-semibold rounded-lg text-xs font-mono flex items-center gap-2 transition-all shadow-[0_0_24px_rgba(255,255,255,0.35)] active:scale-95"
          >
            <span>Enter Platform</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
