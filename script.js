/* ==========================================================================
   PULSE AUDIO ARCHITECTURE — ENGINE & INTERACTION LOGIC
   Featuring Real Audio Integration, Web Audio API Acoustic Visualizer,
   Bespoke Editorial Slideshow, Real-Time Catalog Search, and Precision Controls.
   ========================================================================== */

(() => {
  'use strict';

  // ===== AUDIO TRACK CATALOG WITH REAL MP3 FILES =====
  const tracks = [
    {
      id: 0,
      title: "Midnight Drive",
      artist: "Various Artists",
      genre: "Heavy Synthetics",
      year: "2024 Master",
      art: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop&crop=center",
      file: "music1.mp3",
      duration: 204
    },
    {
      id: 1,
      title: "Lo-Fi Mornings",
      artist: "Beat Collective",
      genre: "Downtempo Modular",
      year: "2024 Remaster",
      art: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=800&fit=crop&crop=center",
      file: "music2.mp3",
      duration: 180
    },
    {
      id: 2,
      title: "Synthwave 88",
      artist: "Neon Nights",
      genre: "Retro Wave",
      year: "2024 Master",
      art: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop&crop=center",
      file: "music3.mp3",
      duration: 220
    },
    {
      id: 3,
      title: "Acoustic Chill",
      artist: "Solo Artist",
      genre: "Warm Tape Sessions",
      year: "2023 Master",
      art: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=800&fit=crop&crop=center",
      file: "music4.mp3",
      duration: 195
    },
    {
      id: 4,
      title: "Future Bass",
      artist: "Electro Lab",
      genre: "Kinetic Electronica",
      year: "2024 Master",
      art: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop&crop=center",
      file: "music1.mp3",
      duration: 168
    }
  ];

  // ===== GLOBAL ENGINE STATE =====
  let isPlaying = false;
  let currentTrackIndex = 0;
  let isShuffled = false;
  let isRepeating = false;
  let volume = 0.7;
  let isDraggingProgress = false;
  let simulationRaf = null;
  let simulatedCurrentTime = 0;

  // ===== DOM ELEMENT SELECTORS =====
  const elements = {
    audio: document.getElementById('audio-engine'),
    playBtn: document.getElementById('play'),
    playIcon: document.getElementById('play-icon'),
    prevBtn: document.getElementById('prev'),
    nextBtn: document.getElementById('next'),
    shuffleBtn: document.getElementById('shuffle'),
    repeatBtn: document.getElementById('repeat'),
    
    // Progress & Timing
    progressBar: document.getElementById('progress-bar'),
    progress: document.getElementById('progress'),
    progressHandle: document.getElementById('progress-handle'),
    progressHoverTime: document.getElementById('progress-hover-time'),
    timeElapsed: document.getElementById('time-elapsed'),
    duration: document.getElementById('duration'),
    
    // Volume
    volume: document.getElementById('volume'),
    volumeBtn: document.querySelector('.volume-btn'),
    
    // Track Details in Bottom Player
    playerArt: document.getElementById('player-art'),
    trackTitle: document.getElementById('track-title'),
    trackArtist: document.getElementById('track-artist'),
    playerLike: document.querySelector('.player-like'),
    player: document.querySelector('.player'),
    
    // Hero Elements
    heroTitle: document.getElementById('hero-title'),
    heroSubtitle: document.getElementById('hero-subtitle'),
    heroGenre: document.getElementById('hero-genre'),
    heroYear: document.getElementById('hero-year'),
    heroArtwork: document.getElementById('hero-artwork'),
    heroPlay: document.getElementById('hero-play'),
    heroSave: document.getElementById('hero-save'),
    vinylWrap: document.getElementById('vinyl-wrap'),
    slideCurrNum: document.getElementById('slide-curr-num'),
    heroIndicators: document.querySelectorAll('.hero-indicators .indicator'),
    
    // Search
    sidebarSearch: document.getElementById('sidebar-search-input'),
    searchSection: document.getElementById('search-section'),
    searchResultsGrid: document.getElementById('search-results-grid'),
    searchQueryHeading: document.getElementById('search-query-heading'),
    
    // Floating Player & Tooltip
    floatingPlayer: document.getElementById('floating-player'),
    tooltip: document.getElementById('tooltip'),
    
    // Modals
    queueBtn: document.querySelector('.queue-btn'),
    deviceBtn: document.querySelector('.device-btn')
  };

  // ===== UTILITY FUNCTIONS =====
  const utils = {
    formatTime: (seconds) => {
      if (isNaN(seconds) || seconds < 0) return "0:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
    clamp: (val, min, max) => Math.min(Math.max(val, min), max),
    throttle: (func, limit) => {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  };

  // ===== WEB AUDIO API ACOUSTIC VISUALIZER =====
  const visualizer = {
    canvas: document.getElementById('hero-visualizer'),
    ctx: null,
    audioCtx: null,
    analyser: null,
    dataArray: null,
    source: null,
    isInitialized: false,
    animationId: null,

    init: () => {
      if (!visualizer.canvas) return;
      visualizer.ctx = visualizer.canvas.getContext('2d');
      visualizer.resize();
      window.addEventListener('resize', visualizer.resize);
      visualizer.drawAmbientWave();
    },

    resize: () => {
      if (!visualizer.canvas) return;
      const rect = visualizer.canvas.getBoundingClientRect();
      visualizer.canvas.width = rect.width * (window.devicePixelRatio || 1);
      visualizer.canvas.height = rect.height * (window.devicePixelRatio || 1);
    },

    setupAudioNodes: () => {
      if (visualizer.isInitialized || !elements.audio) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        visualizer.audioCtx = new AudioContext();
        visualizer.analyser = visualizer.audioCtx.createAnalyser();
        visualizer.analyser.fftSize = 64;
        visualizer.source = visualizer.audioCtx.createMediaElementSource(elements.audio);
        visualizer.source.connect(visualizer.analyser);
        visualizer.analyser.connect(visualizer.audioCtx.destination);
        visualizer.dataArray = new Uint8Array(visualizer.analyser.frequencyBinCount);
        visualizer.isInitialized = true;
      } catch (err) {
        console.warn('AudioContext requires user gesture or restricted on local file protocol:', err);
      }
    },

    drawAmbientWave: () => {
      let step = 0;
      const render = () => {
        if (!visualizer.ctx) return;
        const width = visualizer.canvas.width;
        const height = visualizer.canvas.height;
        visualizer.ctx.clearRect(0, 0, width, height);

        step += isPlaying ? 0.04 : 0.015;
        const lines = 3;
        
        for (let l = 0; l < lines; l++) {
          visualizer.ctx.beginPath();
          visualizer.ctx.lineWidth = 1.5 * (window.devicePixelRatio || 1);
          visualizer.ctx.strokeStyle = l === 0 
            ? 'rgba(0, 229, 117, 0.45)' 
            : l === 1 
              ? 'rgba(255, 255, 255, 0.12)' 
              : 'rgba(0, 229, 117, 0.15)';

          for (let x = 0; x < width; x += 8) {
            const freq = 0.003 + l * 0.001;
            const amp = isPlaying ? (height * 0.22) : (height * 0.08);
            const y = height / 2 + Math.sin(x * freq + step + l) * amp * Math.cos(x * 0.001 + step * 0.5);
            if (x === 0) {
              visualizer.ctx.moveTo(x, y);
            } else {
              visualizer.ctx.lineTo(x, y);
            }
          }
          visualizer.ctx.stroke();
        }

        visualizer.animationId = requestAnimationFrame(render);
      };

      if (visualizer.animationId) cancelAnimationFrame(visualizer.animationId);
      render();
    }
  };

  // ===== SOUND ENGINE CONTROLLER =====
  const player = {
    init: () => {
      player.loadTrack(0);
      player.bindAudioEvents();
    },

    loadTrack: (index) => {
      currentTrackIndex = (index + tracks.length) % tracks.length;
      const track = tracks[currentTrackIndex];

      // Update Audio Element source
      if (elements.audio) {
        elements.audio.src = track.file;
        elements.audio.load();
      }

      // Update Bottom Player Info
      if (elements.trackTitle) elements.trackTitle.textContent = track.title;
      if (elements.trackArtist) elements.trackArtist.textContent = track.artist;
      if (elements.playerArt) elements.playerArt.src = track.art;
      if (elements.duration) elements.duration.textContent = utils.formatTime(track.duration);
      if (elements.timeElapsed) elements.timeElapsed.textContent = "0:00";
      
      // Update Scrubber UI
      simulatedCurrentTime = 0;
      player.updateScrubber(0, track.duration);

      // Update Floating Mini Player
      if (elements.floatingPlayer) {
        const floatImg = elements.floatingPlayer.querySelector('img');
        const floatTitle = elements.floatingPlayer.querySelector('.floating-title');
        const floatArtist = elements.floatingPlayer.querySelector('.floating-artist');
        if (floatImg) floatImg.src = track.art;
        if (floatTitle) floatTitle.textContent = track.title;
        if (floatArtist) floatArtist.textContent = track.artist;
      }

      // Sync active state in queue if open
      document.querySelectorAll('.queue-item').forEach((item, idx) => {
        item.classList.toggle('current', idx === currentTrackIndex);
      });
    },

    play: () => {
      visualizer.setupAudioNodes();
      if (visualizer.audioCtx && visualizer.audioCtx.state === 'suspended') {
        visualizer.audioCtx.resume();
      }

      isPlaying = true;
      player.updatePlayButtons(true);

      if (elements.audio && elements.audio.src) {
        const playPromise = elements.audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Browser autoplay / local restriction fallback
            player.startSimulationTimer();
          });
        }
      } else {
        player.startSimulationTimer();
      }

      // Physical animations
      if (elements.player) elements.player.classList.add('is-playing');
      if (elements.vinylWrap) elements.vinylWrap.classList.add('is-playing');
    },

    pause: () => {
      isPlaying = false;
      player.updatePlayButtons(false);

      if (elements.audio) {
        elements.audio.pause();
      }
      if (simulationRaf) {
        cancelAnimationFrame(simulationRaf);
        simulationRaf = null;
      }

      if (elements.player) elements.player.classList.remove('is-playing');
      if (elements.vinylWrap) elements.vinylWrap.classList.remove('is-playing');
    },

    togglePlay: () => {
      if (isPlaying) player.pause();
      else player.play();
    },

    next: () => {
      if (isShuffled) {
        const randomIndex = Math.floor(Math.random() * tracks.length);
        player.loadTrack(randomIndex);
      } else {
        player.loadTrack(currentTrackIndex + 1);
      }
      if (isPlaying) player.play();
    },

    prev: () => {
      if (elements.audio && elements.audio.currentTime > 3) {
        elements.audio.currentTime = 0;
        simulatedCurrentTime = 0;
        return;
      }
      player.loadTrack(currentTrackIndex - 1);
      if (isPlaying) player.play();
    },

    seek: (percentage) => {
      const track = tracks[currentTrackIndex];
      const targetTime = track.duration * percentage;
      simulatedCurrentTime = targetTime;
      if (elements.audio && !isNaN(elements.audio.duration) && elements.audio.duration > 0) {
        elements.audio.currentTime = targetTime;
      }
      player.updateScrubber(targetTime, track.duration);
    },

    setVolume: (val) => {
      volume = utils.clamp(val, 0, 1);
      if (elements.audio) elements.audio.volume = volume;
      if (elements.volume) elements.volume.value = volume;
    },

    toggleShuffle: () => {
      isShuffled = !isShuffled;
      if (elements.shuffleBtn) elements.shuffleBtn.classList.toggle('active', isShuffled);
    },

    toggleRepeat: () => {
      isRepeating = !isRepeating;
      if (elements.repeatBtn) elements.repeatBtn.classList.toggle('active', isRepeating);
    },

    updatePlayButtons: (playing) => {
      const pauseSvg = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
        </svg>
      `;
      const playSvg = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      `;

      if (elements.playBtn) elements.playBtn.innerHTML = playing ? pauseSvg : playSvg;
      if (elements.heroPlay) {
        const iconSpan = elements.heroPlay.querySelector('.btn-icon');
        const textSpan = elements.heroPlay.querySelector('.btn-text');
        if (iconSpan) iconSpan.innerHTML = playing ? pauseSvg : playSvg;
        if (textSpan) textSpan.textContent = playing ? "Pause Stream" : "Start Playback";
      }
    },

    updateScrubber: (currentTime, totalDuration) => {
      if (isDraggingProgress) return;
      const pct = utils.clamp((currentTime / totalDuration) * 100, 0, 100);
      if (elements.progress) elements.progress.style.width = `${pct}%`;
      if (elements.progressHandle) elements.progressHandle.style.left = `${pct}%`;
      if (elements.timeElapsed) elements.timeElapsed.textContent = utils.formatTime(currentTime);

      const floatBar = document.querySelector('.floating-progress-bar');
      if (floatBar) floatBar.style.width = `${pct}%`;
    },

    startSimulationTimer: () => {
      if (simulationRaf) cancelAnimationFrame(simulationRaf);
      let lastTimestamp = performance.now();

      const loop = (now) => {
        if (!isPlaying) return;
        const delta = (now - lastTimestamp) / 1000;
        lastTimestamp = now;

        const track = tracks[currentTrackIndex];
        simulatedCurrentTime += delta;

        if (simulatedCurrentTime >= track.duration) {
          if (isRepeating) {
            simulatedCurrentTime = 0;
          } else {
            player.next();
            return;
          }
        }
        player.updateScrubber(simulatedCurrentTime, track.duration);
        simulationRaf = requestAnimationFrame(loop);
      };
      simulationRaf = requestAnimationFrame(loop);
    },

    bindAudioEvents: () => {
      if (!elements.audio) return;

      elements.audio.addEventListener('timeupdate', () => {
        if (!isDraggingProgress && elements.audio.duration) {
          player.updateScrubber(elements.audio.currentTime, elements.audio.duration);
        }
      });

      elements.audio.addEventListener('loadedmetadata', () => {
        if (elements.duration && elements.audio.duration) {
          elements.duration.textContent = utils.formatTime(elements.audio.duration);
        }
      });

      elements.audio.addEventListener('ended', () => {
        if (isRepeating) {
          elements.audio.currentTime = 0;
          elements.audio.play();
        } else {
          player.next();
        }
      });
    }
  };

  // ===== HERO SLIDESHOW LOGIC =====
  const heroShowcase = {
    currentIndex: 0,
    interval: null,

    init: () => {
      elements.heroIndicators.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          heroShowcase.goTo(idx);
          heroShowcase.resetTimer();
        });
      });

      heroShowcase.startTimer();
    },

    goTo: (index) => {
      heroShowcase.currentIndex = index;
      const track = tracks[index];
      if (!track) return;

      // Update Narrative with Smooth Reveal
      if (elements.heroTitle) {
        elements.heroTitle.style.opacity = '0';
        elements.heroTitle.style.transform = 'translateY(16px)';
        setTimeout(() => {
          elements.heroTitle.textContent = track.title;
          elements.heroTitle.style.opacity = '1';
          elements.heroTitle.style.transform = 'translateY(0)';
        }, 200);
      }

      if (elements.heroGenre) elements.heroGenre.textContent = track.genre;
      if (elements.heroYear) elements.heroYear.textContent = track.year;
      if (elements.slideCurrNum) elements.slideCurrNum.textContent = `0${index + 1}`;

      // Update Artwork
      if (elements.heroArtwork) {
        elements.heroArtwork.style.opacity = '0.6';
        setTimeout(() => {
          elements.heroArtwork.src = track.art;
          elements.heroArtwork.style.opacity = '1';
        }, 220);
      }

      // Update Indicators
      elements.heroIndicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
      });
    },

    next: () => {
      const nextIdx = (heroShowcase.currentIndex + 1) % tracks.length;
      heroShowcase.goTo(nextIdx);
    },

    startTimer: () => {
      heroShowcase.interval = setInterval(heroShowcase.next, 6000);
    },

    resetTimer: () => {
      clearInterval(heroShowcase.interval);
      heroShowcase.startTimer();
    }
  };

  // ===== REAL-TIME SEARCH FILTER SYSTEM =====
  const searchEngine = {
    init: () => {
      if (!elements.sidebarSearch) return;

      elements.sidebarSearch.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        searchEngine.performSearch(query);
      });

      // Quick shortcut '/' to focus search
      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== elements.sidebarSearch) {
          e.preventDefault();
          elements.sidebarSearch.focus();
        }
      });
    },

    performSearch: (query) => {
      if (!elements.searchSection || !elements.searchResultsGrid) return;

      if (!query) {
        elements.searchSection.style.display = 'none';
        return;
      }

      elements.searchSection.style.display = 'block';
      if (elements.searchQueryHeading) {
        elements.searchQueryHeading.textContent = `Results for "${query}"`;
      }

      // Search across all track data
      const matched = tracks.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.artist.toLowerCase().includes(query) ||
        t.genre.toLowerCase().includes(query)
      );

      if (matched.length === 0) {
        elements.searchResultsGrid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 32px 0; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.85rem;">
            No matching recordings found in current catalog.
          </div>
        `;
        return;
      }

      elements.searchResultsGrid.innerHTML = matched.map(track => `
        <article class="card" data-track-index="${track.id}">
          <div class="card-image-wrap">
            <img src="${track.art}" alt="${track.title}" loading="lazy" />
            <button class="play-overlay" aria-label="Play ${track.title}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <div class="card-audio-badge">${track.genre.toUpperCase()}</div>
          </div>
          <div class="card-info">
            <strong class="card-title">${track.title}</strong>
            <span class="card-artist">${track.artist}</span>
            <span class="card-meta">${utils.formatTime(track.duration)}</span>
          </div>
        </article>
      `).join('');

      // Bind click events on newly rendered cards
      elements.searchResultsGrid.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
          const idx = parseInt(card.dataset.trackIndex, 10);
          player.loadTrack(idx);
          player.play();
        });
      });
    }
  };

  // ===== CAROUSEL NAVIGATION & CARDS INTERACTION =====
  const carousels = {
    init: () => {
      // Nav buttons (Prev / Next) on section headers
      document.querySelectorAll('.carousel-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.dataset.target;
          const carouselEl = document.getElementById(targetId);
          if (!carouselEl) return;
          const scrollDistance = 420;
          const isNext = btn.classList.contains('next');
          carouselEl.scrollBy({
            left: isNext ? scrollDistance : -scrollDistance,
            behavior: 'smooth'
          });
        });
      });

      // Click card to immediately play
      document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
          const idx = card.dataset.trackIndex !== undefined 
            ? parseInt(card.dataset.trackIndex, 10) 
            : 0;
          player.loadTrack(idx);
          player.play();
        });
      });

      // Touch & Mouse Drag on carousels
      document.querySelectorAll('.carousel').forEach(car => {
        let isDown = false;
        let startX, scrollLeft;

        car.addEventListener('mousedown', (e) => {
          isDown = true;
          startX = e.pageX - car.offsetLeft;
          scrollLeft = car.scrollLeft;
        });
        car.addEventListener('mouseleave', () => isDown = false);
        car.addEventListener('mouseup', () => isDown = false);
        car.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - car.offsetLeft;
          const walk = (x - startX) * 1.5;
          car.scrollLeft = scrollLeft - walk;
        });
      });
    }
  };

  // ===== USER CONTROLS & EVENT BINDINGS =====
  const setupControls = () => {
    // Primary Transport
    if (elements.playBtn) elements.playBtn.addEventListener('click', player.togglePlay);
    if (elements.prevBtn) elements.prevBtn.addEventListener('click', player.prev);
    if (elements.nextBtn) elements.nextBtn.addEventListener('click', player.next);
    if (elements.shuffleBtn) elements.shuffleBtn.addEventListener('click', player.toggleShuffle);
    if (elements.repeatBtn) elements.repeatBtn.addEventListener('click', player.toggleRepeat);
    if (elements.heroPlay) elements.heroPlay.addEventListener('click', player.togglePlay);

    // Like Button
    if (elements.playerLike) {
      elements.playerLike.addEventListener('click', () => {
        elements.playerLike.classList.toggle('active');
      });
    }

    if (elements.heroSave) {
      elements.heroSave.addEventListener('click', () => {
        const textSpan = elements.heroSave.querySelector('.btn-text');
        if (textSpan) {
          textSpan.textContent = "Added to Queue";
          setTimeout(() => textSpan.textContent = "Add to Queue", 2200);
        }
      });
    }

    // Scrubber Scrub & Hover Preview
    if (elements.progressBar) {
      elements.progressBar.addEventListener('click', (e) => {
        const rect = elements.progressBar.getBoundingClientRect();
        const pct = utils.clamp((e.clientX - rect.left) / rect.width, 0, 1);
        player.seek(pct);
      });

      elements.progressBar.addEventListener('mousemove', (e) => {
        const rect = elements.progressBar.getBoundingClientRect();
        const pct = utils.clamp((e.clientX - rect.left) / rect.width, 0, 1);
        const track = tracks[currentTrackIndex];
        const previewSec = track.duration * pct;
        if (elements.progressHoverTime) {
          elements.progressHoverTime.style.left = `${pct * 100}%`;
          elements.progressHoverTime.textContent = utils.formatTime(previewSec);
        }
      });
    }

    // Volume Slider
    if (elements.volume) {
      elements.volume.addEventListener('input', (e) => {
        player.setVolume(parseFloat(e.target.value));
      });
    }

    if (elements.volumeBtn) {
      elements.volumeBtn.addEventListener('click', () => {
        if (volume > 0) player.setVolume(0);
        else player.setVolume(0.7);
      });
    }

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        player.togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        player.next();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        player.prev();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        player.setVolume(volume + 0.05);
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        player.setVolume(volume - 0.05);
      }
    });

    // Queue Modal Flyout
    if (elements.queueBtn) {
      elements.queueBtn.addEventListener('click', () => {
        const existing = document.querySelector('.queue-modal');
        if (existing) {
          existing.remove();
          return;
        }

        const modal = document.createElement('div');
        modal.className = 'queue-modal';
        modal.innerHTML = `
          <div class="modal-content">
            <h3>Playback Queue</h3>
            <div class="queue-list">
              ${tracks.map((t, idx) => `
                <div class="queue-item ${idx === currentTrackIndex ? 'current' : ''}" data-idx="${idx}">
                  <img src="${t.art}" alt="${t.title}" />
                  <div class="queue-info">
                    <strong>${t.title}</strong>
                    <small>${t.artist} • ${t.genre}</small>
                  </div>
                  <span class="device-status">${utils.formatTime(t.duration)}</span>
                </div>
              `).join('')}
            </div>
            <button class="close-queue">Dismiss Queue</button>
          </div>
        `;
        document.body.appendChild(modal);

        modal.querySelectorAll('.queue-item').forEach(item => {
          item.addEventListener('click', () => {
            const idx = parseInt(item.dataset.idx, 10);
            player.loadTrack(idx);
            player.play();
            modal.remove();
          });
        });

        modal.querySelector('.close-queue').addEventListener('click', () => modal.remove());
      });
    }

    // Device Modal Flyout
    if (elements.deviceBtn) {
      elements.deviceBtn.addEventListener('click', () => {
        const existing = document.querySelector('.device-modal');
        if (existing) {
          existing.remove();
          return;
        }

        const modal = document.createElement('div');
        modal.className = 'device-modal';
        modal.innerHTML = `
          <div class="modal-content">
            <h3>Connected Output</h3>
            <div class="device-list">
              <div class="device-item">
                <div class="device-info">
                  <strong>Master Audio Interface (96kHz)</strong>
                  <small>Bit-Perfect ASIO Driver</small>
                </div>
                <span class="device-status active">Active</span>
              </div>
              <div class="device-item">
                <div class="device-info">
                  <strong>Studio Monitors (Left/Right)</strong>
                  <small>Direct Analog Balanced</small>
                </div>
                <span class="device-status">Available</span>
              </div>
            </div>
            <button class="close-device">Close</button>
          </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-device').addEventListener('click', () => modal.remove());
      });
    }

    // Tooltip Helper
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      el.addEventListener('mouseenter', (e) => {
        if (!elements.tooltip) return;
        const tipText = el.getAttribute('data-tooltip');
        elements.tooltip.textContent = tipText;
        const rect = el.getBoundingClientRect();
        elements.tooltip.style.left = `${rect.left + rect.width / 2 - elements.tooltip.offsetWidth / 2}px`;
        elements.tooltip.style.top = `${rect.top - 32}px`;
        elements.tooltip.classList.add('show');
      });
      el.addEventListener('mouseleave', () => {
        if (elements.tooltip) elements.tooltip.classList.remove('show');
      });
    });

    // Reveal on Scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  // ===== INITIALIZE APPLICATION =====
  const init = () => {
    player.init();
    visualizer.init();
    heroShowcase.init();
    searchEngine.init();
    carousels.init();
    setupControls();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
