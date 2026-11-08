import { EQPreset } from '../types/music';

export const EQ_FREQUENCIES = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

export const EQ_PRESETS: EQPreset[] = [
  { name: 'Flat Reference', gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: 'Bass Boost', gains: [6, 5, 4, 2, 0, -1, -1, 0, 1, 2] },
  { name: 'Electronic Club', gains: [5, 4, 2, 0, -2, 2, 3, 4, 5, 5] },
  { name: 'Vocal Clarity', gains: [-3, -2, -1, 1, 4, 5, 4, 2, 1, 0] },
  { name: 'Warm Acoustic', gains: [3, 3, 2, 1, 2, 2, 1, 2, 3, 3] },
  { name: 'High-Res Studio', gains: [2, 1, 0, 0, 1, 2, 2, 3, 4, 4] }
];

class AudioEngine {
  private audio: HTMLAudioElement;
  private audioCtx: AudioContext | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private filters: BiquadFilterNode[] = [];
  private isInitialized = false;
  private activePreset: EQPreset = EQ_PRESETS[0];

  public onTimeUpdate?: (currentTime: number, duration: number) => void;
  public onStateChange?: (isPlaying: boolean) => void;
  public onEnded?: () => void;

  constructor() {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.crossOrigin = 'anonymous';

    this.audio.addEventListener('timeupdate', () => {
      if (this.onTimeUpdate) {
        this.onTimeUpdate(this.audio.currentTime, this.audio.duration || 0);
      }
    });

    this.audio.addEventListener('play', () => {
      if (this.onStateChange) this.onStateChange(true);
    });

    this.audio.addEventListener('pause', () => {
      if (this.onStateChange) this.onStateChange(false);
    });

    this.audio.addEventListener('ended', () => {
      if (this.onEnded) this.onEnded();
    });
  }

  public initWebAudio() {
    if (this.isInitialized) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      
      this.sourceNode = this.audioCtx.createMediaElementSource(this.audio);
      this.gainNode = this.audioCtx.createGain();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      // Create 10-band Equalizer filter chain
      let lastNode: AudioNode = this.sourceNode;
      this.filters = EQ_FREQUENCIES.map((freq, idx) => {
        if (!this.audioCtx) throw new Error('AudioContext unavailable');
        const filter = this.audioCtx.createBiquadFilter();
        if (idx === 0) {
          filter.type = 'lowshelf';
        } else if (idx === EQ_FREQUENCIES.length - 1) {
          filter.type = 'highshelf';
        } else {
          filter.type = 'peaking';
          filter.Q.value = 1.4;
        }
        filter.frequency.value = freq;
        filter.gain.value = this.activePreset.gains[idx] || 0;

        lastNode.connect(filter);
        lastNode = filter;
        return filter;
      });

      lastNode.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio initialization note (may need user gesture or CORS):', e);
    }
  }

  public async play(src?: string) {
    this.initWebAudio();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    if (src && this.audio.src !== src) {
      this.audio.src = src;
      this.audio.load();
    }

    try {
      await this.audio.play();
    } catch (err) {
      console.warn('Playback error or blocked by autoplay policy:', err);
    }
  }

  public pause() {
    this.audio.pause();
  }

  public seek(seconds: number) {
    if (isFinite(seconds)) {
      this.audio.currentTime = seconds;
    }
  }

  public setVolume(volume: number) {
    const clamped = Math.max(0, Math.min(1, volume));
    this.audio.volume = clamped;
  }

  public setPlaybackRate(rate: number) {
    this.audio.playbackRate = Math.max(0.5, Math.min(2.0, rate));
  }

  public getPlaybackRate(): number {
    return this.audio.playbackRate;
  }

  public setEQBand(index: number, gainDb: number) {
    if (this.filters[index]) {
      this.filters[index].gain.value = gainDb;
      this.activePreset.gains[index] = gainDb;
    }
  }

  public applyEQPreset(preset: EQPreset) {
    this.activePreset = { ...preset, gains: [...preset.gains] };
    this.filters.forEach((filter, idx) => {
      if (filter && preset.gains[idx] !== undefined) {
        filter.gain.value = preset.gains[idx];
      }
    });
  }

  public getActiveEQPreset(): EQPreset {
    return this.activePreset;
  }

  public getFrequencyData(): Uint8Array {
    if (this.analyser) {
      const data = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(data);
      return data;
    }
    return new Uint8Array(64).fill(0);
  }

  public getTimeDomainData(): Uint8Array {
    if (this.analyser) {
      const data = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteTimeDomainData(data);
      return data;
    }
    return new Uint8Array(64).fill(128);
  }

  public isPlaying(): boolean {
    return !this.audio.paused && !this.audio.ended && this.audio.readyState > 2;
  }

  public getCurrentTime(): number {
    return this.audio.currentTime;
  }

  public getDuration(): number {
    return this.audio.duration || 0;
  }
}

export const audioEngine = new AudioEngine();
