import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Copy, Check, Music, Sparkles, Radio } from 'lucide-react';
import { Track } from '../../types/music';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: Track;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  currentTrack
}) => {
  const [copied, setCopied] = useState(false);

  // Generate shareable URL
  const getShareUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    if (currentTrack.source === 'youtube' && currentTrack.youtubeId) {
      return `${origin}/?yt=${currentTrack.youtubeId}`;
    }
    return `${origin}/?track=${encodeURIComponent(currentTrack.id)}`;
  };

  const shareUrl = getShareUrl();

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Ignored
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentTrack.title} — ${currentTrack.artist}`,
          text: `Listening to "${currentTrack.title}" by ${currentTrack.artist} on Pulse Hi-Fi Audio`,
          url: shareUrl
        });
      } catch {
        // Ignored or cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm bg-[#0e1014] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col items-center select-none"
          >
            {/* Header */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Sparkles size={14} className="text-signal-green" />
                <span>Share Music Card</span>
              </span>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* The Aesthetic Story Card */}
            <div className="w-full relative aspect-[9/13] rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/15 bg-gradient-to-b from-[#141822] via-[#090b0e] to-black">
              {/* Blurred artwork background backdrop */}
              {currentTrack.art && (
                <div
                  className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-125"
                  style={{ backgroundImage: `url(${currentTrack.art})` }}
                />
              )}

              {/* Card Top Brand */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-signal-green text-black flex items-center justify-center font-bold text-xs">
                    P
                  </div>
                  <span className="font-display font-bold text-xs tracking-wider text-white">PULSE</span>
                </div>
                <span className="font-mono text-[9px] bg-white/10 text-zinc-300 px-2 py-0.5 rounded-full border border-white/10">
                  HI-FI AUDIO
                </span>
              </div>

              {/* Center Artwork */}
              <div className="relative z-10 flex flex-col items-center my-auto">
                <div className="w-44 h-44 rounded-xl overflow-hidden shadow-2xl border border-white/20 relative group">
                  {currentTrack.art ? (
                    <img
                      src={currentTrack.art}
                      alt={currentTrack.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                      <Music size={48} />
                    </div>
                  )}
                </div>

                {/* Animated Waveform Bars */}
                <div className="flex items-center gap-1 mt-4 h-6">
                  {[12, 22, 16, 24, 18, 14, 20, 15, 23, 17, 13, 21].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [h * 0.4, h, h * 0.4] }}
                      transition={{ repeat: Infinity, duration: 1.2 + (i % 4) * 0.2, ease: 'easeInOut' }}
                      className="w-1 bg-signal-green rounded-full opacity-80"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>

              {/* Card Bottom Track Details */}
              <div className="relative z-10">
                <h3 className="font-display font-bold text-base text-white truncate text-center">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-zinc-400 font-medium truncate text-center mt-0.5">
                  {currentTrack.artist}
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-zinc-500">
                  <span>Stream lossless</span>
                  <span>pulse.app</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full mt-4 space-y-2">
              <button
                onClick={handleNativeShare}
                className="w-full py-2.5 px-4 bg-signal-green hover:bg-signal-green-hover text-black font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,117,0.25)]"
              >
                <Share2 size={15} />
                <span>Share with Friends</span>
              </button>

              <button
                onClick={handleCopy}
                className="w-full py-2 px-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-mono text-xs rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-signal-green" />
                    <span>Deep Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Direct Stream URL</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
