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

export type RoomPreset = 'dry' | 'hall' | 'cathedral' | 'club' | 'car';

class AudioEngine {
  private audio: HTMLAudioElement;
  private audioCtx: AudioContext | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private filters: BiquadFilterNode[] = [];
  private isInitialized = false;
  private activePreset: EQPreset = EQ_PRESETS[0];

  // 8D Audio
  private stereoPanner: StereoPannerNode | null = null;
  private is8DActive = false;
  private eightDSpeed = 0.12; // Hz
  private eightDWidth = 0.85;
  private eightDAnimFrame: number | null = null;
  private eightDTime = 0;

  // Virtual Room Acoustics (Reverb)
  private convolverNode: ConvolverNode | null = null;
  private reverbWetGain: GainNode | null = null;
  private reverbDryGain: GainNode | null = null;
  private currentRoomPreset: RoomPreset = 'dry';

  // Analog Vinyl & Tape Saturation
  private waveshaperNode: WaveShaperNode | null = null;
  private isVinylWarmthActive = false;
  private vinylCrackleGain: GainNode | null = null;
  private vinylCrackleSource: AudioBufferSourceNode | null = null;

  // Karaoke Vocal Attenuator (Mid-Side Notch)
  private vocalFilter1: BiquadFilterNode | null = null;
  private vocalFilter2: BiquadFilterNode | null = null;
  private isKaraokeActive = false;

