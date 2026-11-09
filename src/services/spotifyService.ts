import { Track, StreamChannel } from '../types/music';

export const spotifyService = {
  // Extract Spotify resource ID and type
  parseSpotifyUrl(url: string): { type: 'track' | 'album' | 'playlist' | null; id: string | null } {
    if (!url) return { type: null, id: null };
    const clean = url.trim();
    const trackMatch = clean.match(/spotify(?:\.com|\:)(?:embed\/)?(track|album|playlist)[\/:]([a-zA-Z0-9]+)/);
    if (trackMatch) {
      return {
        type: trackMatch[1] as 'track' | 'album' | 'playlist',
        id: trackMatch[2]
      };
    }
    // If raw ID was pasted
    if (/^[a-zA-Z0-9]{22}$/.test(clean)) {
      return { type: 'playlist', id: clean };
    }
    return { type: null, id: null };
  },

  // Get Spotify iframe embed URL
  getEmbedUrl(idOrUrl: string, type: 'track' | 'album' | 'playlist' = 'playlist'): string {
    const parsed = this.parseSpotifyUrl(idOrUrl);
    const resolvedId = parsed.id || idOrUrl.trim();
    const resolvedType = parsed.type || type;
    return `https://open.spotify.com/embed/${resolvedType}/${resolvedId}?utm_source=generator&theme=0`;
  },

  // Fetch real metadata from Spotify official oEmbed API (free, no token needed)
  async fetchTrackFromUrl(url: string): Promise<Track | null> {
    const { type, id } = this.parseSpotifyUrl(url);
    if (!type || !id) return null;

    try {
      const oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(`https://open.spotify.com/${type}/${id}`)}`;
      const res = await fetch(oembedUrl);
      if (res.ok) {
        const data = await res.json();
        return {
          id: `spotify-${id}`,
          title: data.title || `Spotify ${type}`,
          artist: data.author_name || 'Spotify Artist',
          album: 'Spotify Stream',
          duration: 180,
          src: this.getEmbedUrl(id, type),
          art: data.thumbnail_url || 'https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico',
          source: 'spotify',
          qualityBadge: 'SPOTIFY',
          spotifyUri: `spotify:${type}:${id}`
        };
      }
    } catch (e) {
      console.warn('Spotify oEmbed note:', e);
    }

    return {
      id: `spotify-${id}`,
      title: `Spotify ${type.toUpperCase()} #${id.slice(0, 6)}`,
      artist: 'Spotify',
      album: 'Spotify Stream',
      duration: 180,
      src: this.getEmbedUrl(id, type),
      source: 'spotify',
      qualityBadge: 'SPOTIFY',
      spotifyUri: `spotify:${type}:${id}`
    };
  },

  // Helper to extract tracklist from embed page JSON
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseEmbedHtml(html: string, fallbackTitle?: string, fallbackCover?: string): { title?: string; tracks: Track[] } {
    const tracks: Track[] = [];
    let title = fallbackTitle;

    try {
      const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
      if (match) {
        const json = JSON.parse(match[1]);
        const entity = json.props?.pageProps?.state?.data?.entity;
        if (entity) {
          if (entity.name) title = entity.name;
          const list = entity.trackList || [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          list.forEach((t: any) => {
            const trackId = t.uri ? t.uri.replace('spotify:track:', '') : t.uid;
            const previewUrl = t.audioPreview?.url || '';
            tracks.push({
              id: `spotify-${trackId}`,
              title: t.title || 'Spotify Track',
              artist: t.subtitle || 'Spotify Artist',
              album: title || 'Spotify Playlist',
              duration: Math.round((t.duration || 180000) / 1000),
              src: previewUrl || `https://open.spotify.com/embed/track/${trackId}`,
              art: fallbackCover || 'https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico',
              source: 'spotify',
              qualityBadge: previewUrl ? 'PREVIEW 320k' : 'SPOTIFY EMBED',
              spotifyUri: t.uri
            });
          });
        }
      }
    } catch (e) {
      console.warn('Spotify parseEmbedHtml note:', e);
    }

    return { title, tracks };
  },

  // Fetch playlist details & tracks from Spotify
  async fetchPlaylistDetails(urlOrId: string, customName?: string): Promise<StreamChannel | null> {
    const { id } = this.parseSpotifyUrl(urlOrId);
    const playlistId = id || urlOrId.trim();
    if (!playlistId) return null;

    const fullUrl = `https://open.spotify.com/playlist/${playlistId}`;
    const embedUrl = this.getEmbedUrl(playlistId, 'playlist');

    let title = customName || `Spotify Playlist (${playlistId.slice(0, 8)})`;
    let coverArt = 'https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico';
    let tracks: Track[] = [];

    // 1. Fetch metadata from official oEmbed API
    try {
      const oembedRes = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(fullUrl)}`);
      if (oembedRes.ok) {
        const oembedData = await oembedRes.json();
        if (oembedData.title && !customName) title = oembedData.title;
        if (oembedData.thumbnail_url) coverArt = oembedData.thumbnail_url;
      }
    } catch (e) {
      console.warn('Spotify oEmbed fetch note:', e);
    }

    // 2. Fetch tracks from Embed HTML via CORS proxies
    const proxyUrls = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://open.spotify.com/embed/playlist/${playlistId}`)}`,
      `https://corsproxy.io/?url=${encodeURIComponent(`https://open.spotify.com/embed/playlist/${playlistId}`)}`
    ];

    for (const pUrl of proxyUrls) {
      try {
        const res = await fetch(pUrl);
        if (res.ok) {
          const html = await res.text();
          const parsed = this.parseEmbedHtml(html, title, coverArt);
          if (parsed.tracks.length > 0) {
            tracks = parsed.tracks;
            if (parsed.title && !customName) title = parsed.title;
            break;
          }
        }
      } catch (e) {
        console.warn(`Proxy ${pUrl} note:`, e);
      }
    }

    // If tracks could not be scraped via proxy, create a placeholder track that opens the embed player
    if (tracks.length === 0) {
      tracks.push({
        id: `spotify-embed-${playlistId}`,
        title: title,
        artist: 'Spotify Native Embed',
        album: 'Spotify Station',
        duration: 3600,
        src: embedUrl,
        art: coverArt,
        source: 'spotify',
        qualityBadge: 'NATIVE EMBED',
        spotifyUri: `spotify:playlist:${playlistId}`
      });
    }

    return {
      id: `spotify-channel-${playlistId}`,
      name: title,
      description: `Spotify Connected Playlist • Direct Access (${tracks.length} tracks)`,
      spotifyPlaylistId: playlistId,
      spotifyEmbedUrl: embedUrl,
      coverArt,
      channelType: 'spotify',
      tracks,
      lastSynced: Date.now()
    };
  },

  // Sync playlist live
  async syncPlaylistLive(playlistId: string): Promise<Track[]> {
    const details = await this.fetchPlaylistDetails(playlistId);
    return details ? details.tracks : [];
  }
};
