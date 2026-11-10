import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Headphones, 
  Disc, 
  Compass, 
  Building2, 
  Car, 
  Sparkles, 
  Radio, 
  Flame,
  Volume2
} from 'lucide-react';
import { audioEngine, RoomPreset } from '../../services/audioEngine';

interface SpatialAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpatialAudioModal: React.FC<SpatialAudioModalProps> = ({ isOpen, onClose }) => {
  const [is8DEnabled, setIs8DEnabled] = useState(audioEngine.is8DEnabled());
  const [eightDSpeed, setEightDSpeed] = useState(0.12);
  const [eightDWidth, setEightDWidth] = useState(0.85);

  const [currentRoom, setCurrentRoom] = useState<RoomPreset>(audioEngine.getRoomPreset());
  const [isVinylEnabled, setIsVinylEnabled] = useState(audioEngine.isVinylWarmthEnabled());
  const [vinylIntensity, setVinylIntensity] = useState(0.4);

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      const s = audioEngine.get8DSettings();
      setIs8DEnabled(s.enabled);
      setEightDSpeed(s.speed);
      setEightDWidth(s.width);
      setCurrentRoom(audioEngine.getRoomPreset());
      setIsVinylEnabled(audioEngine.isVinylWarmthEnabled());
    }
  }, [isOpen]);

  const handleToggle8D = (enabled: boolean) => {
    setIs8DEnabled(enabled);
    audioEngine.toggle8DAudio(enabled, eightDSpeed, eightDWidth);
  };

  const handleSpeedChange = (speed: number) => {
    setEightDSpeed(speed);
    if (is8DEnabled) {
      audioEngine.toggle8DAudio(true, speed, eightDWidth);
    }
  };

  const handleWidthChange = (width: number) => {
    setEightDWidth(width);
    if (is8DEnabled) {
      audioEngine.toggle8DAudio(true, eightDSpeed, width);
    }
  };

  const handleSelectRoom = (preset: RoomPreset) => {
    setCurrentRoom(preset);
    audioEngine.setRoomPreset(preset);
  };

  const handleToggleVinyl = (enabled: boolean) => {
    setIsVinylEnabled(enabled);
    audioEngine.toggleVinylWarmth(enabled, vinylIntensity);
  };

  const handleVinylIntensityChange = (val: number) => {
    setVinylIntensity(val);
    if (isVinylEnabled) {
      audioEngine.toggleVinylWarmth(true, val);
    }
  };

  const roomPresets: { id: RoomPreset; name: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'dry', name: 'Studio Reference', desc: 'Direct, pristine flat acoustics', icon: <Volume2 size={16} /> },
    { id: 'hall', name: 'Concert Hall', desc: 'Warm, expansive acoustic reflections', icon: <Building2 size={16} /> },
    { id: 'cathedral', name: 'Cathedral', desc: 'Ethereal, vast multi-second decay', icon: <Sparkles size={16} /> },
    { id: 'club', name: 'Tokyo Underground', desc: 'Dense reflections with punchy bass', icon: <Radio size={16} /> },
    { id: 'car', name: 'Late-Night Car', desc: 'Tight, intimate cabin acoustics', icon: <Car size={16} /> }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl bg-[#0e1014] border border-white/10 rounded-t-2xl sm:rounded-xl shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden select-none"
          >
            {/* Mobile Drag Indicator */}
            <div className="sm:hidden pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-signal-green/10 text-signal-green flex items-center justify-center">
                  <Headphones size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white leading-none">
                    Spatial & Acoustic Studio
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mt-1">
                    Binaural 8D, Virtual Spaces & Analog Saturation
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* SECTION 1: 8D BINAURAL ORBIT */}
              <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Compass size={18} className="text-signal-green" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">8D Audio & Binaural Orbit</h4>
                      <p className="text-[11px] text-zinc-400">Rotates the sound stage 360° around your headphones</p>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={() => handleToggle8D(!is8DEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      is8DEnabled ? 'bg-signal-green' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-black shadow-md transition-transform ${
                        is8DEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {is8DEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-2 border-t border-white/10"
                  >
                    {/* Orbit Visualizer Orb */}
                    <div className="h-16 relative flex items-center justify-center bg-black/60 rounded-lg overflow-hidden border border-white/5">
                      <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-zinc-400">
                        <Headphones size={16} />
                      </div>
                      {/* Animated rotating sound indicator */}
                      <motion.div
                        animate={{ x: [-80, 80, -80] }}
                        transition={{ repeat: Infinity, duration: 1 / eightDSpeed, ease: 'easeInOut' }}
                        className="absolute w-3 h-3 rounded-full bg-signal-green shadow-[0_0_12px_#00e575]"
                      />
                    </div>

                    {/* Orbit Speed Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-zinc-400">
                        <span>Orbit Speed</span>
                        <span className="text-signal-green font-bold">{(eightDSpeed * 60).toFixed(0)} RPM</span>
                      </div>
                      <input
                        type="range"
                        min="0.04"
                        max="0.30"
                        step="0.01"
                        value={eightDSpeed}
                        onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                        className="w-full h-1.5 appearance-none bg-white/20 rounded-full cursor-pointer accent-signal-green"
                      />
                    </div>

                    {/* Spatial Width Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-zinc-400">
                        <span>Spatial Width</span>
                        <span className="text-signal-green font-bold">{(eightDWidth * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.3"
                        max="1.0"
                        step="0.05"
                        value={eightDWidth}
                        onChange={(e) => handleWidthChange(parseFloat(e.target.value))}
                        className="w-full h-1.5 appearance-none bg-white/20 rounded-full cursor-pointer accent-signal-green"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* SECTION 2: VIRTUAL ROOM ACOUSTICS */}
              <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center gap-2.5 mb-1">
                  <Building2 size={18} className="text-blue-400" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Virtual Room Acoustics</h4>
                    <p className="text-[11px] text-zinc-400">Convolution reverb simulating realistic architectural spaces</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {roomPresets.map((r) => {
                    const isSelected = currentRoom === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => handleSelectRoom(r.id)}
                        className={`p-3 rounded-lg border text-left flex items-start gap-3 transition-all ${
                          isSelected
                            ? 'bg-blue-500/15 border-blue-400/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                            : 'bg-black/30 border-white/5 hover:border-white/20 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className={`p-1.5 rounded ${isSelected ? 'text-blue-400 bg-blue-500/20' : 'text-zinc-500 bg-white/5'}`}>
                          {r.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                            {r.name}
                          </div>
                          <div className="text-[10px] text-zinc-500 leading-tight mt-0.5">{r.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: ANALOG VINYL & TAPE WARMTH */}
              <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Disc size={18} className="text-amber-400" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Analog Vinyl & Tape Saturation</h4>
                      <p className="text-[11px] text-zinc-400">Vintage harmonic warmth and authentic micro-crackle</p>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={() => handleToggleVinyl(!isVinylEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      isVinylEnabled ? 'bg-amber-400' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-black shadow-md transition-transform ${
                        isVinylEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {isVinylEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 pt-2 border-t border-white/10"
                  >
                    <div className="flex justify-between text-xs font-mono text-zinc-400">
                      <span>Warmth & Crackle Intensity</span>
                      <span className="text-amber-400 font-bold">{(vinylIntensity * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={vinylIntensity}
                      onChange={(e) => handleVinylIntensityChange(parseFloat(e.target.value))}
                      className="w-full h-1.5 appearance-none bg-white/20 rounded-full cursor-pointer accent-amber-400"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
