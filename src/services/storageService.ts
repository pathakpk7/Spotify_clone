import { Track, Playlist, ServiceConnection } from '../types/music';

const DB_NAME = 'PulseAudioDB';
const DB_VERSION = 1;
const TRACKS_STORE = 'custom_tracks';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(TRACKS_STORE)) {
        db.createObjectStore(TRACKS_STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export const storageService = {
  // Store custom audio blob & metadata
  async saveCustomTrack(track: Track, audioBlob?: Blob): Promise<void> {
    try {
      const db = await openDB();
      const tx = db.transaction(TRACKS_STORE, 'readwrite');
      const store = tx.objectStore(TRACKS_STORE);

      const record = {
        ...track,
        blob: audioBlob || null
      };

      await new Promise<void>((resolve, reject) => {
        const req = store.put(record);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.warn('IndexedDB save failed:', e);
    }
  },

  // Load all custom uploaded tracks
  async loadCustomTracks(): Promise<Track[]> {
    try {
      const db = await openDB();
      const tx = db.transaction(TRACKS_STORE, 'readonly');
      const store = tx.objectStore(TRACKS_STORE);

      return new Promise<Track[]>((resolve) => {
        const req = store.getAll();
        req.onsuccess = () => {
          const records = req.result || [];
          const tracks: Track[] = records.map((rec) => {
            let src = rec.src;
            if (rec.blob) {
              src = URL.createObjectURL(rec.blob);
            }
            return {
              id: rec.id,
              title: rec.title,
              artist: rec.artist,
              album: rec.album || 'Local Library',
              duration: rec.duration || 180,
              src,
              art: rec.art,
              source: rec.source || 'upload',
              qualityBadge: rec.qualityBadge || 'LOCAL FILE',
              lyrics: rec.lyrics,
              isLiked: rec.isLiked
            };
          });
          resolve(tracks);
        };
        req.onerror = () => resolve([]);
      });
    } catch {
      return [];
    }
  },

  // Delete track from local DB
  async deleteCustomTrack(id: string): Promise<void> {
    try {
      const db = await openDB();
      const tx = db.transaction(TRACKS_STORE, 'readwrite');
      const store = tx.objectStore(TRACKS_STORE);
      await new Promise<void>((resolve) => {
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => resolve();
      });
    } catch (e) {
      console.warn('Delete track failed:', e);
    }
  },

  // Playlists in LocalStorage
  getPlaylists(): Playlist[] {
    try {
      const saved = localStorage.getItem('pulse_playlists');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { id: 'liked', name: 'Liked Songs', trackIds: [], isCustom: false }
    ];
  },

  savePlaylists(playlists: Playlist[]) {
    try {
      localStorage.setItem('pulse_playlists', JSON.stringify(playlists));
    } catch (e) {
      console.error(e);
    }
  },

  // Liked Tracks IDs
  getLikedTrackIds(): string[] {
    try {
      const saved = localStorage.getItem('pulse_liked_tracks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  },

  saveLikedTrackIds(ids: string[]) {
    try {
      localStorage.setItem('pulse_liked_tracks', JSON.stringify(ids));
    } catch (e) {
      console.error(e);
    }
  },

  // Service Connections
  getConnections(): ServiceConnection {
    try {
      const saved = localStorage.getItem('pulse_service_connections');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      spotify: { isConnected: false },
      youtube: { isConnected: false }
    };
  },

  saveConnections(connections: ServiceConnection) {
    try {
      localStorage.setItem('pulse_service_connections', JSON.stringify(connections));
    } catch (e) {
      console.error(e);
    }
  }
};
