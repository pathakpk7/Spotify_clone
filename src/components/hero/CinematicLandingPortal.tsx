import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Track } from '../../types/music';
import { RotatingHeadphone } from './RotatingHeadphone';
import { CardioWaveform } from './CardioWaveform';

interface CinematicLandingPortalProps {
  isPlaying: boolean;
  onEnterMain: () => void;
  currentTrack?: Track;
  onOpenCutter?: () => void;
  onTogglePlay?: () => void;
}

export const CinematicLandingPortal: React.FC<CinematicLandingPortalProps> = ({
  isPlaying,
  onEnterMain
}) => {
  const [isZooming, setIsZooming] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      className="fixed inset-0 w-full h-[100dvh] z-50 flex flex-col items-center justify-between px-4 sm:px-12 py-4 sm:py-10 overflow-hidden bg-[#040507] select-none"
    >
      {/* 1. Fluid Background Heartbeat Waveform */}
      <CardioWaveform isPlaying={isPlaying} />

      {/* 2. Top Minimal Living Header */}
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

      {/* 3. Centerpiece: 3D Volumetric Headphone & Pulsating "Pulse" Entrance */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full max-w-5xl">
        {/* Left Side: Website Features */}
        <div className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 text-[11px] font-mono text-zinc-400 pointer-events-none">
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Acoustic Space</div>
            <div className="text-signal-green font-semibold">8D Spatial & Binaural Orbit</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">DSP Convolver</div>
            <div className="text-white font-semibold">Virtual Architectural Reverb</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Analog Color</div>
            <div className="text-white font-semibold">Vintage Vinyl & Tape Warmth</div>
          </div>
        </div>

        {/* Right Side: Website Features */}
        <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 text-right text-[11px] font-mono text-zinc-400 pointer-events-none">
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Sing-Along</div>
            <div className="text-signal-green font-semibold">Synced Lyrics & Karaoke Mode</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Seamless Flow</div>
            <div className="text-white font-semibold">DJ Crossfade & Smart Autoplay</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Social & Mobile</div>
            <div className="text-white font-semibold">PWA Install & 9:16 Story Cards</div>
          </div>
        </div>

        {/* The 3D Volumetric Headphone */}
        <RotatingHeadphone
          isPlaying={isPlaying}
          isZooming={isZooming}
          onClick={handleTriggerEnter}
        />

        {/* Interactive "Pulse" Entrance with Pulsating Hover Effect */}
        <div className="mt-[-20px] relative z-20 flex flex-col items-center">
          <motion.div
            animate={
              isZooming
                ? { scale: 1.5, opacity: 0 }
                : isHovered
                ? {
                    scale: [1, 1.05, 1],
                    filter: [
                      'drop-shadow(0 0 15px rgba(255,255,255,0.4))',
                      'drop-shadow(0 0 35px rgba(0,229,117,0.85))',
                      'drop-shadow(0 0 15px rgba(255,255,255,0.4))'
                    ]
                  }
                : {
                    scale: 1,
                    filter: 'drop-shadow(0 0 0px rgba(0,0,0,0))'
                  }
            }
            transition={
              isHovered
                ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleTriggerEnter}
            className="text-center select-none cursor-pointer group"
          >
            <h1
              className={`font-display font-extrabold text-6xl sm:text-8xl tracking-tight transition-colors duration-300 leading-none ${
                isHovered ? 'text-signal-green' : 'text-white'
              }`}
            >
              Pulse
            </h1>

            {/* Hover Floating Text: "Click to Enter" */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.65, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 flex items-center justify-center gap-2 font-mono text-xs group-hover:text-white transition-colors"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  isHovered ? 'bg-signal-green animate-ping' : 'bg-white/40'
                }`}
              />
              <span
                className={`tracking-widest uppercase text-xs font-semibold ${
                  isHovered ? 'text-signal-green' : 'text-zinc-400'
                }`}
              >
                Click to Enter
              </span>
              <ArrowUpRight
                size={14}
                className={`transition-transform duration-300 ${
                  isHovered ? 'text-signal-green translate-x-1 -translate-y-1' : 'text-zinc-500'
                }`}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 4. Bottom Clean Minimal Spacer */}
      <div className="h-6 w-full max-w-6xl flex items-center justify-center text-[10px] font-mono text-zinc-600">
        <span>Press anywhere on Pulse or Headphone to enter</span>
      </div>
    </motion.div>
  );
};
