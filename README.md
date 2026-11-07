# Pulse — High-Fidelity Music Experience

A distinctive, agency-grade digital music player engineered with high-precision typography, real audio playback, Web Audio API acoustic visualizers, and an intentional editorial aesthetic.

Designed from the ground up to eliminate generic AI design tropes (no generic purple gradients, no pill badges, no squircle card overload) in favor of deep obsidian surfaces, signal emerald telemetry accents, tactile physics, and clean composition.

---

## Key Features

- **Real Audio Engine**: Directly wired to local high-fidelity audio tracks with HTML5 audio playback and Web Audio API integration.
- **Acoustic Waveform Visualizer**: Live real-time canvas visualizer rendering dynamic acoustic harmonic waves synchronized to sound playback.
- **Bespoke Editorial Typography**:
  - **Syne** (Weights 700, 800) for sculptural display headlines.
  - **Plus Jakarta Sans** for crisp, effortless interface readability.
  - **JetBrains Mono** strictly reserved for precision audio timestamps and telemetry metrics.
- **Hardware-Inspired Audio Console**:
  - Transport controls (Play/Pause, Prev, Next, Loop, Shuffle).
  - High-precision scrubber bar with hover time preview.
  - Volume attenuation with quick mute toggle.
  - Interactive playback queue flyout and sound device manager.
- **Tactile Interactive Details**:
  - Vinyl record interaction with realistic groove shine and smooth rotational kinematics.
  - Borderless, content-first album and artist cards with spring-eased hover lift.
  - Real-time catalog search filtering artists, tracks, and genres on keystroke.
  - Responsive layout for desktop, tablet, and mobile viewports.
  - Full keyboard accessibility and `prefers-reduced-motion` compliance.

---

## Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `Space` | Play / Pause |
| `←` / `→` | Previous / Next Track |
| `↑` / `↓` | Volume Up / Down |
| `/` | Instant Catalog Search |

---

## Architecture & Codebase

- `index.html`: Semantic, accessible DOM structure with editorial hierarchy and zero AI-slop containers.
- `style.css`: Bespoke design system utilizing CSS custom properties, Apple-grade spring easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`), and carbon/obsidian surfaces.
- `script.js`: Audio playback engine, Web Audio API analyser, real-time search engine, custom carousel touch/drag gestures, and telemetry state management.
