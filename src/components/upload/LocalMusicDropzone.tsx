import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, FolderOpen, FileAudio, CheckCircle2, Music } from 'lucide-react';
import { Track } from '../../types/music';
import { storageService } from '../../services/storageService';

interface LocalMusicDropzoneProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackUploaded: (track: Track) => void;
}

export const LocalMusicDropzone: React.FC<LocalMusicDropzoneProps> = ({
  isOpen,
  onClose,
  onTrackUploaded
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const folderInputRef = useRef<HTMLInputElement | null>(null);

  const processFiles = async (files: FileList | File[]) => {
    setIsProcessing(true);
    setStatusMsg(null);
    let count = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.name.match(/\.(mp3|wav|ogg|flac|m4a|aac)$/i) && !file.type.startsWith('audio/')) {
        continue;
      }

      const blobUrl = URL.createObjectURL(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      
      // Extract artist & title if in "Artist - Title" or "Title - Artist" format
      let artist = 'Local Audio';
      let title = cleanName;

      if (cleanName.includes(' - ')) {
        const parts = cleanName.split(' - ');
        artist = parts[0].trim();
        title = parts.slice(1).join(' - ').trim();
      }

      // Duration extraction
      const duration = await new Promise<number>((resolve) => {
        const tempAudio = new Audio();
        tempAudio.src = blobUrl;
        tempAudio.onloadedmetadata = () => {
          resolve(Math.round(tempAudio.duration) || 180);
        };
        tempAudio.onerror = () => resolve(180);
      });

      const ext = file.name.split('.').pop()?.toUpperCase() || 'AUDIO';
      const newTrack: Track = {
        id: `local-${Date.now()}-${i}`,
        title,
        artist,
        album: 'Imported Library',
        duration,
        src: blobUrl,
        source: 'upload',
        qualityBadge: `${ext} FILE`,
        addedAt: Date.now()
      };

      await storageService.saveCustomTrack(newTrack, file);
      onTrackUploaded(newTrack);
      count++;
    }

    setIsProcessing(false);
    if (count > 0) {
      setStatusMsg(`Imported ${count} audio ${count === 1 ? 'track' : 'tracks'} into local library`);
      setTimeout(() => {
        setStatusMsg(null);
        onClose();
      }, 1400);
    } else {
      setStatusMsg('No supported audio files (.mp3, .wav, .flac, .m4a, .ogg) found');
      setTimeout(() => setStatusMsg(null), 2500);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
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
            className="w-full max-w-lg bg-[#111317] border border-white/10 rounded-lg p-6 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-black border border-white/10 flex items-center justify-center text-signal-green">
                  <UploadCloud size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Import Local Music</h3>
                  <p className="text-xs font-mono text-zinc-400">Offline Playback • Persistent IndexedDB Storage</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Hidden native inputs */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="audio/*,.mp3,.wav,.ogg,.flac,.m4a"
              onChange={(e) => e.target.files && processFiles(e.target.files)}
              className="hidden"
            />
            <input
              ref={folderInputRef}
              type="file"
              // @ts-expect-error webkitdirectory is standard in browsers
              webkitdirectory=""
              directory=""
              multiple
              onChange={(e) => e.target.files && processFiles(e.target.files)}
              className="hidden"
            />

            {/* Dropzone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-signal-green bg-signal-green/10'
                  : 'border-white/15 bg-black/40 hover:border-white/30 hover:bg-black/60'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-signal-green mb-4">
                {isProcessing ? (
                  <Music size={28} className="animate-spin" />
                ) : (
                  <FileAudio size={28} />
                )}
              </div>

              <h4 className="font-semibold text-white text-base mb-1">
                {isProcessing ? 'Reading Audio Metadata...' : 'Drop Audio Files or Folders Here'}
              </h4>
              <p className="text-xs font-mono text-zinc-400 text-center mb-6">
                Supports MP3, WAV, FLAC, M4A, OGG with automatic duration & name detection
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/15 rounded text-xs font-mono text-white flex items-center gap-2 transition-colors"
                >
                  <FileAudio size={14} />
                  Select Audio Files
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    folderInputRef.current?.click();
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/15 rounded text-xs font-mono text-white flex items-center gap-2 transition-colors"
                >
                  <FolderOpen size={14} />
                  Select Music Folder
                </button>
              </div>
            </div>

            {/* Status */}
            {statusMsg && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-white/10 border border-white/20 rounded flex items-center gap-2 text-xs font-mono text-white"
              >
                <CheckCircle2 size={16} className="text-signal-green shrink-0" />
                <span>{statusMsg}</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
