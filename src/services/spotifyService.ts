import { Track } from '../types/music';

export const spotifyService = {
  // Extract Spotify resource ID and type
  parseSpotifyUrl(url: string): { type: 'track' | 'album' | 'playlist' | null; id: string | null } {
    const trackMatch = url.match(/spotify(?:\.com|\:)(?:embed\/)?(track|album|playlist)[\/:]([a-zA-Z0-9]+)/);
    if (trackMatch) {
      return {
        type: trackMatch[1] as 'track' | 'album' | 'playlist',
        id: trackMatch[2]
      };
    }
    return { type: null, id: null };
  },

  // Get real embed URL
  getEmbedUrl(url: string): string | null {
    const { type, id } = this.parseSpotifyUrl(url);
    if (type && id) {
      return `https://open.spotify.com/embed/${type}/${id}`;
    }
    return null;
  },

  // Fetch real metadata from Spotify official oEmbed API (free, no token needed)
  async fetchTrackFromUrl(url: string): Promise<Track | null> {
    const { type, id } = this.parseSpotifyUrl(url);
    if (!type || !id) return null;

    try {
      const oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
      const res = await fetch(oembedUrl);
      if (res.ok) {
        const data = await res.json();
        return {
          id: `spotify-${id}`,
          title: data.title || `Spotify ${type}`,
          artist: data.author_name || 'Spotify Artist',
          album: 'Spotify Stream',
          duration: 180,
          src: this.getEmbedUrl(url) || url,
          art: data.thumbnail_url || 'https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico',
          source: 'spotify',
          qualityBadge: 'SPOTIFY',
          spotifyUri: `spotify:${type}:${id}`
        };
      }
    } catch (e) {
      console.warn('Spotify oEmbed lookup note:', e);
    }

    // Fallback if oEmbed is offline
    return {
      id: `spotify-${id}`,
      title: `Spotify ${type.toUpperCase()} #${id.slice(0, 6)}`,
      artist: 'Spotify',
      album: 'Spotify Stream',
      duration: 180,
      src: this.getEmbedUrl(url) || url,
      source: 'spotify',
      qualityBadge: 'SPOTIFY',
      spotifyUri: `spotify:${type}:${id}`
    };
  }
};
