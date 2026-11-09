import { Track } from '../types/music';
import { storageService } from './storageService';

export const youtubeService = {
  // Extract YouTube video ID
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

  // Extract YouTube playlist ID
  extractPlaylistId(urlOrId: string): string | null {
    if (!urlOrId) return null;
    const match = urlOrId.match(/[&?]list=([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
    if (urlOrId.startsWith('PL') || urlOrId.startsWith('OLAK5uy_')) return urlOrId.trim();
    return null;
  },

  // Fetch real metadata for single video from YouTube oEmbed API
  async fetchTrackFromLink(urlOrId: string, customTitle?: string, customArtist?: string): Promise<Track | null> {
    const videoId = this.extractVideoId(urlOrId);
    if (!videoId) return null;

    let title = customTitle || '';
    let artist = customArtist || '';
    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`;
      const res = await fetch(oembedUrl);
      if (res.ok) {
        const data = await res.json();
        if (!title && data.title) title = data.title;
        if (!artist && data.author_name) artist = data.author_name;
      }
    } catch (e) {
      console.warn('YouTube oEmbed note:', e);
    }

    return {
      id: `yt-${videoId}`,
      title: title || `YouTube Audio (${videoId})`,
      artist: artist || 'YouTube Stream',
      album: 'YouTube Web Stream',
      duration: 210,
      src: `https://www.youtube.com/watch?v=${videoId}`,
      art: thumbnail,
      source: 'youtube',
      qualityBadge: 'STREAM 256k',
      youtubeId: videoId
    };
  },

  // Helper to parse tracks from YouTube ytInitialData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseInitialDataTracks(json: any): { title?: string; tracks: Track[] } {
    const tracks: Track[] = [];
    let playlistTitle: string | undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scan = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;

      if (!playlistTitle && obj.title && typeof obj.title === 'string' && obj.title.length > 2) {
        playlistTitle = obj.title;
      }

      if (obj.playlistVideoRenderer) {
        const r = obj.playlistVideoRenderer;
        const vId = r.videoId;
        const vTitle = r.title?.runs?.[0]?.text || r.title?.simpleText;
        const vArtist = r.shortBylineText?.runs?.[0]?.text || 'YouTube Music';
        const vDur = parseInt(r.lengthSeconds, 10) || 210;
        if (vId && vTitle && !tracks.some((t) => t.youtubeId === vId)) {
          tracks.push({
            id: `yt-${vId}`,
            title: vTitle,
            artist: vArtist,
            album: 'Live YouTube Station',
            duration: vDur,
            src: `https://www.youtube.com/watch?v=${vId}`,
            art: `https://img.youtube.com/vi/${vId}/hqdefault.jpg`,
            source: 'youtube',
            youtubeId: vId,
            qualityBadge: 'LIVE SYNC'
          });
        }
      }
      for (const k of Object.keys(obj)) {
        scan(obj[k]);
      }
    };

    scan(json);
    return { title: playlistTitle, tracks };
  },

  // Fetch live playlist tracks (Method A: Auto-sync from live YouTube)
  async syncPlaylistLive(playlistId: string): Promise<Track[]> {
    const conn = storageService.getConnections();
    const apiKey =
      (import.meta as unknown as { env: Record<string, string> }).env?.VITE_YOUTUBE_API_KEY ||
      conn?.youtube?.apiKey;

    // 1. If user configured an API key, use official YouTube Data API v3
    if (apiKey) {
      try {
        const allTracks: Track[] = [];
        let nextPageToken = '';

        for (let page = 0; page < 2; page++) {
          const pageParam = nextPageToken ? `&pageToken=${nextPageToken}` : '';
          const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}${pageParam}`;
          const res = await fetch(apiUrl);
          if (!res.ok) break;

          const json = await res.json();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const pageTracks = (json.items || []).map((item: any) => {
            const vId = item.snippet?.resourceId?.videoId;
            return {
              id: `yt-${vId}`,
              title: item.snippet?.title || 'YouTube Track',
              artist: item.snippet?.videoOwnerChannelTitle || item.snippet?.channelTitle || 'YouTube Music',
              album: 'Live YouTube Station',
              duration: 210,
              src: `https://www.youtube.com/watch?v=${vId}`,
              art: item.snippet?.thumbnails?.high?.url || `https://img.youtube.com/vi/${vId}/hqdefault.jpg`,
              source: 'youtube' as const,
              youtubeId: vId,
              qualityBadge: 'LIVE SYNC'
            };
          });

          allTracks.push(...pageTracks);
          nextPageToken = json.nextPageToken;
          if (!nextPageToken) break;
        }

        if (allTracks.length > 0) return allTracks;
      } catch (e) {
        console.warn('YouTube Data API note:', e);
      }
    }

    // 2. Fallback CORS Proxies to parse live playlist page HTML
    const proxyUrls = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.youtube.com/playlist?list=${playlistId}`)}`,
      `https://corsproxy.io/?url=${encodeURIComponent(`https://www.youtube.com/playlist?list=${playlistId}`)}`
    ];

    for (const pUrl of proxyUrls) {
      try {
        const res = await fetch(pUrl);
        if (res.ok) {
          const html = await res.text();
          const match = html.match(/var ytInitialData = ({.*?});<\/script>/s);
          if (match) {
            const json = JSON.parse(match[1]);
            const { tracks } = this.parseInitialDataTracks(json);
            if (tracks.length > 0) return tracks;
          }
        }
      } catch (e) {
        console.warn(`Proxy ${pUrl} note:`, e);
      }
    }

    return [];
  },

  // Import a full playlist by link/id
  async fetchPlaylistDetails(urlOrId: string): Promise<{ title: string; tracks: Track[]; playlistId: string } | null> {
    const playlistId = this.extractPlaylistId(urlOrId);
    if (!playlistId) return null;

    const tracks = await this.syncPlaylistLive(playlistId);
    if (tracks.length === 0) return null;

    return {
      playlistId,
      title: `YouTube Playlist (${playlistId.slice(0, 8)})`,
      tracks
    };
  }
};
