import { Track } from '../types/music';

interface MediaSessionCallbacks {
  onPlay: () => void;
  onPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
}

class MediaSessionService {
  private callbacks: MediaSessionCallbacks | null = null;
  private isSupported = typeof window !== 'undefined' && 'mediaSession' in navigator;

  public init(callbacks: MediaSessionCallbacks) {
    this.callbacks = callbacks;
    if (!this.isSupported) return;

    try {
      navigator.mediaSession.setActionHandler('play', () => {
        this.callbacks?.onPlay();
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        this.callbacks?.onPause();
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        this.callbacks?.onPrev();
      });

      navigator.mediaSession.setActionHandler('nexttrack', () => {
        this.callbacks?.onNext();
      });

      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) {
          this.callbacks?.onSeek(details.seekTime);
        }
      });

      navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        const offset = details.seekOffset || 10;
        // Callback will handle offset
      });

      navigator.mediaSession.setActionHandler('seekforward', (details) => {
        const offset = details.seekOffset || 10;
      });
    } catch (e) {
      console.warn('MediaSession handler registration note:', e);
    }
  }

  public updateMetadata(track: Track) {
    if (!this.isSupported) return;

    try {
      const artwork = track.art ? [
        { src: track.art, sizes: '96x96', type: 'image/jpeg' },
        { src: track.art, sizes: '128x128', type: 'image/jpeg' },
        { src: track.art, sizes: '192x192', type: 'image/jpeg' },
        { src: track.art, sizes: '256x256', type: 'image/jpeg' },
        { src: track.art, sizes: '512x512', type: 'image/jpeg' },
      ] : [];

      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: track.album || 'Pulse Hi-Fi Stream',
        artwork
      });
    } catch (e) {
      console.warn('MediaSession metadata update note:', e);
    }
  }

  public updatePlaybackState(isPlaying: boolean) {
    if (!this.isSupported) return;
    try {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    } catch (e) {
      // Ignored
    }
  }

  public updatePositionState(duration: number, currentTime: number, playbackRate = 1) {
    if (!this.isSupported || !navigator.mediaSession.setPositionState) return;
    try {
      if (duration > 0 && isFinite(duration) && isFinite(currentTime)) {
        navigator.mediaSession.setPositionState({
          duration: Math.max(0, duration),
          playbackRate: Math.max(0.5, playbackRate),
          position: Math.max(0, Math.min(currentTime, duration))
        });
      }
    } catch {
      // Ignored
    }
  }
}

export const mediaSessionService = new MediaSessionService();
