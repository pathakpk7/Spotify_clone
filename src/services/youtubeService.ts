import { Track } from '../types/music';

export const youtubeService = {
  curatedYoutubeTracks: [
    {
      id: 'yt-1',
      title: 'Resonance',
      artist: 'HOME',
      album: 'Odyssey',
      genre: 'Chillwave / Synth',
      year: '2014',
      duration: 212,
      src: 'music3.mp3',
      art: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&h=600&fit=crop',
      source: 'youtube' as const,
      qualityBadge: 'YT AUDIO HD'
    },
    {
      id: 'yt-2',
      title: 'After Dark',
      artist: 'Mr.Kitty',
      album: 'Time',
      genre: 'Darkwave',
      year: '2014',
      duration: 259,
      src: 'music4.mp3',
      art: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&h=600&fit=crop',
      source: 'youtube' as const,
      qualityBadge: 'YT AUDIO HD'
    }
  ] as Track[],

  // Extract YouTube ID from link
  extractVideoId(urlOrId: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = urlOrId.match(regExp);
    return (match && match[2].length === 11) ? match[2] : (urlOrId.length === 11 ? urlOrId : null);
  },

  // Create a track from pasted YouTube URL
  createTrackFromLink(url: string, title?: string, artist?: string): Track | null {
    const videoId = this.extractVideoId(url);
    if (!videoId) return null;

    return {
      id: `yt-${videoId}`,
      title: title || `YouTube Audio #${videoId.slice(0, 5)}`,
      artist: artist || 'YouTube Music Stream',
      genre: 'Web Stream',
      year: '2024',
      duration: 210,
      src: 'music1.mp3', // Stream fallback
      art: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      source: 'youtube',
      qualityBadge: 'YOUTUBE 256k',
      externalId: videoId
    };
  }
};
