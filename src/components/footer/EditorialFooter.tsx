import React from 'react';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

export const EditorialFooter: React.FC = () => {
  return (
    <footer className="mt-16 px-8 md:px-12 py-16 bg-[#0e1014] border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-black border border-white/10 flex items-center justify-center text-signal-green">
              <Activity size={18} />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-white">Pulse Hi-Fi</h3>
              <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Acoustic Audio Workstation</p>
            </div>
          </div>

          <p className="text-sm text-zinc-400 font-body leading-relaxed max-w-sm mb-6">
            Engineered for uncompromising high-resolution local playback, studio equalization, and seamless streaming integrations with zero latency.
          </p>

          <div className="flex flex-wrap gap-2 text-[11px] font-mono">
            <span className="px-2.5 py-1 bg-black/60 border border-white/10 rounded text-signal-green flex items-center gap-1.5">
              <Zap size={12} />
              Web Audio DSP
            </span>
            <span className="px-2.5 py-1 bg-black/60 border border-white/10 rounded text-zinc-400 flex items-center gap-1.5">
              <ShieldCheck size={12} />
              Local IndexedDB Vault
            </span>
          </div>
        </div>

        {/* Links Column */}
        <div className="md:col-span-3">
          <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400 mb-4">
            Architecture
          </span>
          <ul className="space-y-2.5 text-xs font-body text-zinc-400">
            <li><span className="text-white hover:text-signal-green cursor-pointer">Local Lossless Engine</span></li>
            <li><span className="text-white hover:text-signal-green cursor-pointer">Spotify Web Playback Bridge</span></li>
            <li><span className="text-white hover:text-signal-green cursor-pointer">YouTube Audio Streamer</span></li>
            <li><span className="text-white hover:text-signal-green cursor-pointer">10-Band Biquad Equalizer</span></li>
            <li><span className="text-white hover:text-signal-green cursor-pointer">Acoustic Waveform Visualizer</span></li>
          </ul>
        </div>

        {/* Keyboard Shortcuts Guide */}
        <div className="md:col-span-4">
          <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400 mb-4">
            Hardware Shortcuts
          </span>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-zinc-500">Play / Pause</span>
              <kbd className="px-2 py-0.5 bg-black/70 border border-white/15 rounded text-white text-[11px]">Space</kbd>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-zinc-500">Previous / Next</span>
              <kbd className="px-2 py-0.5 bg-black/70 border border-white/15 rounded text-white text-[11px]">← / →</kbd>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-zinc-500">Volume Level</span>
              <kbd className="px-2 py-0.5 bg-black/70 border border-white/15 rounded text-white text-[11px]">↑ / ↓</kbd>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-zinc-500">Focus Search</span>
              <kbd className="px-2 py-0.5 bg-black/70 border border-white/15 rounded text-white text-[11px]">/</kbd>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
        <span>© Pulse Flagship Audio Architecture. React, Framer Motion & TypeScript.</span>
        <span>Signal Path: 24-Bit / 96kHz Direct DSP</span>
      </div>
    </footer>
  );
};
