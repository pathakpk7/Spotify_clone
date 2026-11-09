export type TrackSource = 'local' | 'upload' | 'spotify' | 'youtube';

export interface LyricLine {
  time: number; // in seconds
  text: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  src: string;
  art?: string;
  source: TrackSource;
  qualityBadge?: string;
  youtubeId?: string;
  spotifyUri?: string;
  lyrics?: LyricLine[];
  isLiked?: boolean;
  addedAt?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  trackIds: string[];
  coverArt?: string;
  isCustom?: boolean;
}

export interface EQPreset {
  name: string;
  gains: number[]; // 10 frequencies: 32Hz, 64Hz, 125Hz, 250Hz, 500Hz, 1kHz, 2kHz, 4kHz, 8kHz, 16kHz
}

export type VisualizerMode = 'waveform' | 'bars' | 'radial' | 'orb';

export interface ServiceConnection {
  spotify: {
    isConnected: boolean;
    username?: string;
    clientId?: string;
  };
  youtube: {
    isConnected: boolean;
    channelName?: string;
    apiKey?: string;
  };
}

export interface StreamChannel {
  id: string;
  name: string;
  description: string;
  playlistId?: string;
  spotifyPlaylistId?: string;
  spotifyEmbedUrl?: string;
  coverArt?: string;
  channelType?: 'youtube' | 'spotify' | 'ambient';
  tracks: Track[];
  lastSynced?: number;
}

