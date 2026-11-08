# Pulse — Flagship High-Fidelity Audio Architecture

A flagship, agency-grade digital audio streaming and local music workstation built with **React 18**, **TypeScript**, **Framer Motion**, and the **Web Audio API**.

Pulse bridges studio-grade local audio listening with seamless streaming integration (Spotify Web API & YouTube Music), tactile physical interactions, and parametric DSP audio processing.

---

## Flagship Capabilities

### 1. High-Resolution Audio Engine (Web Audio DSP)
- **10-Band Parametric Graphic Equalizer**: Real-time studio biquad filters ranging from 32Hz to 16kHz with visual decibel faders (-12dB to +12dB).
- **Studio EQ Presets**: Instant acoustic profile switching: Flat Reference, Bass Boost, Electronic Club, Vocal Clarity, Warm Acoustic, and High-Res Studio.
- **Dynamic Variable Speed**: Seamless playback rate attenuation (0.5x, 0.75x, 1.0x, 1.25x, 1.5x, 2.0x) without pitch distortion.
- **Bit-Perfect Lossless Playback**: Support for local FLAC, WAV, MP3, OGG, and M4A audio files.

### 2. Multi-Mode Acoustic Canvas Visualizer
Real-time 60fps frequency extraction via Web Audio API `AnalyserNode` with four switchable aesthetic modes:
1. **Kinetic Organic Waveform**: Fluid multi-layer harmonic sine vectors responding to live amplitude.
2. **64-Band Symmetrical Spectrum**: Precision decibel frequency bars with signal gradient illumination.
3. **Circular Holographic Radar**: Radial radar spectrum with reactive frequency spikes.
4. **Kinetic Particle Orb**: Floating celestial particle field pulsing dynamically with sub-bass frequencies.

### 3. Local Music Vault (IndexedDB)
- **Zero-Transcode File Dropzone**: Drag and drop your own audio files directly into the browser.
- **Persistent Offline Storage**: Audio blobs and ID3 metadata are stored in client-side IndexedDB for persistent offline playback across browser sessions.

### 4. Streaming Integrations (Spotify & YouTube Music)
- **Spotify Web API Bridge**: Connect your Spotify credentials or explore curated high-resolution Spotify playlists and preview streams.
- **YouTube Music Streamer**: Paste any YouTube music video or track URL to stream directly through Pulse's audio engine with full EQ, visualizer, and lyrics support.

### 5. Studio Synchronized Lyrics
- Full-screen or modal studio lyrics experience with line-by-line active verse highlighting and clickable timecode seeking.

### 6. Tactile 3D Vinyl Physical Interactions
- High-fidelity vinyl record sleeve presentation with interactive vinyl disc extraction, realistic groove sheen, and rotational kinematics synchronized to playback.

### 7. Playlist & Queue Architecture
- Customizable user playlists with track count indicators.
- Sliding Framer Motion queue drawer with track reordering, removal, and quick playback jumping.

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Space` | Play / Pause Stream |
| `←` / `→` | Previous / Next Track (or seek start if > 3s) |
| `↑` / `↓` | Volume Attenuation (+/- 5%) |
| `/` | Instant Catalog & Artist Search |

---

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Animations**: Framer Motion
- **Audio DSP**: Web Audio API (BiquadFilterNode, AnalyserNode, MediaElementSourceNode)
- **Persistence**: IndexedDB + LocalStorage
- **Icons**: Lucide React
- **Styles**: Tailwind CSS + Custom Architectural Hairlines
- **Build Tool**: Vite 6
