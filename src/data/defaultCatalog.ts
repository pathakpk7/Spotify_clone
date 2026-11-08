import { Track } from '../types/music';

// Real local workspace audio files present in repository
export const INITIAL_TRACKS: Track[] = [
  {
    id: 'local-1',
    title: 'music1.mp3',
    artist: 'Workspace Audio',
    album: 'Local Workspace Files',
    duration: 204,
    src: 'music1.mp3',
    source: 'local',
    qualityBadge: 'MP3 LOCAL',
    isLiked: false
  },
  {
    id: 'local-2',
    title: 'music2.mp3',
    artist: 'Workspace Audio',
    album: 'Local Workspace Files',
    duration: 180,
    src: 'music2.mp3',
    source: 'local',
    qualityBadge: 'MP3 LOCAL',
    isLiked: false
  },
  {
    id: 'local-3',
    title: 'music3.mp3',
    artist: 'Workspace Audio',
    album: 'Local Workspace Files',
    duration: 220,
    src: 'music3.mp3',
    source: 'local',
    qualityBadge: 'MP3 LOCAL',
    isLiked: false
  },
  {
    id: 'local-4',
    title: 'music4.mp3',
    artist: 'Workspace Audio',
    album: 'Local Workspace Files',
    duration: 195,
    src: 'music4.mp3',
    source: 'local',
    qualityBadge: 'MP3 LOCAL',
    isLiked: false
  }
];
