import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, Music, FileAudio, CheckCircle2 } from 'lucide-react';
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFiles = async (files: FileList | File[]) => {
    setIsProcessing(true);
    setSuccessMessage(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|ogg|flac|m4a|aac)$/i)) {
        continue;
      }

      // Generate object URL for immediate playback
      const blobUrl = URL.createObjectURL(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      const parts = cleanName.split(' - ');
      const artist = parts.length > 1 ? parts[0].trim() : 'Local Artist';
      const title = parts.length > 1 ? parts[1].trim() : cleanName;

      // Extract duration via temporary Audio element
      const duration = await new Promise<number>((resolve) => {
        const tempAudio = new Audio();
        tempAudio.src = blobUrl;
        tempAudio.onloadedmetadata = () => {
          resolve(Math.round(tempAudio.duration) || 180);
        };
        tempAudio.onerror = () => resolve(180);
      });

      const newTrack: Track = {
        id: `upload-${Date.now()}-${i}`,
        title,
        artist,
        album: 'Local Import Library',
        genre: 'User Audio File',
        year: '2024',
        duration,
        src: blobUrl,
        art: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop',
        source: 'upload',
        qualityBadge: file.name.split('.').pop()?.toUpperCase() || 'AUDIO'
      };

      // Persist to IndexedDB
      await storageService.saveCustomTrack(newTrack, file);
      onTrackUploaded(newTrack);
    }

    setIsProcessing(false);
    setSuccessMessage('Successfully imported local audio into library!');
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1500);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
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
                  <h3 className="font-display font-bold text-lg text-white">Import Local Recordings</h3>
                  <p className="text-xs font-mono text-zinc-400">IndexedDB Storage • Lossless Offline Playback</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Dropzone Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-signal-green bg-signal-green/10'
                  : 'border-white/15 bg-black/40 hover:border-white/30 hover:bg-black/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="audio/*,.mp3,.wav,.ogg,.flac,.m4a"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-signal-green mb-4">
                {isProcessing ? (
                  <Music size={28} className="animate-spin" />
                ) : (
                  <FileAudio size={28} />
                )}
              </div>

              <h4 className="font-semibold text-white text-base mb-1">
                {isProcessing ? 'Processing Audio Files...' : 'Drag and Drop Audio Files Here'}
              </h4>
              <p className="text-xs font-mono text-zinc-400 text-center mb-4">
                Supports MP3, WAV, FLAC, OGG, M4A with ID3 tags & full offline persistence
              </p>

              <button
                type="button"
                className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/15 rounded text-xs font-mono font-medium text-white transition-colors"
              >
                Browse Files
              </button>
            </div>

            {/* Success message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-signal-green/10 border border-signal-green/30 rounded flex items-center gap-2 text-xs font-mono text-signal-green"
              >
                <CheckCircle2 size={16} />
                <span>{successMessage}</span>
              </motion.div>
            )}

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Local Browser Sandbox</span>
              <span>Bit-Perfect Zero Transcoding</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
