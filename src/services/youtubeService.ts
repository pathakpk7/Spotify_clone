import { Track } from '../types/music';

export const youtubeService = {
  // Extract YouTube ID from link or input
  extractVideoId(urlOrId: string): string | null {
    if (!urlOrId) return null;
    const clean = urlOrId.trim();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = clean.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    return clean.length === 11 ? clean : null;
  },

  // Fetch real metadata from YouTube oEmbed API (free, zero API key needed)
  async fetchTrackFromLink(urlOrId: string, customTitle?: string, customArtist?: string): Promise<Track | null> {
    const videoId = this.extractVideoId(urlOrId);
    if (!videoId) return null;

    let title = customTitle || '';
    let artist = customArtist || '';
    let thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`;
      const res = await fetch(oembedUrl);
      if (res.ok) {
        const data = await res.json();
        if (!title && data.title) title = data.title;
        if (!artist && data.author_name) artist = data.author_name;
        if (data.thumbnail_url) thumbnail = data.thumbnail_url;
      }
    } catch (e) {
      console.warn('YouTube oEmbed note:', e);
    }

    return {
      id: `yt-${videoId}`,
      title: title || `YouTube Audio (${videoId})`,
      artist: artist || 'YouTube Stream',
      album: 'YouTube Web Stream',
      duration: 180,
      src: `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1`,
      art: thumbnail,
      source: 'youtube',
      qualityBadge: 'YOUTUBE STREAM',
      youtubeId: videoId
    };
  }
};
