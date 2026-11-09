import { Track } from '../types/music';
import { ALL_STREAM_TRACKS } from './streamCatalog';

// Default initial tracks: Real streaming tracks via YouTube CDN (Method 1) + local audio files
export const INITIAL_TRACKS: Track[] = [
  ...ALL_STREAM_TRACKS,
  {
    id: 'local-1',
    title: 'music1.mp3',
    artist: 'Workspace Local Audio',
    album: 'Local Workspace Files',
    duration: 204,
    src: 'music1.mp3',
    source: 'local',
    qualityBadge: 'LOCAL FILE',
    isLiked: false
  },
  {
    id: 'local-2',
    title: 'music2.mp3',
    artist: 'Workspace Local Audio',
    album: 'Local Workspace Files',
    duration: 180,
    src: 'music2.mp3',
    source: 'local',
    qualityBadge: 'LOCAL FILE',
    isLiked: false
  },
  {
    id: 'local-3',
    title: 'music3.mp3',
    artist: 'Workspace Local Audio',
    album: 'Local Workspace Files',
    duration: 220,
    src: 'music3.mp3',
    source: 'local',
    qualityBadge: 'LOCAL FILE',
    isLiked: false
  },
  {
    id: 'local-4',
    title: 'music4.mp3',
    artist: 'Workspace Local Audio',
    album: 'Local Workspace Files',
    duration: 195,
    src: 'music4.mp3',
    source: 'local',
    qualityBadge: 'LOCAL FILE',
    isLiked: false
  }
];
