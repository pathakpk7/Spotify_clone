# Pulse — Flagship High-Fidelity Audio Architecture

A flagship, agency-grade digital audio streaming and local music workstation built with **React 18**, **TypeScript**, **Framer Motion**, and the **Web Audio API**.

Pulse implements **Method 1 (Headless Cloud CDN Streaming)** — the same high-performance architecture used by apps like **Deluxe Salon** (`deluxesalonplaylist.in`), allowing you to stream thousands of full-length songs with **0 MB server bandwidth costs**, zero buffering latency, and instant deployments.

---

## Architecture: Method 1 (Headless Stream CDN)

### Why this solves the "large files make the website slow" problem:
- **0 MB Server Overhead**: Audio files are not bundled in the Git repository or project folder.
- **Instant Global CDN Buffering**: YouTube's edge delivery network delivers high-bitrate audio packets on-demand.
- **Custom Native Controls**: Transport buttons (Play/Pause, Seek, Volume, Loop, Shuffle), scrubber hover previews, and 10-band Web Audio DSP equalizers control the stream invisibly.
- **Add Any Song in 3 Seconds**: Simply paste any YouTube or YouTube Music URL/ID, or add it to `src/data/streamCatalog.ts`.

---

## Flagship Capabilities

### 1. Curated Radio Stations (Deluxe Salon Style)
- **Late-Night Highway & Cassette Radio**: Nostalgic classic anthems and roadside melodies.
- **24/7 Lofi & Chillhop Radio**: Continuous relaxing study beats.
- **Midnight Synthwave & Cyber Drive**: Textured analog synthesizers, retro outrun, and modern synthwave.
- **Your Library / Custom Vault**: Real-time additions via URL or offline file import.

### 2. High-Resolution Audio Engine (Web Audio DSP)
- **10-Band Parametric Graphic Equalizer**: Real-time studio biquad filters ranging from 32Hz to 16kHz with visual decibel faders (-12dB to +12dB).
- **Studio EQ Presets**: Instant acoustic profile switching: Flat Reference, Bass Boost, Electronic Club, Vocal Clarity, Warm Acoustic, and High-Res Studio.
- **Dynamic Variable Speed**: Seamless playback rate attenuation (0.5x, 0.75x, 1.0x, 1.25x, 1.5x, 2.0x).

### 3. Multi-Mode Acoustic Canvas Visualizer
Real-time 60fps frequency extraction with four switchable aesthetic modes:
1. **Kinetic Organic Waveform**: Fluid multi-layer harmonic sine vectors reacting to live playback amplitude.
2. **64-Band Symmetrical Spectrum**: Precision decibel frequency bars with signal gradient illumination.
3. **Circular Holographic Radar**: Radial radar spectrum with reactive frequency spikes.
4. **Kinetic Particle Orb**: Floating celestial particle field pulsing dynamically to bass frequencies.

### 4. Local Music Vault (IndexedDB)
- **Folder & File Dropzone**: Drag and drop your own audio files or select an entire music folder from your computer.
- **Persistent Offline Storage**: Audio blobs and metadata are saved in client-side IndexedDB.

### 5. Studio Synchronized Lyrics
- Line-by-line active verse highlighting, clickable timecode seeking, and custom `.lrc` import tool.

### 6. Tactile 3D Vinyl Physical Interactions
- High-fidelity vinyl record sleeve presentation with interactive vinyl disc extraction, realistic groove sheen, and rotational kinematics synchronized to playback.

---

## How to Add Songs in the Backend (Method 1)

To add more songs permanently to the backend catalog, simply open `src/data/streamCatalog.ts` and add any YouTube track object:

```ts
{
  id: 'yt-my-song',
  title: 'Song Title',
  artist: 'Artist Name',
  album: 'Album or Station Name',
  duration: 240, // duration in seconds
  src: 'https://www.youtube.com/watch?v=VIDEO_ID',
  art: 'https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg',
  source: 'youtube',
  youtubeId: 'VIDEO_ID',
  qualityBadge: 'STREAM 256k'
}
```

Or paste any link directly into the **"Connect Spotify/YT"** modal in the running application!

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Space` | Play / Pause Stream |
| `←` / `→` | Previous / Next Track (or seek start if > 3s) |
| `↑` / `↓` | Volume Attenuation (+/- 5%) |
| `/` | Instant Catalog & Artist Search |

---

## Deploying to Production (Live in 60 seconds)

1. Push to your GitHub repository:
   ```bash
   git push origin main
   ```
2. Import the repository in [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Framework Preset: **Vite**. Output: **dist**.
4. Click **Deploy** — your live streaming platform is live worldwide!
