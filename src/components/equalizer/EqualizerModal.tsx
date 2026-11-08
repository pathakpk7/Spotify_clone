import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sliders, RotateCcw } from 'lucide-react';
import { audioEngine, EQ_FREQUENCIES, EQ_PRESETS } from '../../services/audioEngine';
import { EQPreset } from '../../types/music';

interface EqualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EqualizerModal: React.FC<EqualizerModalProps> = ({ isOpen, onClose }) => {
  const [activePreset, setActivePreset] = useState<EQPreset>(audioEngine.getActiveEQPreset());
  const [gains, setGains] = useState<number[]>([...activePreset.gains]);

  const handleGainChange = (index: number, val: number) => {
    const updated = [...gains];
    updated[index] = val;
    setGains(updated);
    audioEngine.setEQBand(index, val);
  };

  const handleSelectPreset = (preset: EQPreset) => {
    setActivePreset(preset);
    setGains([...preset.gains]);
    audioEngine.applyEQPreset(preset);
  };

  const handleReset = () => {
    handleSelectPreset(EQ_PRESETS[0]);
  };

  const formatFreq = (freq: number) => {
    return freq >= 1000 ? `${freq / 1000}k` : `${freq}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-[#111317] border border-white/10 rounded-md p-6 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-black border border-white/10 flex items-center justify-center text-signal-green">
                  <Sliders size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Studio Parametric Equalizer</h3>
                  <p className="text-xs font-mono text-zinc-400">10-Band Biquad Filters • Web Audio DSP</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw size={13} />
                  Reset Flat
                </button>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Presets Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
              <span className="text-xs font-mono uppercase text-zinc-500 whitespace-nowrap mr-2">Presets:</span>
              {EQ_PRESETS.map((preset) => {
                const isSelected = activePreset.name === preset.name;
                return (
                  <button
                    key={preset.name}
                    onClick={() => handleSelectPreset(preset)}
                    className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-signal-green text-black font-semibold'
                        : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {preset.name}
                  </button>
                );
              })}
            </div>

            {/* 10 Faders Grid */}
            <div className="grid grid-cols-10 gap-2 h-64 bg-black/50 border border-white/5 rounded-md p-4 items-end">
              {EQ_FREQUENCIES.map((freq, index) => {
                const gain = gains[index] || 0;
                return (
                  <div key={freq} className="flex flex-col items-center h-full justify-between">
                    <span className="text-[10px] font-mono text-zinc-400">
                      {gain > 0 ? `+${gain}` : gain}
                    </span>
                    <div className="relative flex items-center justify-center h-44 w-full">
                      <input
                        type="range"
                        min="-12"
                        max="12"
                        step="0.5"
                        value={gain}
                        onChange={(e) => handleGainChange(index, parseFloat(e.target.value))}
                        className="w-40 h-1 appearance-none bg-white/20 rounded-full cursor-pointer accent-signal-green -rotate-90 origin-center"
                      />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-zinc-300">
                      {formatFreq(freq)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Low-Shelf 32Hz</span>
              <span>Parametric Mid-Bands Q=1.4</span>
              <span>High-Shelf 16kHz</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
