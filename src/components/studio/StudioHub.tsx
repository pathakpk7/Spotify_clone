import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Headphones, 
  Building2, 
  Disc, 
  Mic2, 
  Sparkles, 
  Share2, 
  Download, 
  Sliders, 
  Radio, 
  Flame, 
  Volume2, 
  Check, 
  Infinity as InfinityIcon,
  Layers
} from 'lucide-react';
import { audioEngine, RoomPreset } from '../../services/audioEngine';
import { Track } from '../../types/music';

interface StudioHubProps {
  currentTrack: Track;
  isPlaying: boolean;
  onOpenLyrics: () => void;
  onOpenEQ: () => void;
  onOpenShare: () => void;
  isSmartAutoplay: boolean;
  onToggleSmartAutoplay: () => void;
  crossfadeDuration: number;
  onCrossfadeChange: (sec: number) => void;
  onPromptInstall: () => void;
  isInstallable?: boolean;
}

export const StudioHub: React.FC<StudioHubProps> = ({
  currentTrack,
  isPlaying,
  onOpenLyrics,
  onOpenEQ,
  onOpenShare,
  isSmartAutoplay,
  onToggleSmartAutoplay,
  crossfadeDuration,
  onCrossfadeChange,
  onPromptInstall,
  isInstallable = true
}) => {
  const [is8D, setIs8D] = useState(audioEngine.is8DEnabled());
  const [eightDSpeed, setEightDSpeed] = useState(0.12);
  const [eightDWidth, setEightDWidth] = useState(0.85);

  const [room, setRoom] = useState<RoomPreset>(audioEngine.getRoomPreset());
  const [isVinyl, setIsVinyl] = useState(audioEngine.isVinylWarmthEnabled());
  const [isKaraoke, setIsKaraoke] = useState(audioEngine.isKaraokeEnabled());

  useEffect(() => {
    setIs8D(audioEngine.is8DEnabled());
    const s = audioEngine.get8DSettings();
    setEightDSpeed(s.speed);
    setEightDWidth(s.width);
    setRoom(audioEngine.getRoomPreset());
    setIsVinyl(audioEngine.isVinylWarmthEnabled());
    setIsKaraoke(audioEngine.isKaraokeEnabled());
  }, []);

  const handleToggle8D = () => {
    const next = !is8D;
    setIs8D(next);
    audioEngine.toggle8DAudio(next, eightDSpeed, eightDWidth);
  };

  const handleSpeedChange = (val: number) => {
    setEightDSpeed(val);
    if (is8D) audioEngine.toggle8DAudio(true, val, eightDWidth);
  };

  const handleWidthChange = (val: number) => {
    setEightDWidth(val);
    if (is8D) audioEngine.toggle8DAudio(true, eightDSpeed, val);
  };

  const handleRoomSelect = (r: RoomPreset) => {
    setRoom(r);
    audioEngine.setRoomPreset(r);
  };

  const handleToggleVinyl = () => {
    const next = !isVinyl;
    setIsVinyl(next);
    audioEngine.toggleVinylWarmth(next, 0.45);
  };

  const handleToggleKaraoke = () => {
    const next = !isKaraoke;
    setIsKaraoke(next);
    audioEngine.toggleKaraokeMode(next);
  };

  const rooms: { id: RoomPreset; label: string }[] = [
    { id: 'dry', label: 'Studio (Dry)' },
    { id: 'hall', label: 'Concert Hall' },
    { id: 'cathedral', label: 'Cathedral' },
    { id: 'club', label: 'Tokyo Club' },
    { id: 'car', label: 'Car Cabin' }
  ];

  return (
    <section className="px-4 md:px-12 py-8 my-6 border-y border-white/[0.08] bg-black/40 backdrop-blur-sm select-none">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
              Studio Suite & Acoustic Enhancers
            </h2>
            <span className="text-[10px] font-mono bg-white/10 text-signal-green border border-signal-green/20 px-2 py-0.5 rounded-full uppercase">
              DSP v2.4
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time Web Audio DSP: 8D spatial panning, convolution room acoustics, vinyl warmth & karaoke isolation
          </p>
        </div>

        {/* Action Buttons: Lyrics, Story Card, PWA Install */}
        <div className="flex items-center flex-wrap gap-2 w-full lg:w-auto">
          <button
            onClick={onOpenLyrics}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Mic2 size={14} className="text-signal-green" />
            <span>Time-Synced Lyrics</span>
          </button>

          <button
            onClick={onOpenShare}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 size={14} className="text-blue-400" />
            <span>Share Story Card</span>
          </button>

          <button
            onClick={onPromptInstall}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,117,0.25)]"
          >
            <Download size={14} />
            <span>Install App</span>
          </button>
        </div>
      </div>

      {/* 4-Column Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: 8D BINAURAL ORBIT */}
        <div className={`p-4 rounded-xl border transition-all ${
          is8D ? 'bg-signal-green/10 border-signal-green/40 shadow-[0_0_20px_rgba(0,229,117,0.15)]' : 'bg-black/30 border-white/10'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Headphones size={16} className={is8D ? 'text-signal-green' : 'text-zinc-400'} />
              <span className="text-xs font-bold text-white">8D Spatial Audio</span>
            </div>
            <button
              onClick={handleToggle8D}
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                is8D ? 'bg-signal-green text-black' : 'bg-white/10 text-zinc-400'
              }`}
            >
              {is8D ? 'ON (ACTIVE)' : 'OFF'}
            </button>
          </div>

          <p className="text-[11px] text-zinc-400 mb-3 leading-snug">
            Orbits audio 360° across your headphones in a continuous spatial circle.
          </p>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>Orbit Speed</span>
              <span className="text-signal-green">{(eightDSpeed * 60).toFixed(0)} RPM</span>
            </div>
            <input
              type="range"
              min="0.04"
              max="0.25"
              step="0.01"
              value={eightDSpeed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              className="w-full h-1 appearance-none bg-white/20 rounded-full cursor-pointer accent-signal-green"
            />
          </div>
        </div>

        {/* CARD 2: VIRTUAL ROOM CONVOLVER */}
        <div className="p-4 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-blue-400" />
                <span className="text-xs font-bold text-white">Room Acoustics</span>
              </div>
              <span className="text-[10px] font-mono text-blue-400 uppercase">
                {room.toUpperCase()}
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 mb-3 leading-snug">
              Synthetic convolution reverb matching physical acoustic architecture.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {rooms.map((r) => (
              <button
                key={r.id}
                onClick={() => handleRoomSelect(r.id)}
                className={`px-2 py-1.5 rounded text-[10px] font-mono text-center transition-all truncate ${
                  room === r.id
                    ? 'bg-blue-500 text-white font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* CARD 3: ANALOG WARMTH & KARAOKE */}
        <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Disc size={16} className={isVinyl ? 'text-amber-400' : 'text-zinc-400'} />
                <span className="text-xs font-bold text-white">Analog Warmth</span>
              </div>
              <button
                onClick={handleToggleVinyl}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  isVinyl ? 'bg-amber-400 text-black' : 'bg-white/10 text-zinc-400'
                }`}
              >
                {isVinyl ? 'ON' : 'OFF'}
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Tape harmonic saturation with authentic subtle vinyl crackle.
            </p>
          </div>

          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Mic2 size={15} className={isKaraoke ? 'text-signal-green' : 'text-zinc-400'} />
                <span className="text-xs font-bold text-white">Karaoke Mode</span>
              </div>
              <button
                onClick={handleToggleKaraoke}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  isKaraoke ? 'bg-signal-green text-black' : 'bg-white/10 text-zinc-400'
                }`}
              >
                {isKaraoke ? 'ON' : 'OFF'}
              </button>
            </div>
            <p className="text-[10px] text-zinc-500">
              Attenuates center vocals for live sing-along.
            </p>
          </div>
        </div>

        {/* CARD 4: DJ CROSSFADE & SMART AUTOPLAY */}
        <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-purple-400" />
                <span className="text-xs font-bold text-white">DJ Crossfade</span>
              </div>
              <span className="text-[10px] font-mono text-purple-400 font-bold">
                {crossfadeDuration}s
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mb-2 leading-snug">
              Smooth gapless transition between consecutive tracks.
            </p>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={crossfadeDuration}
              onChange={(e) => onCrossfadeChange(parseInt(e.target.value, 10))}
              className="w-full h-1 appearance-none bg-white/20 rounded-full cursor-pointer accent-purple-400"
            />
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Smart Autoplay</span>
              <span className="text-[10px] text-zinc-500 block">Never-ending music stream</span>
            </div>
            <button
              onClick={onToggleSmartAutoplay}
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                isSmartAutoplay ? 'bg-signal-green text-black' : 'bg-white/10 text-zinc-400'
              }`}
            >
              {isSmartAutoplay ? 'ENABLED' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