  // DJ Crossfade (Gapless Transition)
  private crossfadeDuration = 3; // Seconds (0 to 12)

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
      if (this.is8DActive) this.start8DLoop();
    });

    this.audio.addEventListener('pause', () => {
      if (this.onStateChange) this.onStateChange(false);
      this.stop8DLoop();
    });

    this.audio.addEventListener('ended', () => {
      if (this.onEnded) this.onEnded();
      this.stop8DLoop();
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

      // 1. Equalizer filter chain
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

      // 2. Karaoke Vocal Attenuation Filters (Dual notch filters around 1kHz - 3kHz center vocal range)
      this.vocalFilter1 = this.audioCtx.createBiquadFilter();
      this.vocalFilter1.type = 'peaking';
      this.vocalFilter1.frequency.value = 1800;
      this.vocalFilter1.Q.value = 2.0;
      this.vocalFilter1.gain.value = 0; // Disabled by default

      this.vocalFilter2 = this.audioCtx.createBiquadFilter();
      this.vocalFilter2.type = 'peaking';
      this.vocalFilter2.frequency.value = 3200;
      this.vocalFilter2.Q.value = 2.2;
      this.vocalFilter2.gain.value = 0;

      lastNode.connect(this.vocalFilter1);
      this.vocalFilter1.connect(this.vocalFilter2);
      lastNode = this.vocalFilter2;

      // 3. 8D Spatial Stereo Panner
      if (this.audioCtx.createStereoPanner) {
        this.stereoPanner = this.audioCtx.createStereoPanner();
        this.stereoPanner.pan.value = 0;
        lastNode.connect(this.stereoPanner);
        lastNode = this.stereoPanner;
      }

      // 4. Analog Tape / Vinyl Soft-Clipping Saturation
      this.waveshaperNode = this.audioCtx.createWaveShaper();
      this.waveshaperNode.curve = this.makeDistortionCurve(0);
      this.waveshaperNode.oversample = '4x';
      lastNode.connect(this.waveshaperNode);
      lastNode = this.waveshaperNode;

      // 5. Virtual Room Reverb Convolver & Dry/Wet Split
      this.convolverNode = this.audioCtx.createConvolver();
      this.reverbDryGain = this.audioCtx.createGain();
      this.reverbWetGain = this.audioCtx.createGain();
      this.reverbDryGain.gain.value = 1.0;
      this.reverbWetGain.gain.value = 0.0;

      lastNode.connect(this.reverbDryGain);
      lastNode.connect(this.convolverNode);
      this.convolverNode.connect(this.reverbWetGain);

      // Mix Dry & Wet to Main Gain Node
      this.reverbDryGain.connect(this.gainNode);
      this.reverbWetGain.connect(this.gainNode);

      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio initialization note (may need user gesture or CORS):', e);
    }
  }

  // --- 8D Audio & Binaural Orbit ---
  public toggle8DAudio(enabled: boolean, speed = 0.12, width = 0.85) {
    this.is8DActive = enabled;
    this.eightDSpeed = speed;
    this.eightDWidth = width;

    if (!enabled) {
      this.stop8DLoop();
      if (this.stereoPanner) this.stereoPanner.pan.value = 0;
    } else {
      this.start8DLoop();
    }
  }

  public is8DEnabled(): boolean {
    return this.is8DActive;
  }

  public get8DSettings() {
    return { enabled: this.is8DActive, speed: this.eightDSpeed, width: this.eightDWidth };
  }

  private start8DLoop() {
    if (!this.stereoPanner || this.eightDAnimFrame !== null) return;
    let lastStamp = performance.now();

    const loop = (stamp: number) => {
      const dt = (stamp - lastStamp) / 1000;
      lastStamp = stamp;

      if (this.is8DActive && this.stereoPanner) {
        this.eightDTime += dt * this.eightDSpeed * Math.PI * 2;
        // Orbit smoothly between left and right
        const panValue = Math.sin(this.eightDTime) * this.eightDWidth;
        this.stereoPanner.pan.setTargetAtTime(panValue, this.audioCtx?.currentTime || 0, 0.05);
        this.eightDAnimFrame = requestAnimationFrame(loop);
      } else {
        this.eightDAnimFrame = null;
      }
    };
    this.eightDAnimFrame = requestAnimationFrame(loop);
  }

  private stop8DLoop() {
    if (this.eightDAnimFrame !== null) {
      cancelAnimationFrame(this.eightDAnimFrame);
      this.eightDAnimFrame = null;
    }
    if (this.stereoPanner && this.audioCtx) {
      this.stereoPanner.pan.setTargetAtTime(0, this.audioCtx.currentTime, 0.1);
    }
  }

  // --- Virtual Room Acoustics (Reverb) ---
  public setRoomPreset(preset: RoomPreset) {
    this.currentRoomPreset = preset;
    if (!this.audioCtx || !this.convolverNode || !this.reverbWetGain || !this.reverbDryGain) return;

    if (preset === 'dry') {
      this.reverbDryGain.gain.setTargetAtTime(1.0, this.audioCtx.currentTime, 0.1);
      this.reverbWetGain.gain.setTargetAtTime(0.0, this.audioCtx.currentTime, 0.1);
      return;
    }

    let duration = 1.5;
    let decay = 2.0;
    let wet = 0.35;

    switch (preset) {
      case 'hall':
        duration = 2.8;
        decay = 2.2;
        wet = 0.38;
        break;
      case 'cathedral':
        duration = 4.8;
        decay = 1.6;
        wet = 0.55;
        break;
      case 'club':
        duration = 1.2;
        decay = 3.2;
        wet = 0.42;
        break;
      case 'car':
        duration = 0.4;
        decay = 4.8;
        wet = 0.25;
        break;
    }

    const impulse = this.createImpulseBuffer(this.audioCtx, duration, decay);
    this.convolverNode.buffer = impulse;
    this.reverbDryGain.gain.setTargetAtTime(1.0 - wet * 0.4, this.audioCtx.currentTime, 0.1);
    this.reverbWetGain.gain.setTargetAtTime(wet, this.audioCtx.currentTime, 0.1);
  }

  public getRoomPreset(): RoomPreset {
    return this.currentRoomPreset;
  }

  private createImpulseBuffer(ctx: AudioContext, duration: number, decay: number): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const impulse = ctx.createBuffer(2, length, sampleRate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const envelope = Math.pow(1 - i / length, decay);
      left[i] = (Math.random() * 2 - 1) * envelope;
      right[i] = (Math.random() * 2 - 1) * envelope;
    }
    return impulse;
  }

  // --- Analog Vinyl & Tape Warmth ---
  public toggleVinylWarmth(enabled: boolean, intensity = 0.4) {
    this.isVinylWarmthActive = enabled;
    if (!this.audioCtx || !this.waveshaperNode) return;

    if (enabled) {
      this.waveshaperNode.curve = this.makeDistortionCurve(intensity * 35);
      this.startVinylNoise(intensity);
    } else {
      this.waveshaperNode.curve = this.makeDistortionCurve(0);
      this.stopVinylNoise();
    }
  }

  public isVinylWarmthEnabled(): boolean {
    return this.isVinylWarmthActive;
  }

  private makeDistortionCurve(amount: number): Float32Array<ArrayBuffer> {
    const k = amount;
    const n_samples = 44100;
    const buffer = new ArrayBuffer(n_samples * 4);
    const curve = new Float32Array(buffer);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      if (k === 0) {
        curve[i] = x;
      } else {
        curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
      }
    }
    return curve;
  }

  private startVinylNoise(intensity: number) {
    if (!this.audioCtx || !this.gainNode) return;
    this.stopVinylNoise();

    // Create 3 seconds of subtle vinyl hiss & micro-pops
    const bufferSize = this.audioCtx.sampleRate * 3;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Pink-ish noise baseline
      let val = (Math.random() * 2 - 1) * 0.008;
      // Random crackle pops
      if (Math.random() < 0.0004) {
        val += (Math.random() * 2 - 1) * 0.08;
      }
      output[i] = val;
    }

    this.vinylCrackleSource = this.audioCtx.createBufferSource();
    this.vinylCrackleSource.buffer = noiseBuffer;
    this.vinylCrackleSource.loop = true;

    this.vinylCrackleGain = this.audioCtx.createGain();
    this.vinylCrackleGain.gain.value = Math.min(0.08, intensity * 0.05);

    this.vinylCrackleSource.connect(this.vinylCrackleGain);
    this.vinylCrackleGain.connect(this.gainNode);
    this.vinylCrackleSource.start();
  }

  private stopVinylNoise() {
    if (this.vinylCrackleSource) {
      try {
        this.vinylCrackleSource.stop();
        this.vinylCrackleSource.disconnect();
      } catch {
        // Ignored
      }
      this.vinylCrackleSource = null;
    }
  }

  // --- Karaoke Vocal Attenuator Mode ---
  public toggleKaraokeMode(enabled: boolean) {
    this.isKaraokeActive = enabled;
    if (!this.vocalFilter1 || !this.vocalFilter2 || !this.audioCtx) return;

    const targetGain = enabled ? -18 : 0; // -18dB notch on vocal center frequencies
    this.vocalFilter1.gain.setTargetAtTime(targetGain, this.audioCtx.currentTime, 0.1);
    this.vocalFilter2.gain.setTargetAtTime(targetGain, this.audioCtx.currentTime, 0.1);
  }

  public isKaraokeEnabled(): boolean {
    return this.isKaraokeActive;
  }

  // --- DJ Crossfade ---
  public setCrossfadeDuration(seconds: number) {
    this.crossfadeDuration = Math.max(0, Math.min(12, seconds));
  }

  public getCrossfadeDuration(): number {
    return this.crossfadeDuration;
  }

  // --- Playback & Core Methods ---
  public async play(src?: string) {
    this.initWebAudio();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    if (src) {
      try {
        const resolvedSrc = new URL(src, window.location.href).href;
        if (this.audio.src !== resolvedSrc) {
          // If already playing and crossfade is on, fade out then in
          if (this.isPlaying() && this.crossfadeDuration > 0 && this.gainNode && this.audioCtx) {
            const halfFade = Math.min(1.5, this.crossfadeDuration / 2);
            this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioCtx.currentTime);
            this.gainNode.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + halfFade);
            
            setTimeout(() => {
              this.audio.src = src;
              this.audio.load();
              this.audio.play().then(() => {
                if (this.gainNode && this.audioCtx) {
                  this.gainNode.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
                  this.gainNode.gain.linearRampToValueAtTime(1.0, this.audioCtx.currentTime + halfFade);
                }
              }).catch(() => {});
            }, halfFade * 1000);
            return;
          }

          this.audio.src = src;
          this.audio.load();
        }
      } catch {
        if (this.audio.src !== src) {
          this.audio.src = src;
          this.audio.load();
        }
      }
    }

    try {
      if (this.gainNode && this.audioCtx) {
        this.gainNode.gain.setValueAtTime(1.0, this.audioCtx.currentTime);
      }
      await this.audio.play();
      if (this.is8DActive) this.start8DLoop();
    } catch (err) {
      console.warn('Playback error or blocked by autoplay policy:', err);
    }
  }

  public pause() {
    this.audio.pause();
    this.stop8DLoop();
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
