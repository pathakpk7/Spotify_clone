import React from 'react';
import { Activity, Headphones, Mic2, Sliders, Scissors, ShieldCheck, Download, ExternalLink } from 'lucide-react';

interface EditorialFooterProps {
  onOpenSpatial?: () => void;
  onOpenEQ?: () => void;
  onOpenLyrics?: () => void;
  onOpenCutter?: () => void;
  onPromptInstall?: () => void;
}

export const EditorialFooter: React.FC<EditorialFooterProps> = ({
  onOpenSpatial,
  onOpenEQ,
  onOpenLyrics,
  onOpenCutter,
  onPromptInstall
}) => {
  return (
    <footer className="mt-16 border-t border-white/[0.08] bg-[#07080a] text-zinc-400 font-body px-6 md:px-12 pt-12 pb-36 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/[0.08]">
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black border border-signal-green/30 flex items-center justify-center text-signal-green shadow-[0_0_12px_rgba(0,229,117,0.2)]">
              <Activity size={18} />
            </div>
            <span className="font-display font-extrabold text-lg text-white tracking-tight">Pulse</span>
            <span className="text-[10px] font-mono bg-white/10 text-signal-green px-1.5 py-0.5 rounded">v2.4 Hi-Fi</span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            High-fidelity audio streaming workstation featuring real-time Web Audio DSP, binaural 8D spatial sound, and synchronized lyrics.
          </p>

          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 pt-1">
            <ShieldCheck size={14} className="text-signal-green" />
            <span>Zero Server Latency • Client DSP</span>
          </div>
        </div>

        {/* Studio Tools */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-3">
            Studio Tools
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={onOpenSpatial}
                className="hover:text-signal-green transition-colors flex items-center gap-2"
              >
                <Headphones size={13} className="text-zinc-500" />
                <span>8D Audio & Room Reverb</span>
              </button>
            </li>
            <li>
              <button
                onClick={onOpenEQ}
                className="hover:text-signal-green transition-colors flex items-center gap-2"
              >
                <Sliders size={13} className="text-zinc-500" />
                <span>10-Band Equalizer</span>
              </button>
            </li>
            <li>
              <button
                onClick={onOpenLyrics}
                className="hover:text-signal-green transition-colors flex items-center gap-2"
              >
                <Mic2 size={13} className="text-zinc-500" />
                <span>Time-Synced Lyrics & Karaoke</span>
              </button>
            </li>
            {onOpenCutter && (
              <li>
                <button
                  onClick={onOpenCutter}
                  className="hover:text-signal-green transition-colors flex items-center gap-2"
                >
                  <Scissors size={13} className="text-zinc-500" />
                  <span>Precision Audio Cutter & Looper</span>
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Shortcuts */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-3">
            Keyboard Shortcuts
          </h4>
          <ul className="space-y-2 text-xs font-mono text-zinc-400">
            <li className="flex items-center justify-between">
              <span>Play / Pause</span>
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-white">Space</kbd>
            </li>
            <li className="flex items-center justify-between">
              <span>Next / Prev Track</span>
              <div className="flex gap-1">
                <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-white">+</kbd>
                <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-white">-</kbd>
              </div>
            </li>
            <li className="flex items-center justify-between">
              <span>Quick Search</span>
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-white">/</kbd>
            </li>
          </ul>
        </div>

        {/* Application & Install */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-3">
            Pulse Mobile & Desktop
          </h4>
          <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
            Install Pulse as a Progressive Web App (PWA) on iOS, Android, macOS, or Windows for full-screen offline audio.
          </p>

          <button
            onClick={onPromptInstall}
            className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-signal-green/40 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
          >
            <Download size={14} className="text-signal-green" />
            <span>Install Pulse Web App</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div>
          <span>© 2026 Pulse Audio Architecture. Engineered for lossless acoustic playback.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-green" />
            <span>Direct Audio Stream Active</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
