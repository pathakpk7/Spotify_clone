import React from 'react';

export const EditorialFooter: React.FC = () => {
  return (
    <footer className="mt-12 px-6 sm:px-12 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-signal-green" />
        <span className="text-zinc-300 font-semibold">Pulse</span>
        <span>•</span>
        <span>Web Music Player</span>
      </div>
      <div className="flex items-center gap-3 text-zinc-400">
        <span>Press <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-[10px] text-white font-mono">Space</kbd> to Play / Pause</span>
        <span>•</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
};
