// Headless YouTube IFrame API Controller
// Streams full-length audio tracks directly from YouTube's global CDN (Method 1)

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
  }
}

class YouTubePlayerService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private player: any = null;
  private isApiLoaded = false;
  private isReady = false;
  private pendingVideoId: string | null = null;
  private timeUpdateInterval: number | null = null;

  public onTimeUpdate?: (currentTime: number, duration: number) => void;
  public onStateChange?: (isPlaying: boolean) => void;
  public onEnded?: () => void;

  constructor() {
    this.loadYouTubeIframeAPI();
  }

  private loadYouTubeIframeAPI() {
    if (typeof window === 'undefined') return;

    if (window.YT && window.YT.Player) {
      this.isApiLoaded = true;
      return;
    }

    // Check if script tag already exists
    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevReady) prevReady();
      this.isApiLoaded = true;
      if (this.pendingVideoId) {
        this.initPlayer(this.pendingVideoId);
      }
    };
  }

  public initPlayer(containerIdOrVideoId: string, videoId?: string) {
    const vid = videoId || containerIdOrVideoId;
    if (!this.isApiLoaded || !window.YT || !window.YT.Player) {
      this.pendingVideoId = vid;
      return;
    }

    // Ensure hidden container exists inside off-screen wrapper
    let wrapper = document.getElementById('yt-headless-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'yt-headless-wrapper';
      wrapper.style.position = 'fixed';
      wrapper.style.top = '-99999px';
      wrapper.style.left = '-99999px';
      wrapper.style.width = '1px';
      wrapper.style.height = '1px';
      wrapper.style.opacity = '0';
      wrapper.style.pointerEvents = 'none';
      wrapper.style.visibility = 'hidden';
      wrapper.style.overflow = 'hidden';
      wrapper.style.zIndex = '-99999';
      document.body.appendChild(wrapper);
    }

    let container = document.getElementById('yt-headless-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'yt-headless-container';
      wrapper.appendChild(container);
    }

    if (this.player && this.isReady) {
      this.player.loadVideoById(vid);
      this.player.playVideo();
      return;
    }

    try {
      this.player = new window.YT.Player('yt-headless-container', {
        height: '1',
        width: '1',
        videoId: vid,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0
        },
        events: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onReady: (event: any) => {
            this.isReady = true;
            event.target.playVideo();
            this.startTimeUpdates();
            if (this.onStateChange) this.onStateChange(true);
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onStateChange: (event: any) => {
            // YT.PlayerState: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 video cued
            const state = event.data;
            if (state === 1) {
              if (this.onStateChange) this.onStateChange(true);
              this.startTimeUpdates();
            } else if (state === 2) {
              if (this.onStateChange) this.onStateChange(false);
              this.stopTimeUpdates();
            } else if (state === 0) {
              if (this.onStateChange) this.onStateChange(false);
              this.stopTimeUpdates();
              if (this.onEnded) this.onEnded();
            }
          }
        }
      });
    } catch (e) {
      console.warn('YouTube IFrame player initialization note:', e);
    }
  }

  public playVideo(videoId: string) {
    if (!this.player || !this.isReady) {
      this.initPlayer(videoId);
    } else {
      this.player.loadVideoById(videoId);
      this.player.playVideo();
      this.startTimeUpdates();
      if (this.onStateChange) this.onStateChange(true);
    }
  }

  public play(fallbackVideoId?: string) {
    if (!this.player || !this.isReady) {
      const vid = fallbackVideoId || this.pendingVideoId;
      if (vid) {
        this.playVideo(vid);
      }
      return;
    }
    if (typeof this.player.playVideo === 'function') {
      this.player.playVideo();
      this.startTimeUpdates();
      if (this.onStateChange) this.onStateChange(true);
    }
  }

  public pause() {
    if (this.player && typeof this.player.pauseVideo === 'function') {
      this.player.pauseVideo();
      this.stopTimeUpdates();
      if (this.onStateChange) this.onStateChange(false);
    }
  }

  public seekTo(seconds: number) {
    if (this.player && this.isReady && typeof this.player.seekTo === 'function') {
      this.player.seekTo(seconds, true);
    }
  }

  public setVolume(volume: number) {
    // volume is 0 to 1 -> YouTube API expects 0 to 100
    if (this.player && this.isReady && typeof this.player.setVolume === 'function') {
      this.player.setVolume(Math.round(Math.max(0, Math.min(1, volume)) * 100));
    }
  }

  public getCurrentTime(): number {
    if (this.player && this.isReady && typeof this.player.getCurrentTime === 'function') {
      return this.player.getCurrentTime() || 0;
    }
    return 0;
  }

  public getDuration(): number {
    if (this.player && this.isReady && typeof this.player.getDuration === 'function') {
      return this.player.getDuration() || 0;
    }
    return 0;
  }

  private startTimeUpdates() {
    this.stopTimeUpdates();
    this.timeUpdateInterval = window.setInterval(() => {
      if (this.player && this.isReady && this.onTimeUpdate) {
        const cur = this.getCurrentTime();
        const dur = this.getDuration();
        this.onTimeUpdate(cur, dur);
      }
    }, 250);
  }

  private stopTimeUpdates() {
    if (this.timeUpdateInterval !== null) {
      clearInterval(this.timeUpdateInterval);
      this.timeUpdateInterval = null;
    }
  }
}

export const youtubePlayer = new YouTubePlayerService();
