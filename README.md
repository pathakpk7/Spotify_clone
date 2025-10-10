├── bgSpotify.jpg
├── cover1.jpg
├── font family Caveat Brush.txt
├── index.html
├── music1.mp3
├── music2.mp3
├── music3.mp3
├── music4.mp3
├── playgif.gif
├── playingGif.gif
├── script.js
├── scripts
├── spotifyBg.jpg
├── spotifyLog.png
└── style.css


/bgSpotify.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/pathakpk7/Spotify_clone/main/bgSpotify.jpg


--------------------------------------------------------------------------------
/cover1.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/pathakpk7/Spotify_clone/main/cover1.jpg


--------------------------------------------------------------------------------
/font family Caveat Brush.txt:
--------------------------------------------------------------------------------
1 | font family Caveat Brush
2 | font family 2 Revalia
3 | 


--------------------------------------------------------------------------------
/index.html:
--------------------------------------------------------------------------------
  1 | <!DOCTYPE html>
  2 | <html lang="en">
  3 | <head>
  4 |   <meta charset="utf-8" />
  5 |   <meta name="viewport" content="width=device-width,initial-scale=1" />
  6 |   <title>Pulse — Music Player</title>
  7 |   <link rel="stylesheet" href="style.css" />
  8 |   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  9 | </head>
 10 | <body>
 11 |   <div class="app">
 12 |     <!-- SIDEBAR -->
 13 |     <aside class="sidebar">
 14 |       <div class="brand">
 15 |         <div class="logo">
 16 |           <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
 17 |             <circle cx="12" cy="12" r="10" stroke="#1DB954" stroke-width="2"/>
 18 |             <path d="M8 12l4 4 4-4" stroke="#1DB954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 19 |           </svg>
 20 |         </div>
 21 |         <div class="brand-text">
 22 |           <strong>Pulse</strong>
 23 |           <small>music</small>
 24 |         </div>
 25 |       </div>
 26 | 
 27 |       <nav class="nav">
 28 |         <a class="nav-link active" href="#home" data-tooltip="Go to Home">
 29 |           <span class="icon">
 30 |             <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
 31 |               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
 32 |             </svg>
 33 |           </span>
 34 |           Home
 35 |         </a>
 36 |         <a class="nav-link" href="#search" data-tooltip="Search Music">
 37 |           <span class="icon">
 38 |             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
 39 |               <circle cx="11" cy="11" r="8"/>
 40 |               <path d="m21 21-4.35-4.35"/>
 41 |             </svg>
 42 |           </span>
 43 |           Search
 44 |         </a>
 45 |         <a class="nav-link" href="#library" data-tooltip="Your Music Library">
 46 |           <span class="icon">
 47 |             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
 48 |               <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
 49 |               <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
 50 |             </svg>
 51 |           </span>
 52 |           Your Library
 53 |         </a>
 54 |         <a class="nav-link" href="#playlists" data-tooltip="Browse Playlists">
 55 |           <span class="icon">
 56 |             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
 57 |               <path d="M3 3h18v18H3zM12 8v8"/>
 58 |               <path d="m8 12 4-4 4 4"/>
 59 |             </svg>
 60 |           </span>
 61 |           Playlists
 62 |         </a>
 63 |  </nav> 
 64 | 
 65 |       <div class="playlist-section">
 66 |         <div class="create-playlist">
 67 |           <span class="icon">+</span>
 68 |           Create Playlist
 69 |         </div>
 70 |         <div class="playlist-list">
 71 |           <div class="playlist-item">
 72 |             <span class="playlist-icon">🎵</span>
 73 |             <span>Liked Songs</span>
 74 |           </div>
 75 |           <div class="playlist-item">
 76 |             <span class="playlist-icon">🔥</span>
 77 |             <span>Fire Hits</span>
 78 |           </div>
 79 |           <div class="playlist-item">
 80 |             <span class="playlist-icon">🌙</span>
 81 |             <span>Chill Vibes</span>
 82 |           </div>
 83 |           <div class="playlist-item">
 84 |             <span class="playlist-icon">⚡</span>
 85 |             <span>Energy Boost</span>
 86 |           </div>
 87 |         </div>
 88 |       </div>
 89 |     </aside>
 90 | 
 91 |     <!-- MAIN -->
 92 |     <main class="main" id="main-content">
 93 |       <!-- HERO -->
 94 |       <section class="hero" id="home">
 95 |         <div class="hero-background"></div>
 96 |         <div class="hero-slideshow">
 97 |           <div class="slide active" data-slide="0">
 98 |             <div class="slide-bg" style="background: linear-gradient(135deg, #1DB954, #2ecc71)"></div>
 99 |           </div>
100 |           <div class="slide" data-slide="1">
101 |             <div class="slide-bg" style="background: linear-gradient(135deg, #e74c3c, #f39c12)"></div>
102 |           </div>
103 |           <div class="slide" data-slide="2">
104 |             <div class="slide-bg" style="background: linear-gradient(135deg, #9b59b6, #8e44ad)"></div>
105 |           </div>
106 |           <div class="slide" data-slide="3">
107 |             <div class="slide-bg" style="background: linear-gradient(135deg, #3498db, #2980b9)"></div>
108 |           </div>
109 |           <div class="slide" data-slide="4">
110 |             <div class="slide-bg" style="background: linear-gradient(135deg, #f1c40f, #f39c12)"></div>
111 |           </div>
112 |         </div>
113 |         <div class="hero-content">
114 |           <div class="hero-left">
115 |             <div class="hero-badge">Featured Playlist</div>
116 |             <div class="hero-title-container">
117 |               <h1 class="hero-title" id="hero-title">Neon Nights</h1>
118 |               <div class="title-slideshow">
119 |                 <span class="title-slide active">Neon Nights</span>
120 |                 <span class="title-slide">Electric Dreams</span>
121 |                 <span class="title-slide">Midnight City</span>
122 |                 <span class="title-slide">Synthwave Vibes</span>
123 |                 <span class="title-slide">Cyber Pulse</span>
124 |               </div>
125 |             </div>
126 |             <div class="hero-sub-container">
127 |               <p class="hero-sub" id="hero-subtitle">Curated beats, chill vibes and fresh releases. Tune in and unwind with the perfect soundtrack for your night.</p>
128 |               <div class="subtitle-slideshow">
129 |                 <span class="subtitle-slide active">Curated beats, chill vibes and fresh releases. Tune in and unwind with the perfect soundtrack for your night.</span>
130 |                 <span class="subtitle-slide">High-energy electronic music that will get you moving. Perfect for your workout or party playlist.</span>
131 |                 <span class="subtitle-slide">Urban beats and city sounds that capture the essence of modern life. From dawn to dusk.</span>
132 |                 <span class="subtitle-slide">Retro-futuristic sounds that transport you to another dimension. A journey through time and space.</span>
133 |                 <span class="subtitle-slide">Cutting-edge electronic music that pushes boundaries. Experience the future of sound today.</span>
134 |               </div>
135 |             </div>
136 |             <div class="hero-actions">
137 |               <button id="hero-play" class="btn primary">
138 |                 <span class="btn-icon">▶</span>
139 |                 Play
140 |               </button>
141 |               <button id="hero-save" class="btn ghost">
142 |                 <span class="btn-icon">♡</span>
143 |                 Save
144 |               </button>
145 |               <button id="hero-more" class="btn ghost">
146 |                 <span class="btn-icon">⋯</span>
147 |               </button>
148 |             </div>
149 |             <div class="hero-indicators">
150 |               <span class="indicator active" data-slide="0"></span>
151 |               <span class="indicator" data-slide="1"></span>
152 |               <span class="indicator" data-slide="2"></span>
153 |               <span class="indicator" data-slide="3"></span>
154 |               <span class="indicator" data-slide="4"></span>
155 |             </div>
156 |           </div>
157 |         <div class="hero-art">
158 |           <div class="art-card">
159 |             <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop&crop=center" alt="Featured" id="hero-artwork" />
160 |             <div class="art-overlay"></div>
161 |             <div class="art-glow"></div>
162 |           </div>
163 |         </div>
164 |         </div>
165 |       </section>
166 | 
167 |       <!-- CAROUSELS -->
168 |       <section class="section reveal" id="recently-played">
169 |         <div class="section-header">
170 |           <h2>Recently Played</h2>
171 |           <button class="section-more">Show all</button>
172 |         </div>
173 |         <div class="carousel" data-snap>
174 |           <article class="card">
175 |             <div class="card-image">
176 |               <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center" alt="Midnight Drive Album" />
177 |               <button class="play-overlay">▶</button>
178 |             </div>
179 |             <div class="card-info">
180 |               <strong>Midnight Drive</strong>
181 |               <small>Various Artists</small>
182 |             </div>
183 |           </article>
184 | 
185 |           <article class="card">
186 |             <div class="card-image">
187 |               <img src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop&crop=center" alt="Lo-Fi Mornings Album" />
188 |               <button class="play-overlay">▶</button>
189 |             </div>
190 |             <div class="card-info">
191 |               <strong>Lo-Fi Mornings</strong>
192 |               <small>Beat Collective</small>
193 |             </div>
194 |           </article>
195 | 
196 |           <article class="card">
197 |             <div class="card-image">
198 |               <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center" alt="Synthwave 88 Album" />
199 |               <button class="play-overlay">▶</button>
200 |             </div>
201 |             <div class="card-info">
202 |               <strong>Synthwave 88</strong>
203 |               <small>Neon Nights</small>
204 |             </div>
205 |           </article>
206 | 
207 |           <article class="card">
208 |             <div class="card-image">
209 |               <img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop&crop=center" alt="Acoustic Chill Album" />
210 |               <button class="play-overlay">▶</button>
211 |             </div>
212 |             <div class="card-info">
213 |               <strong>Acoustic Chill</strong>
214 |               <small>Solo Artist</small>
215 |             </div>
216 |           </article>
217 | 
218 |           <article class="card">
219 |             <div class="card-image">
220 |               <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center" alt="Future Bass Album" />
221 |               <button class="play-overlay">▶</button>
222 |             </div>
223 |             <div class="card-info">
224 |               <strong>Future Bass</strong>
225 |               <small>Electro Lab</small>
226 |             </div>
227 |           </article>
228 | 
229 |           <article class="card">
230 |             <div class="card-image">
231 |               <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center" alt="Ambient Dreams Album" />
232 |               <button class="play-overlay">▶</button>
233 |             </div>
234 |             <div class="card-info">
235 |               <strong>Ambient Dreams</strong>
236 |               <small>Space Waves</small>
237 |             </div>
238 |           </article>
239 |         </div>
240 |       </section>
241 | 
242 |       <section class="section reveal" id="top-artists">
243 |         <div class="section-header">
244 |           <h2>Top Artists</h2>
245 |           <button class="section-more">Show all</button>
246 |         </div>
247 |         <div class="carousel" data-snap>
248 |           <article class="card artist">
249 |             <div class="card-image">
250 |               <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face" alt="Riya Beats" />
251 |               <button class="play-overlay">▶</button>
252 |             </div>
253 |             <div class="card-info">
254 |               <strong>Riya Beats</strong>
255 |               <small>Pop • 2.4M followers</small>
256 |             </div>
257 |           </article>
258 | 
259 |           <article class="card artist">
260 |             <div class="card-image">
261 |               <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" alt="DJ Pulse" />
262 |               <button class="play-overlay">▶</button>
263 |             </div>
264 |             <div class="card-info">
265 |               <strong>DJ Pulse</strong>
266 |               <small>EDM • 1.1M followers</small>
267 |             </div>
268 |           </article>
269 | 
270 |           <article class="card artist">
271 |             <div class="card-image">
272 |               <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" alt="Solar Wind" />
273 |               <button class="play-overlay">▶</button>
274 |             </div>
275 |             <div class="card-info">
276 |               <strong>Solar Wind</strong>
277 |               <small>Indie • 860k followers</small>
278 |             </div>
279 |           </article>
280 | 
281 |           <article class="card artist">
282 |             <div class="card-image">
283 |               <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" alt="Neon Eve" />
284 |               <button class="play-overlay">▶</button>
285 |             </div>
286 |             <div class="card-info">
287 |               <strong>Neon Eve</strong>
288 |               <small>Chill • 730k followers</small>
289 |             </div>
290 |           </article>
291 | 
292 |           <article class="card artist">
293 |             <div class="card-image">
294 |               <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face" alt="Flow Master" />
295 |               <button class="play-overlay">▶</button>
296 |             </div>
297 |             <div class="card-info">
298 |               <strong>Flow Master</strong>
299 |               <small>Hip-Hop • 1.8M followers</small>
300 |             </div>
301 |           </article>
302 |         </div>
303 |       </section>
304 | 
305 |       <section class="section reveal" id="made-for-you">
306 |         <div class="section-header">
307 |           <h2>Made for You</h2>
308 |           <button class="section-more">Show all</button>
309 |         </div>
310 |         <div class="carousel" data-snap>
311 |           <article class="card playlist">
312 |             <div class="card-image">
313 |               <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center" alt="Daily Mix 1" />
314 |               <button class="play-overlay">▶</button>
315 |             </div>
316 |             <div class="card-info">
317 |               <strong>Daily Mix 1</strong>
318 |               <small>Made for you</small>
319 |             </div>
320 |           </article>
321 | 
322 |           <article class="card playlist">
323 |             <div class="card-image">
324 |               <img src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop&crop=center" alt="Discover Weekly" />
325 |               <button class="play-overlay">▶</button>
326 |             </div>
327 |             <div class="card-info">
328 |               <strong>Discover Weekly</strong>
329 |               <small>Your weekly mixtape</small>
330 |             </div>
331 |           </article>
332 | 
333 |           <article class="card playlist">
334 |             <div class="card-image">
335 |               <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center" alt="Release Radar" />
336 |               <button class="play-overlay">▶</button>
337 |             </div>
338 |             <div class="card-info">
339 |               <strong>Release Radar</strong>
340 |               <small>Catch all the latest from artists you love</small>
341 |             </div>
342 |           </article>
343 | 
344 |           <article class="card playlist">
345 |             <div class="card-image">
346 |               <img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop&crop=center" alt="Time Capsule" />
347 |               <button class="play-overlay">▶</button>
348 |             </div>
349 |             <div class="card-info">
350 |               <strong>Time Capsule</strong>
351 |               <small>Your musical memories</small>
352 |             </div>
353 |           </article>
354 | 
355 |           <article class="card playlist">
356 |             <div class="card-image">
357 |               <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center" alt="Chill Hits" />
358 |               <button class="play-overlay">▶</button>
359 |             </div>
360 |             <div class="card-info">
361 |               <strong>Chill Hits</strong>
362 |               <small>Relaxing beats for your day</small>
363 |             </div>
364 |           </article>
365 | 
366 |           <article class="card playlist">
367 |             <div class="card-image">
368 |               <img src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop&crop=center" alt="Workout Mix" />
369 |               <button class="play-overlay">▶</button>
370 |             </div>
371 |             <div class="card-info">
372 |               <strong>Workout Mix</strong>
373 |               <small>High-energy tracks to keep you moving</small>
374 |             </div>
375 |           </article>
376 | 
377 |           <article class="card playlist">
378 |             <div class="card-image">
379 |               <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center" alt="Focus Flow" />
380 |               <button class="play-overlay">▶</button>
381 |             </div>
382 |             <div class="card-info">
383 |               <strong>Focus Flow</strong>
384 |               <small>Concentration-friendly instrumentals</small>
385 |             </div>
386 |           </article>
387 | 
388 |           <article class="card playlist">
389 |             <div class="card-image">
390 |               <img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop&crop=center" alt="Party Anthems" />
391 |               <button class="play-overlay">▶</button>
392 |             </div>
393 |             <div class="card-info">
394 |               <strong>Party Anthems</strong>
395 |               <small>Get the party started</small>
396 |             </div>
397 |           </article>
398 |         </div>
399 |       </section>
400 | 
401 |       <section class="section reveal" id="new-releases">
402 |         <div class="section-header">
403 |           <h2>New Releases</h2>
404 |           <button class="section-more">Show all</button>
405 |         </div>
406 |         <div class="carousel" data-snap>
407 |           <article class="card">
408 |             <div class="card-image">
409 |               <img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop&crop=center" alt="New Album 1" />
410 |               <button class="play-overlay">▶</button>
411 |             </div>
412 |             <div class="card-info">
413 |               <strong>Electric Dreams</strong>
414 |               <small>Cyber Wave • 2024</small>
415 |             </div>
416 |           </article>
417 | 
418 |           <article class="card">
419 |             <div class="card-image">
420 |               <img src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop&crop=center" alt="New Album 2" />
421 |               <button class="play-overlay">▶</button>
422 |             </div>
423 |             <div class="card-info">
424 |               <strong>Urban Vibes</strong>
425 |               <small>City Sound • 2024</small>
426 |             </div>
427 |           </article>
428 | 
429 |           <article class="card">
430 |             <div class="card-image">
431 |               <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center" alt="New Album 3" />
432 |               <button class="play-overlay">▶</button>
433 |             </div>
434 |             <div class="card-info">
435 |               <strong>Digital Sunset</strong>
436 |               <small>Retro Future • 2024</small>
437 |             </div>
438 |           </article>
439 | 
440 |           <article class="card">
441 |             <div class="card-image">
442 |               <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center" alt="New Album 4" />
443 |               <button class="play-overlay">▶</button>
444 |             </div>
445 |             <div class="card-info">
446 |               <strong>Neon Nights</strong>
447 |               <small>Synth Collective • 2024</small>
448 |             </div>
449 |           </article>
450 | 
451 |           <article class="card">
452 |             <div class="card-image">
453 |               <img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop&crop=center" alt="New Album 5" />
454 |               <button class="play-overlay">▶</button>
455 |             </div>
456 |             <div class="card-info">
457 |               <strong>Midnight City</strong>
458 |               <small>Urban Beats • 2024</small>
459 |             </div>
460 |           </article>
461 |         </div>
462 |       </section>
463 | 
464 |       <section class="section reveal" id="trending">
465 |         <div class="section-header">
466 |           <h2>Trending Now</h2>
467 |           <button class="section-more">Show all</button>
468 |         </div>
469 |         <div class="carousel" data-snap>
470 |           <article class="card">
471 |             <div class="card-image">
472 |               <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center" alt="Trending 1" />
473 |               <button class="play-overlay">▶</button>
474 |             </div>
475 |             <div class="card-info">
476 |               <strong>Viral Hit</strong>
477 |               <small>Popular Track • Trending</small>
478 |             </div>
479 |           </article>
480 | 
481 |           <article class="card">
482 |             <div class="card-image">
483 |               <img src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop&crop=center" alt="Trending 2" />
484 |               <button class="play-overlay">▶</button>
485 |             </div>
486 |             <div class="card-info">
487 |               <strong>Chart Topper</strong>
488 |               <small>Top 40 • Trending</small>
489 |             </div>
490 |           </article>
491 | 
492 |           <article class="card">
493 |             <div class="card-image">
494 |               <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center" alt="Trending 3" />
495 |               <button class="play-overlay">▶</button>
496 |             </div>
497 |             <div class="card-info">
498 |               <strong>Global Sensation</strong>
499 |               <small>Worldwide Hit • Trending</small>
500 |             </div>
501 |           </article>
502 | 
503 |           <article class="card">
504 |             <div class="card-image">
505 |               <img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop&crop=center" alt="Trending 4" />
506 |               <button class="play-overlay">▶</button>
507 |             </div>
508 |             <div class="card-info">
509 |               <strong>Breakout Song</strong>
510 |               <small>Rising Star • Trending</small>
511 |             </div>
512 |           </article>
513 |         </div>
514 |       </section>
515 | 
516 |       <!-- spacer to allow player above -->
517 |       <div class="spacer" style="height: 90px;"></div>
518 |     </main>
519 | 
520 |     <!-- BOTTOM PLAYER -->
521 |     <div class="player" aria-hidden="false">
522 |       <div class="player-left">
523 |         <div class="player-art">
524 |           <img id="player-art" src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=center" alt="art" />
525 |           <div class="player-art-overlay"></div>
526 |         </div>
527 |         <div class="track-info">
528 |           <div id="track-title">Midnight Drive</div>
529 |           <div id="track-artist">Various Artists</div>
530 |         </div>
531 |         <button class="player-like" data-tooltip="Like This Song">
532 |           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
533 |             <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
534 |           </svg>
535 |         </button>
536 |       </div>
537 | 
538 |       <div class="player-center">
539 |         <div class="controls">
540 |           <button id="shuffle" class="ctrl" data-tooltip="Shuffle Playback">
541 |             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
542 |               <path d="M16 3h5v5M21 3l-7 7M8 21H3v-5M3 21l7-7"/>
543 |               <path d="m3 16 5-5 5 5M21 8l-5 5-5-5"/>
544 |             </svg>
545 |           </button>
546 |           <button id="prev" class="ctrl" data-tooltip="Previous Track">
547 |             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
548 |               <path d="M19 20 9 12l10-8v16Z"/>
549 |               <path d="M5 19V5"/>
550 |             </svg>
551 |           </button>
552 |           <button id="play" class="ctrl big" data-tooltip="Play/Pause">
553 |             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
554 |               <path d="M8 5v14l11-7z"/>
555 |             </svg>
556 |           </button>
557 |           <button id="next" class="ctrl" data-tooltip="Next Track">
558 |             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
559 |               <path d="M5 4v16l10-8L5 4Z"/>
560 |               <path d="M19 5v14"/>
561 |             </svg>
562 |           </button>
563 |           <button id="repeat" class="ctrl" data-tooltip="Repeat Track/Playlist">
564 |             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
565 |               <path d="m17 1 4 4-4 4"/>
566 |               <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
567 |               <path d="m7 23-4-4 4-4"/>
568 |               <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
569 |             </svg>
570 |           </button>
571 |         </div>
572 | 
573 |         <div class="progress-wrap">
574 |           <span id="time-elapsed">0:00</span>
575 |           <div class="progress-bar" id="progress-bar">
576 |             <div class="progress" id="progress"></div>
577 |             <div class="progress-handle" id="progress-handle"></div>
578 |           </div>
579 |           <span id="duration">3:24</span>
580 |         </div>
581 |     </div>
582 | 
583 |       <div class="player-right">
584 |         <div class="volume-control">
585 |           <button class="volume-btn" data-tooltip="Mute/Unmute">
586 |             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
587 |               <path d="M11 5 6 9H2v6h4l5 4V5Z"/>
588 |               <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
589 |             </svg>
590 |           </button>
591 |           <input id="volume" type="range" min="0" max="1" step="0.01" value="0.7" data-tooltip="Volume Control" />
592 |         </div>
593 |         <button class="queue-btn" data-tooltip="View Queue">
594 |           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
595 |             <path d="M3 12h18"/>
596 |             <path d="M3 6h18"/>
597 |             <path d="M3 18h18"/>
598 |           </svg>
599 |         </button>
600 |         <button class="device-btn" data-tooltip="Connect Device">
601 |           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
602 |             <rect x="2" y="4" width="20" height="16" rx="2"/>
603 |             <path d="m22 7-10 5L2 7"/>
604 |           </svg>
605 |         </button>
606 |       </div>
607 |  </div>
608 | 
609 |     <!-- FLOATING NOW PLAYING -->
610 |     <div class="floating-player" id="floating-player">
611 |       <div class="floating-art">
612 |         <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=40&h=40&fit=crop&crop=center" alt="art" />
613 |         <div class="floating-art-overlay"></div>
614 |       </div>
615 |       <div class="floating-info">
616 |         <div class="floating-title">Midnight Drive</div>
617 |         <div class="floating-artist">Various Artists</div>
618 |       </div>
619 |       <div class="floating-progress">
620 |         <div class="floating-progress-bar"></div>
621 |       </div>
622 |     </div>
623 |   </div>
624 | 
625 |   <!-- TOOLTIP CONTAINER -->
626 |   <div id="tooltip" class="tooltip"></div>
627 | 
628 |  <script src="script.js"></script>  
629 | </body>
630 | </html>


--------------------------------------------------------------------------------
/music1.mp3:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/pathakpk7/Spotify_clone/main/music1.mp3


--------------------------------------------------------------------------------
/music2.mp3:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/pathakpk7/Spotify_clone/main/music2.mp3


--------------------------------------------------------------------------------
/music3.mp3:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/pathakpk7/Spotify_clone/main/music3.mp3


--------------------------------------------------------------------------------
/music4.mp3:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/pathakpk7/Spotify_clone/main/music4.mp3


--------------------------------------------------------------------------------
/playgif.gif:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/pathakpk7/Spotify_clone/main/playgif.gif


--------------------------------------------------------------------------------
/playingGif.gif:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/pathakpk7/Spotify_clone/main/playingGif.gif


--------------------------------------------------------------------------------
/script.js:
--------------------------------------------------------------------------------
   1 | /* ===== PULSE MUSIC PLAYER - ENHANCED JAVASCRIPT ===== */
   2 | (() => {
   3 |   'use strict';
   4 | 
   5 |   // ===== GLOBAL STATE =====
   6 |   let isPlaying = false;
   7 |   let currentTrackIndex = 0;
   8 |   let progress = 0;
   9 |   let animationFrame = null;
  10 |   let playSpeed = 1;
  11 |   let isShuffled = false;
  12 |   let isRepeating = false;
  13 |   let volume = 0.7;
  14 |   let isDragging = false;
  15 |   let isFloatingPlayerVisible = false;
  16 | 
  17 |   // ===== ENHANCED PLAYLIST DATA =====
  18 |   const tracks = [
  19 |     { 
  20 |       title: "Midnight Drive", 
  21 |       artist: "Various Artists", 
  22 |       art: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=center", 
  23 |       duration: 204,
  24 |       genre: "Electronic",
  25 |       year: 2023
  26 |     },
  27 |     { 
  28 |       title: "Lo-Fi Mornings", 
  29 |       artist: "Beat Collective", 
  30 |       art: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=60&h=60&fit=crop&crop=center", 
  31 |       duration: 180,
  32 |       genre: "Lo-Fi",
  33 |       year: 2023
  34 |     },
  35 |     { 
  36 |       title: "Synthwave 88", 
  37 |       artist: "Neon Nights", 
  38 |       art: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=60&h=60&fit=crop&crop=center", 
  39 |       duration: 220,
  40 |       genre: "Synthwave",
  41 |       year: 2023
  42 |     },
  43 |     { 
  44 |       title: "Ambient Dreams", 
  45 |       artist: "Space Waves", 
  46 |       art: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=60&h=60&fit=crop&crop=center", 
  47 |       duration: 195,
  48 |       genre: "Ambient",
  49 |       year: 2023
  50 |     },
  51 |     { 
  52 |       title: "Future Bass", 
  53 |       artist: "Electro Lab", 
  54 |       art: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=center", 
  55 |       duration: 168,
  56 |       genre: "Future Bass",
  57 |       year: 2023
  58 |     }
  59 |   ];
  60 | 
  61 |   // ===== DOM ELEMENTS =====
  62 |   const elements = {
  63 |     // Player controls
  64 |     playBtn: document.getElementById('play'),
  65 |     prevBtn: document.getElementById('prev'),
  66 |     nextBtn: document.getElementById('next'),
  67 |     shuffleBtn: document.getElementById('shuffle'),
  68 |     repeatBtn: document.getElementById('repeat'),
  69 |     
  70 |     // Hero controls
  71 |     heroPlay: document.getElementById('hero-play'),
  72 |     heroSave: document.getElementById('hero-save'),
  73 |     heroMore: document.getElementById('hero-more'),
  74 |     
  75 |     // Progress
  76 |     progress: document.getElementById('progress'),
  77 |     progressBar: document.getElementById('progress-bar'),
  78 |     progressHandle: document.getElementById('progress-handle'),
  79 |     timeElapsed: document.getElementById('time-elapsed'),
  80 |     duration: document.getElementById('duration'),
  81 |     
  82 |     // Volume
  83 |     volume: document.getElementById('volume'),
  84 |     
  85 |     // Track info
  86 |     playerArt: document.getElementById('player-art'),
  87 |     trackTitle: document.getElementById('track-title'),
  88 |     trackArtist: document.getElementById('track-artist'),
  89 |     
  90 |     // UI Elements
  91 |     main: document.querySelector('.main'),
  92 |     sidebar: document.querySelector('.sidebar'),
  93 |     player: document.querySelector('.player'),
  94 |     floatingPlayer: document.getElementById('floating-player'),
  95 |     
  96 |     // Cards and overlays
  97 |     playOverlays: document.querySelectorAll('.play-overlay'),
  98 |     cards: document.querySelectorAll('.card'),
  99 |     
 100 |     // Sections
 101 |     sections: document.querySelectorAll('.section'),
 102 |     reveals: document.querySelectorAll('.reveal')
 103 |   };
 104 | 
 105 |   // ===== UTILITY FUNCTIONS =====
 106 |   const utils = {
 107 |     formatTime: (seconds) => {
 108 |       const mins = Math.floor(seconds / 60);
 109 |       const secs = Math.floor(seconds % 60);
 110 |       return `${mins}:${secs.toString().padStart(2, '0')}`;
 111 |     },
 112 | 
 113 |     clamp: (value, min, max) => Math.min(Math.max(value, min), max),
 114 | 
 115 |     lerp: (start, end, factor) => start + (end - start) * factor,
 116 | 
 117 |     debounce: (func, wait) => {
 118 |       let timeout;
 119 |       return function executedFunction(...args) {
 120 |         const later = () => {
 121 |           clearTimeout(timeout);
 122 |           func(...args);
 123 |         };
 124 |         clearTimeout(timeout);
 125 |         timeout = setTimeout(later, wait);
 126 |       };
 127 |     },
 128 | 
 129 |     throttle: (func, limit) => {
 130 |       let inThrottle;
 131 |       return function() {
 132 |         const args = arguments;
 133 |         const context = this;
 134 |         if (!inThrottle) {
 135 |           func.apply(context, args);
 136 |           inThrottle = true;
 137 |           setTimeout(() => inThrottle = false, limit);
 138 |         }
 139 |       };
 140 |     },
 141 | 
 142 |     easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
 143 |   };
 144 | 
 145 |   // ===== PLAYER FUNCTIONS =====
 146 |   const player = {
 147 |     loadTrack: (index) => {
 148 |       const track = tracks[index];
 149 |       elements.trackTitle.textContent = track.title;
 150 |       elements.trackArtist.textContent = track.artist;
 151 |       elements.duration.textContent = utils.formatTime(track.duration);
 152 |       elements.playerArt.src = track.art;
 153 |     progress = 0;
 154 |       player.updateProgressUI();
 155 |       
 156 |       // Update floating player
 157 |       const floatingArt = elements.floatingPlayer.querySelector('img');
 158 |       const floatingTitle = elements.floatingPlayer.querySelector('.floating-title');
 159 |       const floatingArtist = elements.floatingPlayer.querySelector('.floating-artist');
 160 |       
 161 |       if (floatingArt) floatingArt.src = track.art;
 162 |       if (floatingTitle) floatingTitle.textContent = track.title;
 163 |       if (floatingArtist) floatingArtist.textContent = track.artist;
 164 |       
 165 |       // Add loading animation
 166 |       elements.playerArt.style.opacity = '0.7';
 167 |       setTimeout(() => {
 168 |         elements.playerArt.style.opacity = '1';
 169 |       }, 300);
 170 |     },
 171 | 
 172 |     play: () => {
 173 |       if (isPlaying) {
 174 |         player.pause();
 175 |         return;
 176 |       }
 177 |       
 178 |       isPlaying = true;
 179 |       elements.playBtn.innerHTML = `
 180 |         <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
 181 |           <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
 182 |         </svg>
 183 |       `;
 184 |       
 185 |       if (elements.heroPlay) {
 186 |         elements.heroPlay.innerHTML = '<span class="btn-icon">⏸</span>Pause';
 187 |       }
 188 |       
 189 |       player.startProgressAnimation();
 190 |       player.showFloatingPlayer();
 191 |     },
 192 | 
 193 |     pause: () => {
 194 |       isPlaying = false;
 195 |       elements.playBtn.innerHTML = `
 196 |         <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
 197 |           <path d="M8 5v14l11-7z"/>
 198 |         </svg>
 199 |       `;
 200 |       
 201 |       if (elements.heroPlay) {
 202 |         elements.heroPlay.innerHTML = '<span class="btn-icon">▶</span>Play';
 203 |       }
 204 |       
 205 |       if (animationFrame) {
 206 |         cancelAnimationFrame(animationFrame);
 207 |         animationFrame = null;
 208 |       }
 209 |       
 210 |       player.hideFloatingPlayer();
 211 |     },
 212 | 
 213 |     next: () => {
 214 |       if (isShuffled) {
 215 |         currentTrackIndex = Math.floor(Math.random() * tracks.length);
 216 |       } else {
 217 |         currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
 218 |       }
 219 |       player.loadTrack(currentTrackIndex);
 220 |       if (isPlaying) {
 221 |         player.startProgressAnimation();
 222 |       }
 223 |       player.animateTrackChange();
 224 |     },
 225 | 
 226 |     prev: () => {
 227 |       currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
 228 |       player.loadTrack(currentTrackIndex);
 229 |       if (isPlaying) {
 230 |         player.startProgressAnimation();
 231 |       }
 232 |       player.animateTrackChange();
 233 |     },
 234 | 
 235 |     toggleShuffle: () => {
 236 |       isShuffled = !isShuffled;
 237 |       elements.shuffleBtn.style.color = isShuffled ? 'var(--accent-green)' : 'var(--text-secondary)';
 238 |     },
 239 | 
 240 |     toggleRepeat: () => {
 241 |       isRepeating = !isRepeating;
 242 |       elements.repeatBtn.style.color = isRepeating ? 'var(--accent-green)' : 'var(--text-secondary)';
 243 |     },
 244 | 
 245 |     startProgressAnimation: () => {
 246 |       const animate = () => {
 247 |         if (!isPlaying) return;
 248 |         
 249 |         progress += playSpeed * 0.016; // ~60fps
 250 |         player.updateProgressUI();
 251 |         
 252 |         const currentTrack = tracks[currentTrackIndex];
 253 |         if (progress >= currentTrack.duration) {
 254 |           if (isRepeating) {
 255 |             progress = 0;
 256 |           } else {
 257 |             player.next();
 258 |       return;
 259 |     }
 260 |         }
 261 |         
 262 |         animationFrame = requestAnimationFrame(animate);
 263 |       };
 264 |       animate();
 265 |     },
 266 | 
 267 |     updateProgressUI: () => {
 268 |       const currentTrack = tracks[currentTrackIndex];
 269 |       const percentage = Math.min(100, (progress / currentTrack.duration) * 100);
 270 |       
 271 |       elements.progress.style.width = percentage + '%';
 272 |       elements.timeElapsed.textContent = utils.formatTime(Math.floor(progress));
 273 |       
 274 |       // Update floating player progress
 275 |       const floatingProgress = elements.floatingPlayer.querySelector('.floating-progress-bar');
 276 |       if (floatingProgress) {
 277 |         floatingProgress.style.width = percentage + '%';
 278 |       }
 279 |     },
 280 | 
 281 |     seekTo: (percentage) => {
 282 |       const currentTrack = tracks[currentTrackIndex];
 283 |       progress = currentTrack.duration * percentage;
 284 |       player.updateProgressUI();
 285 |     },
 286 | 
 287 |     setVolume: (vol) => {
 288 |       volume = utils.clamp(vol, 0, 1);
 289 |       elements.volume.value = volume;
 290 |       playSpeed = 0.6 + volume * 1.4; // Visual effect
 291 |       elements.volume.title = Math.round(volume * 100) + '%';
 292 |     },
 293 | 
 294 |     showFloatingPlayer: () => {
 295 |       if (isFloatingPlayerVisible) return;
 296 |       
 297 |       isFloatingPlayerVisible = true;
 298 |       elements.floatingPlayer.classList.add('show');
 299 |       
 300 |       // Auto-hide after 3 seconds
 301 |       setTimeout(() => {
 302 |         player.hideFloatingPlayer();
 303 |       }, 3000);
 304 |     },
 305 | 
 306 |     hideFloatingPlayer: () => {
 307 |       if (!isFloatingPlayerVisible) return;
 308 |       
 309 |       isFloatingPlayerVisible = false;
 310 |       elements.floatingPlayer.classList.remove('show');
 311 |     },
 312 | 
 313 |     animateTrackChange: () => {
 314 |       elements.playerArt.style.transform = 'scale(0.9) rotate(-5deg)';
 315 |       elements.playerArt.style.opacity = '0.7';
 316 |       
 317 |       setTimeout(() => {
 318 |         elements.playerArt.style.transform = 'scale(1) rotate(0deg)';
 319 |         elements.playerArt.style.opacity = '1';
 320 |       }, 300);
 321 |     }
 322 |   };
 323 | 
 324 |   // ===== SCROLL ANIMATIONS =====
 325 |   const scrollAnimations = {
 326 |     init: () => {
 327 |       // Intersection Observer for reveal animations
 328 |       const observerOptions = {
 329 |         threshold: 0.1,
 330 |         rootMargin: '0px 0px -50px 0px'
 331 |       };
 332 | 
 333 |       const observer = new IntersectionObserver((entries) => {
 334 |         entries.forEach(entry => {
 335 |           if (entry.isIntersecting) {
 336 |             entry.target.classList.add('show');
 337 |           }
 338 |         });
 339 |       }, observerOptions);
 340 | 
 341 |       elements.reveals.forEach(el => observer.observe(el));
 342 | 
 343 |       // Scroll-based background animation
 344 |       scrollAnimations.setupBackgroundAnimation();
 345 |       
 346 |       // Parallax effects
 347 |       scrollAnimations.setupParallaxEffects();
 348 |       
 349 |       // Progress indicator
 350 |       scrollAnimations.setupProgressIndicator();
 351 |     },
 352 | 
 353 |     setupBackgroundAnimation: () => {
 354 |       let ticking = false;
 355 |       
 356 |       const updateBackground = () => {
 357 |         const scrollY = window.scrollY;
 358 |         const windowHeight = window.innerHeight;
 359 |         const documentHeight = document.documentElement.scrollHeight;
 360 |         
 361 |         const scrollProgress = scrollY / (documentHeight - windowHeight);
 362 |         const intensity = Math.min(scrollProgress * 0.3, 0.3);
 363 |         
 364 |         // Dynamic background gradient
 365 |         document.body.style.background = `
 366 |           linear-gradient(
 367 |             180deg,
 368 |             rgba(7,16,23,${1 - intensity}) 0%,
 369 |             rgba(7,19,26,${1 - intensity * 0.5}) 50%,
 370 |             rgba(10,10,10,1) 100%
 371 |           )
 372 |         `;
 373 |         
 374 |         ticking = false;
 375 |       };
 376 | 
 377 |       const requestTick = () => {
 378 |         if (!ticking) {
 379 |           requestAnimationFrame(updateBackground);
 380 |           ticking = true;
 381 |         }
 382 |       };
 383 | 
 384 |       window.addEventListener('scroll', requestTick, { passive: true });
 385 |     },
 386 | 
 387 |     setupParallaxEffects: () => {
 388 |       const parallaxElements = document.querySelectorAll('.hero-art');
 389 |       
 390 |       window.addEventListener('scroll', utils.throttle(() => {
 391 |         const scrollY = window.scrollY;
 392 |         
 393 |         parallaxElements.forEach((el) => {
 394 |           const rect = el.getBoundingClientRect();
 395 |           const speed = 0.03; // Very subtle parallax for hero only
 396 |           
 397 |           if (rect.top < window.innerHeight && rect.bottom > 0) {
 398 |             const yPos = -(scrollY * speed);
 399 |             el.style.transform = `translateY(${yPos}px)`;
 400 |           }
 401 |         });
 402 |       }, 16));
 403 |     },
 404 | 
 405 |     setupProgressIndicator: () => {
 406 |       const progressBar = document.createElement('div');
 407 |       progressBar.className = 'scroll-progress';
 408 |       progressBar.style.cssText = `
 409 |         position: fixed;
 410 |         top: 0;
 411 |         left: 0;
 412 |         width: 0%;
 413 |         height: 3px;
 414 |         background: var(--gradient-primary);
 415 |         z-index: 1000;
 416 |         transition: width 0.1s ease;
 417 |       `;
 418 |       document.body.appendChild(progressBar);
 419 | 
 420 |       window.addEventListener('scroll', utils.throttle(() => {
 421 |         const scrollTop = window.scrollY;
 422 |         const docHeight = document.documentElement.scrollHeight - window.innerHeight;
 423 |         const scrollPercent = (scrollTop / docHeight) * 100;
 424 |         
 425 |         progressBar.style.width = scrollPercent + '%';
 426 |       }, 16));
 427 |     }
 428 |   };
 429 | 
 430 |   // ===== CARD INTERACTIONS =====
 431 |   const cardInteractions = {
 432 |     init: () => {
 433 |       elements.cards.forEach(card => {
 434 |         cardInteractions.setupCardHover(card);
 435 |         cardInteractions.setupCardClick(card);
 436 |       });
 437 |       
 438 |       elements.playOverlays.forEach(overlay => {
 439 |         overlay.addEventListener('click', (e) => {
 440 |           e.stopPropagation();
 441 |           cardInteractions.playCardTrack(overlay.closest('.card'));
 442 |         });
 443 |       });
 444 |     },
 445 | 
 446 |     setupCardHover: (card) => {
 447 |       const image = card.querySelector('img');
 448 |       const overlay = card.querySelector('.play-overlay');
 449 |       
 450 |       card.addEventListener('mouseenter', () => {
 451 |         card.style.transform = 'translateY(-8px) scale(1.02)';
 452 |         if (image) image.style.transform = 'scale(1.03)';
 453 |         if (overlay) overlay.style.opacity = '1';
 454 |       });
 455 |       
 456 |       card.addEventListener('mouseleave', () => {
 457 |         card.style.transform = 'translateY(0) scale(1)';
 458 |         if (image) image.style.transform = 'scale(1)';
 459 |         if (overlay) overlay.style.opacity = '0';
 460 |       });
 461 |     },
 462 | 
 463 |     setupCardClick: (card) => {
 464 |       card.addEventListener('click', () => {
 465 |         cardInteractions.playCardTrack(card);
 466 |       });
 467 |     },
 468 | 
 469 |     playCardTrack: (card) => {
 470 |       const title = card.querySelector('strong')?.textContent;
 471 |       const artist = card.querySelector('small')?.textContent;
 472 |       
 473 |       // Find matching track
 474 |       const trackIndex = tracks.findIndex(track => 
 475 |         track.title === title || track.artist === artist
 476 |       );
 477 |       
 478 |       if (trackIndex !== -1) {
 479 |         currentTrackIndex = trackIndex;
 480 |         player.loadTrack(currentTrackIndex);
 481 |         player.play();
 482 |         
 483 |         // Scroll to player
 484 |         elements.player.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
 485 |       }
 486 |     }
 487 |   };
 488 | 
 489 |   // ===== CAROUSEL FUNCTIONALITY =====
 490 |   const carousel = {
 491 |     init: () => {
 492 |       const carousels = document.querySelectorAll('.carousel');
 493 |       
 494 |       carousels.forEach(carouselEl => {
 495 |         carousel.setupDragScroll(carouselEl);
 496 |         carousel.setupTouchScroll(carouselEl);
 497 |         carousel.setupKeyboardScroll(carouselEl);
 498 |       });
 499 |     },
 500 | 
 501 |     setupDragScroll: (carouselEl) => {
 502 |       let isDown = false;
 503 |       let startX;
 504 |       let scrollLeft;
 505 | 
 506 |       carouselEl.addEventListener('mousedown', (e) => {
 507 |         isDown = true;
 508 |         carouselEl.classList.add('active');
 509 |         startX = e.pageX - carouselEl.offsetLeft;
 510 |         scrollLeft = carouselEl.scrollLeft;
 511 |       });
 512 | 
 513 |       carouselEl.addEventListener('mouseleave', () => {
 514 |         isDown = false;
 515 |         carouselEl.classList.remove('active');
 516 |       });
 517 | 
 518 |       carouselEl.addEventListener('mouseup', () => {
 519 |         isDown = false;
 520 |         carouselEl.classList.remove('active');
 521 |       });
 522 | 
 523 |       carouselEl.addEventListener('mousemove', (e) => {
 524 |         if (!isDown) return;
 525 |         e.preventDefault();
 526 |         const x = e.pageX - carouselEl.offsetLeft;
 527 |         const walk = (x - startX) * 2;
 528 |         carouselEl.scrollLeft = scrollLeft - walk;
 529 |       });
 530 |     },
 531 | 
 532 |     setupTouchScroll: (carouselEl) => {
 533 |       let startX;
 534 |       let scrollLeft;
 535 | 
 536 |       carouselEl.addEventListener('touchstart', (e) => {
 537 |         startX = e.touches[0].pageX - carouselEl.offsetLeft;
 538 |         scrollLeft = carouselEl.scrollLeft;
 539 |       });
 540 | 
 541 |       carouselEl.addEventListener('touchmove', (e) => {
 542 |         if (!startX) return;
 543 |         const x = e.touches[0].pageX - carouselEl.offsetLeft;
 544 |         const walk = (x - startX) * 2;
 545 |         carouselEl.scrollLeft = scrollLeft - walk;
 546 |       });
 547 | 
 548 |       carouselEl.addEventListener('touchend', () => {
 549 |         startX = null;
 550 |       });
 551 |     },
 552 | 
 553 |     setupKeyboardScroll: (carouselEl) => {
 554 |       carouselEl.addEventListener('keydown', (e) => {
 555 |         if (e.key === 'ArrowLeft') {
 556 |           carouselEl.scrollBy({ left: -200, behavior: 'smooth' });
 557 |         } else if (e.key === 'ArrowRight') {
 558 |           carouselEl.scrollBy({ left: 200, behavior: 'smooth' });
 559 |         }
 560 |       });
 561 |     }
 562 |   };
 563 | 
 564 |   // ===== EVENT LISTENERS =====
 565 |   const eventListeners = {
 566 |     init: () => {
 567 |       // Player controls
 568 |       elements.playBtn.addEventListener('click', player.play);
 569 |       elements.prevBtn.addEventListener('click', player.prev);
 570 |       elements.nextBtn.addEventListener('click', player.next);
 571 |       elements.shuffleBtn.addEventListener('click', player.toggleShuffle);
 572 |       elements.repeatBtn.addEventListener('click', player.toggleRepeat);
 573 | 
 574 |       // Hero controls
 575 |       if (elements.heroPlay) {
 576 |         elements.heroPlay.addEventListener('click', player.play);
 577 |       }
 578 |       
 579 |       if (elements.heroSave) {
 580 |         elements.heroSave.addEventListener('click', () => {
 581 |           elements.heroSave.innerHTML = '<span class="btn-icon">✓</span>Saved';
 582 |           setTimeout(() => {
 583 |             elements.heroSave.innerHTML = '<span class="btn-icon">♡</span>Save';
 584 |           }, 2000);
 585 |         });
 586 |       }
 587 | 
 588 |       // Progress bar
 589 |       elements.progressBar.addEventListener('click', (e) => {
 590 |         const rect = elements.progressBar.getBoundingClientRect();
 591 |         const x = e.clientX - rect.left;
 592 |         const percentage = utils.clamp(x / rect.width, 0, 1);
 593 |         player.seekTo(percentage);
 594 |       });
 595 | 
 596 |       // Volume control
 597 |       elements.volume.addEventListener('input', (e) => {
 598 |         player.setVolume(parseFloat(e.target.value));
 599 |       });
 600 | 
 601 |       // Keyboard shortcuts
 602 |       document.addEventListener('keydown', eventListeners.handleKeyboard);
 603 | 
 604 |       // Window events
 605 |       window.addEventListener('resize', utils.debounce(eventListeners.handleResize, 250));
 606 |       
 607 |       // Scroll events
 608 |       window.addEventListener('scroll', utils.throttle(eventListeners.handleScroll, 16));
 609 | 
 610 |       // Visibility change (pause when tab is hidden)
 611 |       document.addEventListener('visibilitychange', () => {
 612 |         if (document.hidden && isPlaying) {
 613 |           // Optionally pause when tab is hidden
 614 |           // player.pause();
 615 |         }
 616 |       });
 617 |     },
 618 | 
 619 |     handleKeyboard: (e) => {
 620 |       // Prevent default for music player shortcuts
 621 |       if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
 622 | 
 623 |       switch (e.code) {
 624 |         case 'Space':
 625 |           e.preventDefault();
 626 |           player.play();
 627 |           break;
 628 |         case 'ArrowLeft':
 629 |           e.preventDefault();
 630 |           player.prev();
 631 |           break;
 632 |         case 'ArrowRight':
 633 |           e.preventDefault();
 634 |           player.next();
 635 |           break;
 636 |         case 'KeyS':
 637 |           if (e.ctrlKey) {
 638 |             e.preventDefault();
 639 |             player.toggleShuffle();
 640 |           }
 641 |           break;
 642 |         case 'KeyR':
 643 |           if (e.ctrlKey) {
 644 |             e.preventDefault();
 645 |             player.toggleRepeat();
 646 |           }
 647 |           break;
 648 |         case 'ArrowUp':
 649 |           e.preventDefault();
 650 |           player.setVolume(volume + 0.1);
 651 |           break;
 652 |         case 'ArrowDown':
 653 |       e.preventDefault();
 654 |           player.setVolume(volume - 0.1);
 655 |           break;
 656 |       }
 657 |     },
 658 | 
 659 |     handleResize: () => {
 660 |       // Handle responsive adjustments
 661 |       const isMobile = window.innerWidth <= 768;
 662 |       
 663 |       if (isMobile) {
 664 |         elements.sidebar.style.position = 'relative';
 665 |         elements.player.style.left = '16px';
 666 |         elements.player.style.right = '16px';
 667 |       } else {
 668 |         elements.sidebar.style.position = 'fixed';
 669 |         elements.player.style.left = '304px';
 670 |         elements.player.style.right = '24px';
 671 |       }
 672 |     },
 673 | 
 674 |     handleScroll: () => {
 675 |       // Hide/show player based on scroll direction
 676 |       const scrollY = window.scrollY;
 677 |       const lastScrollY = window.lastScrollY || 0;
 678 |       
 679 |       if (scrollY > lastScrollY && scrollY > 100) {
 680 |         elements.player.style.transform = 'translateY(100px)';
 681 |       } else {
 682 |         elements.player.style.transform = 'translateY(0)';
 683 |       }
 684 |       
 685 |       window.lastScrollY = scrollY;
 686 |     }
 687 |   };
 688 | 
 689 |   // ===== PERFORMANCE OPTIMIZATIONS =====
 690 |   const performance = {
 691 |     init: () => {
 692 |       // Preload images
 693 |       performance.preloadImages();
 694 |       
 695 |       // Setup intersection observer for lazy loading
 696 |       performance.setupLazyLoading();
 697 |       
 698 |       // Optimize animations
 699 |       performance.optimizeAnimations();
 700 |     },
 701 | 
 702 |     preloadImages: () => {
 703 |       const imageUrls = tracks.map(track => track.art);
 704 |       imageUrls.forEach(url => {
 705 |         const img = new Image();
 706 |         img.src = url;
 707 |       });
 708 |     },
 709 | 
 710 |     setupLazyLoading: () => {
 711 |       const images = document.querySelectorAll('img[data-src]');
 712 |       const imageObserver = new IntersectionObserver((entries) => {
 713 |         entries.forEach(entry => {
 714 |           if (entry.isIntersecting) {
 715 |             const img = entry.target;
 716 |             img.src = img.dataset.src;
 717 |             img.removeAttribute('data-src');
 718 |             imageObserver.unobserve(img);
 719 |           }
 720 |     });
 721 |   });
 722 | 
 723 |       images.forEach(img => imageObserver.observe(img));
 724 |     },
 725 | 
 726 |     optimizeAnimations: () => {
 727 |       // Add will-change for animated elements
 728 |       const animatedElements = document.querySelectorAll('.card, .player, .floating-player');
 729 |       animatedElements.forEach(el => {
 730 |         el.style.willChange = 'transform, opacity';
 731 |       });
 732 |     }
 733 |   };
 734 | 
 735 |   // ===== HERO SLIDESHOW =====
 736 |   const heroSlideshow = {
 737 |     currentSlide: 0,
 738 |     totalSlides: 5,
 739 |     isPlaying: true,
 740 |     slideInterval: null,
 741 |     
 742 |     slides: [
 743 |       {
 744 |         title: "Neon Nights",
 745 |         subtitle: "Curated beats, chill vibes and fresh releases. Tune in and unwind with the perfect soundtrack for your night.",
 746 |         image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop&crop=center",
 747 |         gradient: "linear-gradient(135deg, #1DB954, #2ecc71)"
 748 |       },
 749 |       {
 750 |         title: "Electric Dreams",
 751 |         subtitle: "High-energy electronic music that will get you moving. Perfect for your workout or party playlist.",
 752 |         image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=600&fit=crop&crop=center",
 753 |         gradient: "linear-gradient(135deg, #e74c3c, #f39c12)"
 754 |       },
 755 |       {
 756 |         title: "Midnight City",
 757 |         subtitle: "Urban beats and city sounds that capture the essence of modern life. From dawn to dusk.",
 758 |         image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop&crop=center",
 759 |         gradient: "linear-gradient(135deg, #9b59b6, #8e44ad)"
 760 |       },
 761 |       {
 762 |         title: "Synthwave Vibes",
 763 |         subtitle: "Retro-futuristic sounds that transport you to another dimension. A journey through time and space.",
 764 |         image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop&crop=center",
 765 |         gradient: "linear-gradient(135deg, #3498db, #2980b9)"
 766 |       },
 767 |       {
 768 |         title: "Cyber Pulse",
 769 |         subtitle: "Cutting-edge electronic music that pushes boundaries. Experience the future of sound today.",
 770 |         image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop&crop=center",
 771 |         gradient: "linear-gradient(135deg, #f1c40f, #f39c12)"
 772 |       }
 773 |     ],
 774 | 
 775 |     init: () => {
 776 |       heroSlideshow.setupIndicators();
 777 |       heroSlideshow.startSlideshow();
 778 |       heroSlideshow.preloadImages();
 779 |     },
 780 | 
 781 |     startSlideshow: () => {
 782 |       heroSlideshow.slideInterval = setInterval(() => {
 783 |         heroSlideshow.nextSlide();
 784 |       }, 4000); // Change slide every 4 seconds
 785 |     },
 786 | 
 787 |     nextSlide: () => {
 788 |       heroSlideshow.currentSlide = (heroSlideshow.currentSlide + 1) % heroSlideshow.totalSlides;
 789 |       heroSlideshow.updateSlide();
 790 |     },
 791 | 
 792 |     goToSlide: (slideIndex) => {
 793 |       heroSlideshow.currentSlide = slideIndex;
 794 |       heroSlideshow.updateSlide();
 795 |     },
 796 | 
 797 |     updateSlide: () => {
 798 |       const slide = heroSlideshow.slides[heroSlideshow.currentSlide];
 799 |       
 800 |       // Update background slides
 801 |       document.querySelectorAll('.slide').forEach((slideEl, index) => {
 802 |         slideEl.classList.toggle('active', index === heroSlideshow.currentSlide);
 803 |       });
 804 | 
 805 |       // Update title slideshow
 806 |       document.querySelectorAll('.title-slide').forEach((titleEl, index) => {
 807 |         titleEl.classList.toggle('active', index === heroSlideshow.currentSlide);
 808 |         titleEl.textContent = heroSlideshow.slides[index].title;
 809 |       });
 810 | 
 811 |       // Update subtitle slideshow
 812 |       document.querySelectorAll('.subtitle-slide').forEach((subtitleEl, index) => {
 813 |         subtitleEl.classList.toggle('active', index === heroSlideshow.currentSlide);
 814 |         subtitleEl.textContent = heroSlideshow.slides[index].subtitle;
 815 |       });
 816 | 
 817 |       // Update hero artwork with smooth transition
 818 |       const heroArtwork = document.getElementById('hero-artwork');
 819 |       if (heroArtwork) {
 820 |         heroArtwork.style.opacity = '0.7';
 821 |         setTimeout(() => {
 822 |           heroArtwork.src = slide.image;
 823 |           heroArtwork.style.opacity = '1';
 824 |         }, 300);
 825 |       }
 826 | 
 827 |       // Update indicators
 828 |       document.querySelectorAll('.indicator').forEach((indicator, index) => {
 829 |         indicator.classList.toggle('active', index === heroSlideshow.currentSlide);
 830 |       });
 831 | 
 832 |       // Update hero background gradient
 833 |       const heroBackground = document.querySelector('.hero-background');
 834 |       if (heroBackground) {
 835 |         heroBackground.style.background = slide.gradient;
 836 |       }
 837 |     },
 838 | 
 839 |     setupIndicators: () => {
 840 |       document.querySelectorAll('.indicator').forEach((indicator, index) => {
 841 |         indicator.addEventListener('click', () => {
 842 |           heroSlideshow.goToSlide(index);
 843 |           heroSlideshow.pauseSlideshow();
 844 |           setTimeout(() => {
 845 |             heroSlideshow.resumeSlideshow();
 846 |           }, 8000); // Resume after 8 seconds
 847 |         });
 848 |       });
 849 |     },
 850 | 
 851 |     pauseSlideshow: () => {
 852 |       if (heroSlideshow.slideInterval) {
 853 |         clearInterval(heroSlideshow.slideInterval);
 854 |         heroSlideshow.isPlaying = false;
 855 |       }
 856 |     },
 857 | 
 858 |     resumeSlideshow: () => {
 859 |       if (!heroSlideshow.isPlaying) {
 860 |         heroSlideshow.isPlaying = true;
 861 |         heroSlideshow.startSlideshow();
 862 |       }
 863 |     },
 864 | 
 865 |     preloadImages: () => {
 866 |       heroSlideshow.slides.forEach(slide => {
 867 |         const img = new Image();
 868 |         img.src = slide.image;
 869 |       });
 870 |     }
 871 |   };
 872 | 
 873 |   // ===== LOADING ANIMATIONS =====
 874 |   const loadingAnimations = {
 875 |     init: () => {
 876 |       loadingAnimations.setupEntranceAnimations();
 877 |       loadingAnimations.setupStaggeredReveals();
 878 |     },
 879 | 
 880 |     setupEntranceAnimations: () => {
 881 |       // Add entrance animation to main elements
 882 |       const elements = [
 883 |         { selector: '.sidebar', delay: 0 },
 884 |         { selector: '.hero', delay: 200 },
 885 |         { selector: '.section', delay: 400 }
 886 |       ];
 887 | 
 888 |       elements.forEach(({ selector, delay }) => {
 889 |         const element = document.querySelector(selector);
 890 |         if (element) {
 891 |           element.style.opacity = '0';
 892 |           element.style.transform = 'translateY(30px)';
 893 |           
 894 |           setTimeout(() => {
 895 |             element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
 896 |             element.style.opacity = '1';
 897 |             element.style.transform = 'translateY(0)';
 898 |           }, delay);
 899 |         }
 900 |       });
 901 |     },
 902 | 
 903 |     setupStaggeredReveals: () => {
 904 |       const cards = document.querySelectorAll('.card');
 905 |       cards.forEach((card, index) => {
 906 |         card.style.opacity = '0';
 907 |         card.style.transform = 'translateY(20px)';
 908 |         
 909 |         setTimeout(() => {
 910 |           card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
 911 |           card.style.opacity = '1';
 912 |           card.style.transform = 'translateY(0)';
 913 |         }, 600 + (index * 100)); // Staggered reveal
 914 |       });
 915 |     }
 916 |   };
 917 | 
 918 |   // ===== TOOLTIP SYSTEM =====
 919 |   const tooltipSystem = {
 920 |     tooltip: null,
 921 |     currentElement: null,
 922 |     showTimeout: null,
 923 |     hideTimeout: null,
 924 | 
 925 |     init: () => {
 926 |       tooltipSystem.tooltip = document.getElementById('tooltip');
 927 |       tooltipSystem.setupTooltips();
 928 |     },
 929 | 
 930 |     setupTooltips: () => {
 931 |       const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
 932 |       
 933 |       elementsWithTooltips.forEach(element => {
 934 |         element.addEventListener('mouseenter', (e) => {
 935 |           tooltipSystem.showTooltip(e.target, e.target.dataset.tooltip);
 936 |         });
 937 |         
 938 |         element.addEventListener('mouseleave', () => {
 939 |           tooltipSystem.hideTooltip();
 940 |         });
 941 |         
 942 |         element.addEventListener('mousemove', (e) => {
 943 |           tooltipSystem.updateTooltipPosition(e);
 944 |         });
 945 |       });
 946 |     },
 947 | 
 948 |     showTooltip: (element, text) => {
 949 |       if (tooltipSystem.hideTimeout) {
 950 |         clearTimeout(tooltipSystem.hideTimeout);
 951 |         tooltipSystem.hideTimeout = null;
 952 |       }
 953 | 
 954 |       tooltipSystem.showTimeout = setTimeout(() => {
 955 |         if (tooltipSystem.tooltip && text) {
 956 |           tooltipSystem.currentElement = element;
 957 |           tooltipSystem.tooltip.textContent = text;
 958 |           tooltipSystem.tooltip.classList.add('show');
 959 |           tooltipSystem.updateTooltipPosition({ clientX: 0, clientY: 0 });
 960 |         }
 961 |       }, 500); // 500ms delay before showing
 962 |     },
 963 | 
 964 |     hideTooltip: () => {
 965 |       if (tooltipSystem.showTimeout) {
 966 |         clearTimeout(tooltipSystem.showTimeout);
 967 |         tooltipSystem.showTimeout = null;
 968 |       }
 969 | 
 970 |       tooltipSystem.hideTimeout = setTimeout(() => {
 971 |         if (tooltipSystem.tooltip) {
 972 |           tooltipSystem.tooltip.classList.remove('show');
 973 |           tooltipSystem.currentElement = null;
 974 |         }
 975 |       }, 100);
 976 |     },
 977 | 
 978 |     updateTooltipPosition: (e) => {
 979 |       if (!tooltipSystem.tooltip || !tooltipSystem.currentElement) return;
 980 | 
 981 |       const rect = tooltipSystem.currentElement.getBoundingClientRect();
 982 |       const tooltipRect = tooltipSystem.tooltip.getBoundingClientRect();
 983 |       
 984 |       let x = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
 985 |       let y = rect.top - tooltipRect.height - 10;
 986 |       
 987 |       // Keep tooltip within viewport
 988 |       const viewportWidth = window.innerWidth;
 989 |       const viewportHeight = window.innerHeight;
 990 |       
 991 |       if (x < 10) x = 10;
 992 |       if (x + tooltipRect.width > viewportWidth - 10) {
 993 |         x = viewportWidth - tooltipRect.width - 10;
 994 |       }
 995 |       
 996 |       if (y < 10) {
 997 |         y = rect.bottom + 10;
 998 |         tooltipSystem.tooltip.classList.add('tooltip-bottom');
 999 |       } else {
1000 |         tooltipSystem.tooltip.classList.remove('tooltip-bottom');
1001 |       }
1002 |       
1003 |       tooltipSystem.tooltip.style.left = x + 'px';
1004 |       tooltipSystem.tooltip.style.top = y + 'px';
1005 |     }
1006 |   };
1007 | 
1008 |   // ===== ENHANCED INTERACTIONS =====
1009 |   const enhancedInteractions = {
1010 |     init: () => {
1011 |       enhancedInteractions.setupNavigation();
1012 |       enhancedInteractions.setupPlaylistInteractions();
1013 |       enhancedInteractions.setupSectionInteractions();
1014 |       enhancedInteractions.setupVolumeMute();
1015 |       enhancedInteractions.setupQueueModal();
1016 |       enhancedInteractions.setupDeviceModal();
1017 |     },
1018 | 
1019 |     setupNavigation: () => {
1020 |       document.querySelectorAll('.nav-link').forEach(link => {
1021 |         link.addEventListener('click', (e) => {
1022 |           e.preventDefault();
1023 |           const href = link.getAttribute('href');
1024 |           
1025 |           // Update active state
1026 |           document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
1027 |           link.classList.add('active');
1028 |           
1029 |           // Scroll to section
1030 |           if (href.startsWith('#')) {
1031 |             const target = document.querySelector(href);
1032 |             if (target) {
1033 |               target.scrollIntoView({ behavior: 'smooth' });
1034 |             }
1035 |           }
1036 |           
1037 |           // Show feedback
1038 |           link.style.transform = 'scale(0.95)';
1039 |           setTimeout(() => {
1040 |             link.style.transform = '';
1041 |           }, 150);
1042 |         });
1043 |       });
1044 |     },
1045 | 
1046 |     setupPlaylistInteractions: () => {
1047 |       // Create playlist button
1048 |       const createPlaylist = document.querySelector('.create-playlist');
1049 |       if (createPlaylist) {
1050 |         createPlaylist.addEventListener('click', () => {
1051 |           createPlaylist.innerHTML = '<span class="icon">✓</span>Playlist Created!';
1052 |           createPlaylist.style.background = 'var(--gradient-primary)';
1053 |           setTimeout(() => {
1054 |             createPlaylist.innerHTML = '<span class="icon">+</span>Create Playlist';
1055 |             createPlaylist.style.background = '';
1056 |           }, 2000);
1057 |         });
1058 |       }
1059 | 
1060 |       // Playlist items
1061 |       document.querySelectorAll('.playlist-item').forEach(item => {
1062 |         item.addEventListener('click', () => {
1063 |           document.querySelectorAll('.playlist-item').forEach(i => i.classList.remove('active'));
1064 |           item.classList.add('active');
1065 |           
1066 |           // Simulate loading playlist
1067 |           const playlistName = item.querySelector('span:last-child').textContent;
1068 |           console.log(`Loading playlist: ${playlistName}`);
1069 |         });
1070 |       });
1071 |     },
1072 | 
1073 |     setupSectionInteractions: () => {
1074 |       document.querySelectorAll('.section-more').forEach(button => {
1075 |         button.addEventListener('click', () => {
1076 |           button.innerHTML = 'Loading...';
1077 |           button.style.color = 'var(--accent-green)';
1078 |           setTimeout(() => {
1079 |             button.innerHTML = 'Show all';
1080 |             button.style.color = '';
1081 |           }, 1500);
1082 |         });
1083 |       });
1084 |     },
1085 | 
1086 |     setupVolumeMute: () => {
1087 |       const volumeBtn = document.querySelector('.volume-btn');
1088 |       if (volumeBtn) {
1089 |         volumeBtn.addEventListener('click', () => {
1090 |           if (volume > 0) {
1091 |             player.setVolume(0);
1092 |             volumeBtn.innerHTML = `
1093 |               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
1094 |                 <path d="M11 5 6 9H2v6h4l5 4V5Z"/>
1095 |                 <path d="M23 9l-6 6M17 9l6 6"/>
1096 |               </svg>
1097 |             `;
1098 |           } else {
1099 |             player.setVolume(0.7);
1100 |             volumeBtn.innerHTML = `
1101 |               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
1102 |                 <path d="M11 5 6 9H2v6h4l5 4V5Z"/>
1103 |                 <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
1104 |               </svg>
1105 |             `;
1106 |           }
1107 |         });
1108 |       }
1109 |     },
1110 | 
1111 |     setupQueueModal: () => {
1112 |       const queueBtn = document.querySelector('.queue-btn');
1113 |       if (queueBtn) {
1114 |         queueBtn.addEventListener('click', () => {
1115 |           // Create and show queue modal
1116 |           const modal = document.createElement('div');
1117 |           modal.className = 'queue-modal';
1118 |           modal.innerHTML = `
1119 |             <div class="modal-content">
1120 |               <h3>Up Next</h3>
1121 |               <div class="queue-list">
1122 |                 ${tracks.map((track, index) => `
1123 |                   <div class="queue-item ${index === currentTrackIndex ? 'current' : ''}">
1124 |                     <img src="${track.art}" alt="${track.title}">
1125 |                     <div class="queue-info">
1126 |                       <strong>${track.title}</strong>
1127 |                       <small>${track.artist}</small>
1128 |                     </div>
1129 |                     ${index === currentTrackIndex ? '<span class="current-indicator">▶</span>' : ''}
1130 |                   </div>
1131 |                 `).join('')}
1132 |               </div>
1133 |               <button class="close-queue">Close</button>
1134 |             </div>
1135 |           `;
1136 |           
1137 |           document.body.appendChild(modal);
1138 |           
1139 |           // Close modal
1140 |           modal.querySelector('.close-queue').addEventListener('click', () => {
1141 |             modal.remove();
1142 |           });
1143 |           
1144 |           modal.addEventListener('click', (e) => {
1145 |             if (e.target === modal) modal.remove();
1146 |           });
1147 |         });
1148 |       }
1149 |     },
1150 | 
1151 |     setupDeviceModal: () => {
1152 |       const deviceBtn = document.querySelector('.device-btn');
1153 |       if (deviceBtn) {
1154 |         deviceBtn.addEventListener('click', () => {
1155 |           // Create and show device modal
1156 |           const modal = document.createElement('div');
1157 |           modal.className = 'device-modal';
1158 |           modal.innerHTML = `
1159 |             <div class="modal-content">
1160 |               <h3>Connect to a Device</h3>
1161 |               <div class="device-list">
1162 |                 <div class="device-item">
1163 |                   <div class="device-icon">🔊</div>
1164 |                   <div class="device-info">
1165 |                     <strong>This Computer</strong>
1166 |                     <small>Currently playing</small>
1167 |                   </div>
1168 |                   <div class="device-status active">Connected</div>
1169 |                 </div>
1170 |                 <div class="device-item">
1171 |                   <div class="device-icon">📱</div>
1172 |                   <div class="device-info">
1173 |                     <strong>iPhone (John's iPhone)</strong>
1174 |                     <small>Available</small>
1175 |                   </div>
1176 |                   <div class="device-status">Connect</div>
1177 |                 </div>
1178 |                 <div class="device-item">
1179 |                   <div class="device-icon">🎧</div>
1180 |                   <div class="device-info">
1181 |                     <strong>AirPods Pro</strong>
1182 |                     <small>Available</small>
1183 |                   </div>
1184 |                   <div class="device-status">Connect</div>
1185 |                 </div>
1186 |               </div>
1187 |               <button class="close-device">Close</button>
1188 |             </div>
1189 |           `;
1190 |           
1191 |           document.body.appendChild(modal);
1192 |           
1193 |           // Close modal
1194 |           modal.querySelector('.close-device').addEventListener('click', () => {
1195 |             modal.remove();
1196 |           });
1197 |           
1198 |           modal.addEventListener('click', (e) => {
1199 |             if (e.target === modal) modal.remove();
1200 |           });
1201 |         });
1202 |       }
1203 |     }
1204 |   };
1205 | 
1206 |   // ===== INITIALIZATION =====
1207 |   const init = () => {
1208 |     // Initialize all modules
1209 |     player.loadTrack(currentTrackIndex);
1210 |     player.setVolume(volume);
1211 |     
1212 |     // Initialize new systems
1213 |     tooltipSystem.init();
1214 |     enhancedInteractions.init();
1215 |     
1216 |     // Initialize slideshow and animations
1217 |     heroSlideshow.init();
1218 |     loadingAnimations.init();
1219 |     
1220 |     scrollAnimations.init();
1221 |     cardInteractions.init();
1222 |     carousel.init();
1223 |     eventListeners.init();
1224 |     performance.init();
1225 | 
1226 |     // Add loading complete class
1227 |     setTimeout(() => {
1228 |       document.body.classList.add('loaded');
1229 |     }, 1000);
1230 |     
1231 |     // Show welcome message
1232 |     console.log('🎵 Pulse Music Player initialized successfully!');
1233 |     console.log('🎹 Keyboard shortcuts: Space (play/pause), ← → (prev/next), ↑ ↓ (volume)');
1234 |     console.log('🎨 Colorful slideshow with dynamic content loaded!');
1235 |     console.log('💡 Hover over buttons to see tooltips!');
1236 |   };
1237 | 
1238 |   // ===== START THE APPLICATION =====
1239 |   if (document.readyState === 'loading') {
1240 |     document.addEventListener('DOMContentLoaded', init);
1241 |   } else {
1242 |     init();
1243 |   }
1244 | 
1245 |   // ===== EXPOSE GLOBAL API =====
1246 |   window.PulsePlayer = {
1247 |     player,
1248 |     utils,
1249 |     tracks,
1250 |     currentTrack: () => tracks[currentTrackIndex],
1251 |     isPlaying: () => isPlaying,
1252 |     volume: () => volume
1253 |   };
1254 | 
1255 | })();


--------------------------------------------------------------------------------
/scripts:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/pathakpk7/Spotify_clone/main/scripts


--------------------------------------------------------------------------------
/spotifyBg.jpg:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/pathakpk7/Spotify_clone/main/spotifyBg.jpg


--------------------------------------------------------------------------------
/spotifyLog.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/pathakpk7/Spotify_clone/main/spotifyLog.png


--------------------------------------------------------------------------------
/style.css:
--------------------------------------------------------------------------------
   1 | /* ===== CSS VARIABLES ===== */
   2 | :root {
   3 |   --bg-primary: #0a0a0a;
   4 |   --bg-secondary: #121212;
   5 |   --bg-tertiary: #181818;
   6 |   --bg-card: #1a1a1a;
   7 |   --bg-hover: #282828;
   8 |   --accent-green: #1DB954;
   9 |   --accent-green-hover: #1ed760;
  10 |   --text-primary: #ffffff;
  11 |   --text-secondary: #b3b3b3;
  12 |   --text-muted: #a0a0a0;
  13 |   --border-subtle: rgba(255, 255, 255, 0.1);
  14 |   --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.4);
  15 |   --shadow-hover: 0 16px 48px rgba(0, 0, 0, 0.6);
  16 |   --gradient-primary: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
  17 |   --gradient-bg: linear-gradient(180deg, #0a0a0a 0%, #121212 50%, #181818 100%);
  18 |   --gradient-hero: linear-gradient(135deg, rgba(29, 185, 84, 0.1) 0%, rgba(30, 215, 96, 0.05) 100%);
  19 |   --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  20 |   --transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  21 |   --border-radius: 12px;
  22 |   --border-radius-large: 16px;
  23 | }
  24 | 
  25 | /* ===== RESET & BASE STYLES ===== */
  26 | * {
  27 |   box-sizing: border-box;
  28 |   margin: 0;
  29 |   padding: 0;
  30 | }
  31 | 
  32 | html {
  33 |   scroll-behavior: smooth;
  34 | }
  35 | 
  36 | body {
  37 |   font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  38 |   background: var(--gradient-bg);
  39 |   color: var(--text-primary);
  40 |   line-height: 1.6;
  41 |   overflow-x: hidden;
  42 |   -webkit-font-smoothing: antialiased;
  43 |   -moz-osx-font-smoothing: grayscale;
  44 | }
  45 | 
  46 | /* ===== APP LAYOUT ===== */
  47 | .app {
  48 |   display: flex;
  49 |   min-height: 100vh;
  50 |   position: relative;
  51 | }
  52 | 
  53 | /* ===== SIDEBAR ===== */
  54 | .sidebar {
  55 |   width: 280px;
  56 |   background: rgba(0, 0, 0, 0.8);
  57 |   backdrop-filter: blur(20px);
  58 |   border-right: 1px solid var(--border-subtle);
  59 |   padding: 24px 20px;
  60 |   display: flex;
  61 |   flex-direction: column;
  62 |   gap: 24px;
  63 |   position: fixed;
  64 |   height: 100vh;
  65 |   overflow-y: auto;
  66 |   z-index: 100;
  67 |   transition: var(--transition-smooth);
  68 | }
  69 | 
  70 | .brand {
  71 |   display: flex;
  72 |   align-items: center;
  73 |   gap: 16px;
  74 |   padding: 8px 0;
  75 | }
  76 | 
  77 | .logo {
  78 |   width: 52px;
  79 |   height: 52px;
  80 |   border-radius: 14px;
  81 |   background: var(--gradient-primary);
  82 |   display: flex;
  83 |   align-items: center;
  84 |   justify-content: center;
  85 |   color: white;
  86 |   font-weight: 800;
  87 |   font-size: 20px;
  88 |   box-shadow: var(--shadow-card);
  89 |   transition: var(--transition-bounce);
  90 | }
  91 | 
  92 | .logo:hover {
  93 |   transform: scale(1.05) rotate(5deg);
  94 | }
  95 | 
  96 | .brand-text strong {
  97 |   display: block;
  98 |   font-size: 1.4rem;
  99 |   font-weight: 700;
 100 |   background: linear-gradient(135deg, var(--text-primary), var(--accent-green));
 101 |   -webkit-background-clip: text;
 102 |   -webkit-text-fill-color: transparent;
 103 |   background-clip: text;
 104 | }
 105 | 
 106 | .brand-text small {
 107 |   color: var(--text-muted);
 108 |   font-size: 0.85rem;
 109 |   font-weight: 500;
 110 | }
 111 | 
 112 | /* ===== NAVIGATION ===== */
 113 | .nav {
 114 |   display: flex;
 115 |   flex-direction: column;
 116 |   gap: 4px;
 117 | }
 118 | 
 119 | .nav-link {
 120 |   color: var(--text-secondary);
 121 |   display: flex;
 122 |   align-items: center;
 123 |   gap: 16px;
 124 |   padding: 12px 16px;
 125 |   border-radius: var(--border-radius);
 126 |   text-decoration: none;
 127 |   font-weight: 600;
 128 |   font-size: 0.95rem;
 129 |   transition: var(--transition-smooth);
 130 |   position: relative;
 131 |   overflow: hidden;
 132 | }
 133 | 
 134 | .nav-link::before {
 135 |   content: '';
 136 |   position: absolute;
 137 |   top: 0;
 138 |   left: -100%;
 139 |   width: 100%;
 140 |   height: 100%;
 141 |   background: var(--gradient-primary);
 142 |   opacity: 0.1;
 143 |   transition: var(--transition-smooth);
 144 | }
 145 | 
 146 | .nav-link:hover::before {
 147 |   left: 0;
 148 | }
 149 | 
 150 | .nav-link:hover {
 151 |   color: var(--text-primary);
 152 |   background: var(--bg-hover);
 153 |   transform: translateX(8px);
 154 | }
 155 | 
 156 | .nav-link.active {
 157 |   background: var(--gradient-primary);
 158 |   color: white;
 159 |   box-shadow: var(--shadow-card);
 160 | }
 161 | 
 162 | .nav-link.active::before {
 163 |   display: none;
 164 | }
 165 | 
 166 | .nav-link .icon {
 167 |   width: 20px;
 168 |   height: 20px;
 169 |   display: flex;
 170 |   align-items: center;
 171 |   justify-content: center;
 172 | }
 173 | 
 174 | /* ===== PLAYLIST SECTION ===== */
 175 | .playlist-section {
 176 |   margin-top: auto;
 177 |   padding-top: 20px;
 178 | }
 179 | 
 180 | .create-playlist {
 181 |   width: 100%;
 182 |   padding: 14px 16px;
 183 |   border-radius: var(--border-radius);
 184 |   border: 1px solid var(--border-subtle);
 185 |   background: transparent;
 186 |   color: var(--text-secondary);
 187 |   font-weight: 600;
 188 |   cursor: pointer;
 189 |   display: flex;
 190 |   align-items: center;
 191 |   gap: 12px;
 192 |   transition: var(--transition-smooth);
 193 |   margin-bottom: 20px;
 194 | }
 195 | 
 196 | .create-playlist:hover {
 197 |   border-color: var(--accent-green);
 198 |   color: var(--accent-green);
 199 |   transform: translateY(-2px);
 200 | }
 201 | 
 202 | .playlist-list {
 203 |   display: flex;
 204 |   flex-direction: column;
 205 |   gap: 8px;
 206 | }
 207 | 
 208 | .playlist-item {
 209 |   display: flex;
 210 |   align-items: center;
 211 |   gap: 12px;
 212 |   padding: 8px 12px;
 213 |   border-radius: 8px;
 214 |   cursor: pointer;
 215 |   transition: var(--transition-smooth);
 216 |   color: var(--text-secondary);
 217 |   font-size: 0.9rem;
 218 | }
 219 | 
 220 | .playlist-item:hover {
 221 |   background: var(--bg-hover);
 222 |   color: var(--text-primary);
 223 | }
 224 | 
 225 | .playlist-icon {
 226 |   font-size: 16px;
 227 |   width: 20px;
 228 |   text-align: center;
 229 | }
 230 | 
 231 | /* ===== MAIN CONTENT ===== */
 232 | .main {
 233 |   flex: 1;
 234 |   margin-left: 280px;
 235 |   padding: 32px 40px;
 236 |   overflow-y: auto;
 237 |   position: relative;
 238 | }
 239 | 
 240 | /* ===== HERO SECTION ===== */
 241 | .hero {
 242 |   display: grid;
 243 |   grid-template-columns: 1fr 400px;
 244 |   gap: 40px;
 245 |   align-items: center;
 246 |   margin-bottom: 48px;
 247 |   padding: 40px 0;
 248 |   position: relative;
 249 |   min-height: 400px;
 250 |   overflow: hidden;
 251 |   border-radius: var(--border-radius-large);
 252 | }
 253 | 
 254 | .hero-background {
 255 |   position: absolute;
 256 |   top: 0;
 257 |   left: 0;
 258 |   right: 0;
 259 |   bottom: 0;
 260 |   background: var(--gradient-hero);
 261 |   border-radius: var(--border-radius-large);
 262 |   opacity: 0.6;
 263 |   z-index: -2;
 264 | }
 265 | 
 266 | /* ===== HERO SLIDESHOW ===== */
 267 | .hero-slideshow {
 268 |   position: absolute;
 269 |   top: 0;
 270 |   left: 0;
 271 |   right: 0;
 272 |   bottom: 0;
 273 |   z-index: -1;
 274 |   border-radius: var(--border-radius-large);
 275 |   overflow: hidden;
 276 | }
 277 | 
 278 | .slide {
 279 |   position: absolute;
 280 |   top: 0;
 281 |   left: 0;
 282 |   right: 0;
 283 |   bottom: 0;
 284 |   opacity: 0;
 285 |   transform: scale(1.1);
 286 |   transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
 287 | }
 288 | 
 289 | .slide.active {
 290 |   opacity: 1;
 291 |   transform: scale(1);
 292 | }
 293 | 
 294 | .slide-bg {
 295 |   width: 100%;
 296 |   height: 100%;
 297 |   background-size: cover;
 298 |   background-position: center;
 299 |   position: relative;
 300 | }
 301 | 
 302 | .slide-bg::before {
 303 |   content: '';
 304 |   position: absolute;
 305 |   top: 0;
 306 |   left: 0;
 307 |   right: 0;
 308 |   bottom: 0;
 309 |   background: rgba(0, 0, 0, 0.3);
 310 |   backdrop-filter: blur(1px);
 311 | }
 312 | 
 313 | /* ===== HERO TITLE SLIDESHOW ===== */
 314 | .hero-title-container {
 315 |   position: relative;
 316 |   overflow: hidden;
 317 |   height: 80px;
 318 |   margin-bottom: 16px;
 319 | }
 320 | 
 321 | .hero-title {
 322 |   font-size: 3.5rem;
 323 |   font-weight: 900;
 324 |   line-height: 1.1;
 325 |   background: linear-gradient(135deg, var(--text-primary), var(--accent-green));
 326 |   -webkit-background-clip: text;
 327 |   -webkit-text-fill-color: transparent;
 328 |   background-clip: text;
 329 |   margin: 0;
 330 |   position: absolute;
 331 |   top: 0;
 332 |   left: 0;
 333 |   width: 100%;
 334 |   opacity: 0;
 335 |   z-index: 1;
 336 | }
 337 | 
 338 | .title-slideshow {
 339 |   position: absolute;
 340 |   top: 0;
 341 |   left: 0;
 342 |   width: 100%;
 343 |   height: 100%;
 344 |   z-index: 2;
 345 | }
 346 | 
 347 | .title-slide {
 348 |   position: absolute;
 349 |   top: 0;
 350 |   left: 0;
 351 |   width: 100%;
 352 |   height: 100%;
 353 |   font-size: 3.5rem;
 354 |   font-weight: 900;
 355 |   line-height: 1.1;
 356 |   display: flex;
 357 |   align-items: center;
 358 |   opacity: 0;
 359 |   transform: translateY(30px);
 360 |   transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
 361 |   background: linear-gradient(135deg, var(--text-primary), var(--accent-green));
 362 |   -webkit-background-clip: text;
 363 |   -webkit-text-fill-color: transparent;
 364 |   background-clip: text;
 365 | }
 366 | 
 367 | .title-slide.active {
 368 |   opacity: 1;
 369 |   transform: translateY(0);
 370 | }
 371 | 
 372 | /* ===== HERO SUBTITLE SLIDESHOW ===== */
 373 | .hero-sub-container {
 374 |   position: relative;
 375 |   overflow: hidden;
 376 |   height: 60px;
 377 |   margin-bottom: 32px;
 378 | }
 379 | 
 380 | .hero-sub {
 381 |   color: var(--text-secondary);
 382 |   font-size: 1.1rem;
 383 |   line-height: 1.6;
 384 |   margin: 0;
 385 |   position: absolute;
 386 |   top: 0;
 387 |   left: 0;
 388 |   width: 100%;
 389 |   opacity: 0;
 390 |   z-index: 1;
 391 | }
 392 | 
 393 | .subtitle-slideshow {
 394 |   position: absolute;
 395 |   top: 0;
 396 |   left: 0;
 397 |   width: 100%;
 398 |   height: 100%;
 399 |   z-index: 2;
 400 | }
 401 | 
 402 | .subtitle-slide {
 403 |   position: absolute;
 404 |   top: 0;
 405 |   left: 0;
 406 |   width: 100%;
 407 |   height: 100%;
 408 |   color: var(--text-secondary);
 409 |   font-size: 1.1rem;
 410 |   line-height: 1.6;
 411 |   display: flex;
 412 |   align-items: center;
 413 |   opacity: 0;
 414 |   transform: translateY(20px);
 415 |   transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
 416 | }
 417 | 
 418 | .subtitle-slide.active {
 419 |   opacity: 1;
 420 |   transform: translateY(0);
 421 | }
 422 | 
 423 | /* ===== HERO INDICATORS ===== */
 424 | .hero-indicators {
 425 |   display: flex;
 426 |   gap: 12px;
 427 |   margin-top: 24px;
 428 | }
 429 | 
 430 | .indicator {
 431 |   width: 8px;
 432 |   height: 8px;
 433 |   border-radius: 50%;
 434 |   background: rgba(255, 255, 255, 0.3);
 435 |   cursor: pointer;
 436 |   transition: all 0.3s ease;
 437 | }
 438 | 
 439 | .indicator.active {
 440 |   background: var(--text-primary);
 441 |   transform: scale(1.2);
 442 | }
 443 | 
 444 | .indicator:hover {
 445 |   background: var(--accent-green);
 446 |   transform: scale(1.1);
 447 | }
 448 | 
 449 | .hero-content {
 450 |   display: contents;
 451 | }
 452 | 
 453 | .hero-badge {
 454 |   display: inline-block;
 455 |   padding: 6px 12px;
 456 |   background: rgba(29, 185, 84, 0.2);
 457 |   color: var(--accent-green);
 458 |   border-radius: 20px;
 459 |   font-size: 0.8rem;
 460 |   font-weight: 600;
 461 |   margin-bottom: 16px;
 462 |   border: 1px solid rgba(29, 185, 84, 0.3);
 463 | }
 464 | 
 465 | .hero-title {
 466 |   font-size: 3.5rem;
 467 |   font-weight: 900;
 468 |   line-height: 1.1;
 469 |   margin-bottom: 16px;
 470 |   background: linear-gradient(135deg, var(--text-primary), var(--accent-green));
 471 |   -webkit-background-clip: text;
 472 |   -webkit-text-fill-color: transparent;
 473 |   background-clip: text;
 474 | }
 475 | 
 476 | .hero-sub {
 477 |   color: var(--text-secondary);
 478 |   font-size: 1.1rem;
 479 |   margin-bottom: 32px;
 480 |   line-height: 1.6;
 481 | }
 482 | 
 483 | .hero-actions {
 484 |   display: flex;
 485 |   gap: 16px;
 486 |   align-items: center;
 487 | }
 488 | 
 489 | .btn {
 490 |   padding: 14px 32px;
 491 |   border-radius: 50px;
 492 |   border: none;
 493 |   cursor: pointer;
 494 |   font-weight: 700;
 495 |   font-size: 1rem;
 496 |   display: flex;
 497 |   align-items: center;
 498 |   gap: 8px;
 499 |   transition: var(--transition-bounce);
 500 |   text-decoration: none;
 501 | }
 502 | 
 503 | .btn.primary {
 504 |   background: var(--gradient-primary);
 505 |   color: white;
 506 |   box-shadow: var(--shadow-card);
 507 | }
 508 | 
 509 | .btn.primary:hover {
 510 |   transform: scale(1.05);
 511 |   box-shadow: var(--shadow-hover);
 512 | }
 513 | 
 514 | .btn.ghost {
 515 |   background: transparent;
 516 |   border: 1px solid var(--border-subtle);
 517 |   color: var(--text-secondary);
 518 | }
 519 | 
 520 | .btn.ghost:hover {
 521 |   border-color: var(--accent-green);
 522 |   color: var(--accent-green);
 523 |   transform: translateY(-2px);
 524 | }
 525 | 
 526 | .btn-icon {
 527 |   font-size: 1.2rem;
 528 | }
 529 | 
 530 | /* ===== HERO ART ===== */
 531 | .hero-art {
 532 |   position: relative;
 533 | }
 534 | 
 535 | .art-card {
 536 |   width: 100%;
 537 |   border-radius: var(--border-radius-large);
 538 |   overflow: hidden;
 539 |   box-shadow: var(--shadow-hover);
 540 |   background: var(--bg-card);
 541 |   transition: var(--transition-smooth);
 542 |   position: relative;
 543 | }
 544 | 
 545 | .art-card:hover {
 546 |   transform: scale(1.02) rotate(2deg);
 547 | }
 548 | 
 549 | .art-card img {
 550 |   width: 100%;
 551 |   height: 400px;
 552 |   object-fit: cover;
 553 |   display: block;
 554 |   transition: all 0.6s ease;
 555 | }
 556 | 
 557 | .art-overlay {
 558 |   position: absolute;
 559 |   top: 0;
 560 |   left: 0;
 561 |   right: 0;
 562 |   bottom: 0;
 563 |   background: linear-gradient(45deg, rgba(29, 185, 84, 0.1), transparent);
 564 |   pointer-events: none;
 565 |   z-index: 1;
 566 | }
 567 | 
 568 | .art-glow {
 569 |   position: absolute;
 570 |   top: -10px;
 571 |   left: -10px;
 572 |   right: -10px;
 573 |   bottom: -10px;
 574 |   background: linear-gradient(45deg, var(--accent-green), transparent);
 575 |   border-radius: var(--border-radius-large);
 576 |   opacity: 0;
 577 |   transition: all 0.6s ease;
 578 |   z-index: -1;
 579 |   filter: blur(20px);
 580 | }
 581 | 
 582 | .art-card:hover .art-glow {
 583 |   opacity: 0.3;
 584 | }
 585 | 
 586 | /* ===== SECTIONS ===== */
 587 | .section {
 588 |   margin: 48px 0;
 589 |   position: relative;
 590 | }
 591 | 
 592 | .section-header {
 593 |   display: flex;
 594 |   justify-content: space-between;
 595 |   align-items: center;
 596 |   margin-bottom: 24px;
 597 | }
 598 | 
 599 | .section-header h2 {
 600 |   font-size: 1.8rem;
 601 |   font-weight: 800;
 602 |   color: var(--text-primary);
 603 | }
 604 | 
 605 | .section-more {
 606 |   background: transparent;
 607 |   border: none;
 608 |   color: var(--text-muted);
 609 |   font-weight: 600;
 610 |   cursor: pointer;
 611 |   transition: var(--transition-smooth);
 612 |   font-size: 0.9rem;
 613 | }
 614 | 
 615 | .section-more:hover {
 616 |   color: var(--accent-green);
 617 | }
 618 | 
 619 | /* ===== CAROUSELS ===== */
 620 | .carousel {
 621 |   display: flex;
 622 |   gap: 24px;
 623 |   overflow-x: auto;
 624 |   padding: 8px 0 24px;
 625 |   scroll-behavior: smooth;
 626 |   scroll-snap-type: x mandatory;
 627 |   -webkit-overflow-scrolling: touch;
 628 |   scrollbar-width: thin;
 629 |   scrollbar-color: var(--accent-green) var(--bg-tertiary);
 630 | }
 631 | 
 632 | .carousel.active {
 633 |   cursor: grabbing;
 634 | }
 635 | 
 636 | .carousel::-webkit-scrollbar {
 637 |   height: 6px;
 638 | }
 639 | 
 640 | .carousel::-webkit-scrollbar-track {
 641 |   background: var(--bg-tertiary);
 642 |   border-radius: 3px;
 643 | }
 644 | 
 645 | .carousel::-webkit-scrollbar-thumb {
 646 |   background: var(--accent-green);
 647 |   border-radius: 3px;
 648 | }
 649 | 
 650 | /* ===== CARDS ===== */
 651 | .card {
 652 |   min-width: 200px;
 653 |   width: 200px;
 654 |   background: var(--bg-card);
 655 |   border-radius: var(--border-radius);
 656 |   padding: 16px;
 657 |   flex-shrink: 0;
 658 |   scroll-snap-align: start;
 659 |   transition: var(--transition-bounce);
 660 |   position: relative;
 661 |   overflow: hidden;
 662 |   border: 1px solid var(--border-subtle);
 663 | }
 664 | 
 665 | .card::before {
 666 |   content: '';
 667 |   position: absolute;
 668 |   top: 0;
 669 |   left: 0;
 670 |   right: 0;
 671 |   bottom: 0;
 672 |   background: var(--gradient-primary);
 673 |   opacity: 0;
 674 |   transition: var(--transition-smooth);
 675 |   z-index: 1;
 676 | }
 677 | 
 678 | .card:hover::before {
 679 |   opacity: 0.05;
 680 | }
 681 | 
 682 | .card:hover {
 683 |   transform: translateY(-8px) scale(1.02);
 684 |   box-shadow: var(--shadow-hover);
 685 |   border-color: var(--accent-green);
 686 | }
 687 | 
 688 | .card-image {
 689 |   position: relative;
 690 |   margin-bottom: 16px;
 691 |   border-radius: 8px;
 692 |   overflow: hidden;
 693 | }
 694 | 
 695 | .card img {
 696 |   width: 100%;
 697 |   height: 180px;
 698 |   object-fit: cover;
 699 |   border-radius: 8px;
 700 |   transition: var(--transition-smooth);
 701 | }
 702 | 
 703 | .card:hover img {
 704 |   transform: scale(1.05);
 705 | }
 706 | 
 707 | .play-overlay {
 708 |   position: absolute;
 709 |   bottom: 8px;
 710 |   right: 8px;
 711 |   width: 48px;
 712 |   height: 48px;
 713 |   background: var(--gradient-primary);
 714 |   border: none;
 715 |   border-radius: 50%;
 716 |   color: white;
 717 |   font-size: 18px;
 718 |   cursor: pointer;
 719 |   opacity: 0;
 720 |   transform: translateY(20px);
 721 |   transition: var(--transition-bounce);
 722 |   display: flex;
 723 |   align-items: center;
 724 |   justify-content: center;
 725 |   box-shadow: var(--shadow-card);
 726 | }
 727 | 
 728 | .card:hover .play-overlay {
 729 |   opacity: 1;
 730 |   transform: translateY(0);
 731 | }
 732 | 
 733 | .play-overlay:hover {
 734 |   transform: scale(1.1);
 735 | }
 736 | 
 737 | .card-info {
 738 |   position: relative;
 739 |   z-index: 2;
 740 | }
 741 | 
 742 | .card strong {
 743 |   display: block;
 744 |   font-size: 1rem;
 745 |   font-weight: 700;
 746 |   color: var(--text-primary);
 747 |   margin-bottom: 4px;
 748 |   line-height: 1.3;
 749 | }
 750 | 
 751 | .card small {
 752 |   color: var(--text-muted);
 753 |   font-size: 0.85rem;
 754 |   line-height: 1.4;
 755 | }
 756 | 
 757 | /* ===== ARTIST CARDS ===== */
 758 | .card.artist .card-image {
 759 |   display: flex;
 760 |   justify-content: center;
 761 |   margin-bottom: 20px;
 762 | }
 763 | 
 764 | .card.artist img {
 765 |   width: 160px;
 766 |   height: 160px;
 767 |   border-radius: 50%;
 768 |   object-fit: cover;
 769 | }
 770 | 
 771 | /* ===== PLAYLIST CARDS ===== */
 772 | .card.playlist img {
 773 |   height: 200px;
 774 | }
 775 | 
 776 | .card.playlist {
 777 |   background: linear-gradient(135deg, var(--bg-card), rgba(29, 185, 84, 0.05));
 778 |   border: 1px solid rgba(29, 185, 84, 0.1);
 779 | }
 780 | 
 781 | .card.playlist:hover {
 782 |   background: linear-gradient(135deg, var(--bg-card), rgba(29, 185, 84, 0.08));
 783 |   border-color: rgba(29, 185, 84, 0.3);
 784 | }
 785 | 
 786 | /* ===== BOTTOM PLAYER ===== */
 787 | .player {
 788 |   position: fixed;
 789 |   left: 280px;
 790 |   right: 24px;
 791 |   bottom: 24px;
 792 |   height: 80px;
 793 |   background: rgba(0, 0, 0, 0.9);
 794 |   backdrop-filter: blur(20px);
 795 |   border-radius: var(--border-radius);
 796 |   display: flex;
 797 |   align-items: center;
 798 |   gap: 20px;
 799 |   padding: 12px 20px;
 800 |   border: 1px solid var(--border-subtle);
 801 |   box-shadow: var(--shadow-hover);
 802 |   z-index: 200;
 803 |   transition: var(--transition-smooth);
 804 | }
 805 | 
 806 | .player:hover {
 807 |   transform: translateY(-2px);
 808 |   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
 809 | }
 810 | 
 811 | /* ===== PLAYER LEFT ===== */
 812 | .player-left {
 813 |   display: flex;
 814 |   align-items: center;
 815 |   gap: 16px;
 816 |   min-width: 280px;
 817 | }
 818 | 
 819 | .player-art {
 820 |   position: relative;
 821 | }
 822 | 
 823 | .player-art img {
 824 |   width: 64px;
 825 |   height: 64px;
 826 |   border-radius: 8px;
 827 |   object-fit: cover;
 828 |   box-shadow: var(--shadow-card);
 829 | }
 830 | 
 831 | .player-art-overlay {
 832 |   position: absolute;
 833 |   top: 0;
 834 |   left: 0;
 835 |   right: 0;
 836 |   bottom: 0;
 837 |   background: linear-gradient(45deg, rgba(29, 185, 84, 0.2), transparent);
 838 |   border-radius: 8px;
 839 |   opacity: 0;
 840 |   transition: var(--transition-smooth);
 841 | }
 842 | 
 843 | .player-art:hover .player-art-overlay {
 844 |   opacity: 1;
 845 | }
 846 | 
 847 | .track-info {
 848 |   flex: 1;
 849 |   font-size: 0.9rem;
 850 | }
 851 | 
 852 | .track-info #track-title {
 853 |   font-weight: 700;
 854 |   color: var(--text-primary);
 855 |   margin-bottom: 2px;
 856 | }
 857 | 
 858 | .track-info #track-artist {
 859 |   color: var(--text-muted);
 860 |   font-size: 0.8rem;
 861 | }
 862 | 
 863 | .player-like {
 864 |   background: transparent;
 865 |   border: none;
 866 |   color: var(--text-muted);
 867 |   cursor: pointer;
 868 |   padding: 8px;
 869 |   border-radius: 50%;
 870 |   transition: var(--transition-smooth);
 871 | }
 872 | 
 873 | .player-like:hover {
 874 |   color: var(--accent-green);
 875 |   background: rgba(29, 185, 84, 0.1);
 876 | }
 877 | 
 878 | /* ===== PLAYER CENTER ===== */
 879 | .player-center {
 880 |   flex: 1;
 881 |   display: flex;
 882 |   flex-direction: column;
 883 |   align-items: center;
 884 |   gap: 12px;
 885 |   max-width: 600px;
 886 | }
 887 | 
 888 | .controls {
 889 |   display: flex;
 890 |   gap: 16px;
 891 |   align-items: center;
 892 | }
 893 | 
 894 | .ctrl {
 895 |   background: transparent;
 896 |   border: none;
 897 |   color: var(--text-secondary);
 898 |   cursor: pointer;
 899 |   padding: 8px;
 900 |   border-radius: 50%;
 901 |   transition: var(--transition-smooth);
 902 |   display: flex;
 903 |   align-items: center;
 904 |   justify-content: center;
 905 | }
 906 | 
 907 | .ctrl:hover {
 908 |   color: var(--text-primary);
 909 |   background: rgba(255, 255, 255, 0.1);
 910 | }
 911 | 
 912 | .ctrl.big {
 913 |   width: 48px;
 914 |   height: 48px;
 915 |   background: var(--gradient-primary);
 916 |   color: white;
 917 |   box-shadow: var(--shadow-card);
 918 | }
 919 | 
 920 | .ctrl.big:hover {
 921 |   transform: scale(1.1);
 922 |   box-shadow: var(--shadow-hover);
 923 | }
 924 | 
 925 | .progress-wrap {
 926 |   display: flex;
 927 |   align-items: center;
 928 |   gap: 12px;
 929 |   width: 100%;
 930 | }
 931 | 
 932 | .progress-bar {
 933 |   flex: 1;
 934 |   height: 6px;
 935 |   background: var(--bg-tertiary);
 936 |   border-radius: 3px;
 937 |   overflow: hidden;
 938 |   cursor: pointer;
 939 |   position: relative;
 940 | }
 941 | 
 942 | .progress {
 943 |   height: 100%;
 944 |   width: 0%;
 945 |   background: var(--gradient-primary);
 946 |   transition: width 0.1s linear;
 947 |   position: relative;
 948 | }
 949 | 
 950 | .progress-handle {
 951 |   position: absolute;
 952 |   top: 50%;
 953 |   right: 0;
 954 |   width: 12px;
 955 |   height: 12px;
 956 |   background: white;
 957 |   border-radius: 50%;
 958 |   transform: translate(50%, -50%);
 959 |   opacity: 0;
 960 |   transition: var(--transition-smooth);
 961 |   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
 962 | }
 963 | 
 964 | .progress-bar:hover .progress-handle {
 965 |   opacity: 1;
 966 | }
 967 | 
 968 | #time-elapsed, #duration {
 969 |   font-size: 0.8rem;
 970 |   color: var(--text-muted);
 971 |   font-weight: 500;
 972 |   min-width: 40px;
 973 |   text-align: center;
 974 | }
 975 | 
 976 | /* ===== PLAYER RIGHT ===== */
 977 | .player-right {
 978 |   display: flex;
 979 |   align-items: center;
 980 |   gap: 12px;
 981 |   min-width: 200px;
 982 |   justify-content: flex-end;
 983 | }
 984 | 
 985 | .volume-control {
 986 |   display: flex;
 987 |   align-items: center;
 988 |   gap: 8px;
 989 | }
 990 | 
 991 | .volume-btn {
 992 |   background: transparent;
 993 |   border: none;
 994 |   color: var(--text-secondary);
 995 |   cursor: pointer;
 996 |   padding: 8px;
 997 |   border-radius: 50%;
 998 |   transition: var(--transition-smooth);
 999 | }
1000 | 
1001 | .volume-btn:hover {
1002 |   color: var(--text-primary);
1003 |   background: rgba(255, 255, 255, 0.1);
1004 | }
1005 | 
1006 | #volume {
1007 |   width: 80px;
1008 |   height: 4px;
1009 |   background: var(--bg-tertiary);
1010 |   border-radius: 2px;
1011 |   outline: none;
1012 |   cursor: pointer;
1013 |   appearance: none;
1014 |   -webkit-appearance: none;
1015 | }
1016 | 
1017 | #volume::-webkit-slider-thumb {
1018 |   -webkit-appearance: none;
1019 |   width: 12px;
1020 |   height: 12px;
1021 |   background: var(--accent-green);
1022 |   border-radius: 50%;
1023 |   cursor: pointer;
1024 |   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
1025 | }
1026 | 
1027 | .queue-btn, .device-btn {
1028 |   background: transparent;
1029 |   border: none;
1030 |   color: var(--text-secondary);
1031 |   cursor: pointer;
1032 |   padding: 8px;
1033 |   border-radius: 50%;
1034 |   transition: var(--transition-smooth);
1035 | }
1036 | 
1037 | .queue-btn:hover, .device-btn:hover {
1038 |   color: var(--text-primary);
1039 |   background: rgba(255, 255, 255, 0.1);
1040 | }
1041 | 
1042 | /* ===== FLOATING PLAYER ===== */
1043 | .floating-player {
1044 |   position: fixed;
1045 |   top: 50%;
1046 |   left: 50%;
1047 |   transform: translate(-50%, -50%);
1048 |   width: 300px;
1049 |   background: rgba(0, 0, 0, 0.95);
1050 |   backdrop-filter: blur(20px);
1051 |   border-radius: var(--border-radius);
1052 |   padding: 20px;
1053 |   display: none;
1054 |   flex-direction: column;
1055 |   gap: 16px;
1056 |   border: 1px solid var(--border-subtle);
1057 |   box-shadow: var(--shadow-hover);
1058 |   z-index: 300;
1059 |   animation: floatIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
1060 | }
1061 | 
1062 | .floating-player.show {
1063 |   display: flex;
1064 | }
1065 | 
1066 | @keyframes floatIn {
1067 |   from {
1068 |     opacity: 0;
1069 |     transform: translate(-50%, -50%) scale(0.8);
1070 |   }
1071 |   to {
1072 |     opacity: 1;
1073 |     transform: translate(-50%, -50%) scale(1);
1074 |   }
1075 | }
1076 | 
1077 | .floating-art {
1078 |   position: relative;
1079 |   align-self: center;
1080 | }
1081 | 
1082 | .floating-art img {
1083 |   width: 60px;
1084 |   height: 60px;
1085 |   border-radius: 8px;
1086 |   object-fit: cover;
1087 | }
1088 | 
1089 | .floating-info {
1090 |   text-align: center;
1091 | }
1092 | 
1093 | .floating-title {
1094 |   font-weight: 700;
1095 |   color: var(--text-primary);
1096 |   margin-bottom: 4px;
1097 | }
1098 | 
1099 | .floating-artist {
1100 |   color: var(--text-muted);
1101 |   font-size: 0.9rem;
1102 | }
1103 | 
1104 | .floating-progress {
1105 |   height: 4px;
1106 |   background: var(--bg-tertiary);
1107 |   border-radius: 2px;
1108 |   overflow: hidden;
1109 | }
1110 | 
1111 | .floating-progress-bar {
1112 |   height: 100%;
1113 |   width: 30%;
1114 |   background: var(--gradient-primary);
1115 |   border-radius: 2px;
1116 |   animation: pulse 2s ease-in-out infinite;
1117 | }
1118 | 
1119 | @keyframes pulse {
1120 |   0%, 100% { opacity: 0.6; }
1121 |   50% { opacity: 1; }
1122 | }
1123 | 
1124 | /* ===== REVEAL ANIMATIONS ===== */
1125 | .reveal {
1126 |   opacity: 0;
1127 |   transform: translateY(30px);
1128 |   transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
1129 | }
1130 | 
1131 | .reveal.show {
1132 |   opacity: 1;
1133 |   transform: translateY(0);
1134 | }
1135 | 
1136 | /* ===== SCROLL ANIMATIONS ===== */
1137 | .scroll-fade {
1138 |   opacity: 0;
1139 |   transform: translateY(20px);
1140 |   transition: all 0.6s ease;
1141 | }
1142 | 
1143 | .scroll-fade.visible {
1144 |   opacity: 1;
1145 |   transform: translateY(0);
1146 | }
1147 | 
1148 | /* ===== SPACER ===== */
1149 | .spacer {
1150 |   height: 100px;
1151 | }
1152 | 
1153 | /* ===== RESPONSIVE DESIGN ===== */
1154 | @media (max-width: 1200px) {
1155 |   .sidebar {
1156 |     width: 240px;
1157 |   }
1158 |   
1159 |   .main {
1160 |     margin-left: 240px;
1161 |   }
1162 |   
1163 |   .player {
1164 |     left: 264px;
1165 |   }
1166 |   
1167 |   .hero {
1168 |     grid-template-columns: 1fr 320px;
1169 |     gap: 32px;
1170 |   }
1171 |   
1172 |   .hero-title {
1173 |     font-size: 3rem;
1174 |   }
1175 | }
1176 | 
1177 | @media (max-width: 968px) {
1178 |   .sidebar {
1179 |     width: 200px;
1180 |   }
1181 |   
1182 |   .main {
1183 |     margin-left: 200px;
1184 |     padding: 24px 32px;
1185 |   }
1186 |   
1187 |   .player {
1188 |     left: 224px;
1189 |     right: 16px;
1190 |   }
1191 |   
1192 |   .hero {
1193 |     grid-template-columns: 1fr 280px;
1194 |     gap: 24px;
1195 |   }
1196 |   
1197 |   .hero-title {
1198 |     font-size: 2.5rem;
1199 |   }
1200 |   
1201 |   .card {
1202 |     min-width: 180px;
1203 |     width: 180px;
1204 |   }
1205 | }
1206 | 
1207 | @media (max-width: 768px) {
1208 |   .app {
1209 |     flex-direction: column;
1210 |   }
1211 |   
1212 |   .sidebar {
1213 |     width: 100%;
1214 |     height: auto;
1215 |     position: relative;
1216 |     flex-direction: row;
1217 |     padding: 16px 20px;
1218 |     gap: 16px;
1219 |     overflow-x: auto;
1220 |     border-right: none;
1221 |     border-bottom: 1px solid var(--border-subtle);
1222 |   }
1223 |   
1224 |   .brand {
1225 |     flex-shrink: 0;
1226 |   }
1227 |   
1228 |   .nav {
1229 |     flex-direction: row;
1230 |     gap: 8px;
1231 |     flex-shrink: 0;
1232 |   }
1233 |   
1234 |   .nav-link {
1235 |     padding: 8px 12px;
1236 |     font-size: 0.9rem;
1237 |   }
1238 |   
1239 |   .playlist-section {
1240 |     margin-top: 0;
1241 |     padding-top: 0;
1242 |     flex-shrink: 0;
1243 |   }
1244 |   
1245 |   .playlist-list {
1246 |     flex-direction: row;
1247 |     gap: 12px;
1248 |   }
1249 |   
1250 |   .playlist-item {
1251 |     white-space: nowrap;
1252 |     padding: 6px 10px;
1253 |     font-size: 0.8rem;
1254 |   }
1255 |   
1256 |   .main {
1257 |     margin-left: 0;
1258 |     padding: 24px 20px;
1259 |   }
1260 |   
1261 |   .player {
1262 |     left: 16px;
1263 |     right: 16px;
1264 |   }
1265 |   
1266 |   .hero {
1267 |     grid-template-columns: 1fr;
1268 |     gap: 32px;
1269 |     text-align: center;
1270 |     padding: 32px 0;
1271 |   }
1272 |   
1273 |   .hero-title {
1274 |     font-size: 2.2rem;
1275 |   }
1276 |   
1277 |   .hero-actions {
1278 |     justify-content: center;
1279 |   }
1280 |   
1281 |   .art-card img {
1282 |     height: 300px;
1283 |   }
1284 |   
1285 |   .section-header h2 {
1286 |     font-size: 1.5rem;
1287 |   }
1288 | }
1289 | 
1290 | @media (max-width: 480px) {
1291 |   .sidebar {
1292 |     padding: 12px 16px;
1293 |     gap: 12px;
1294 |   }
1295 |   
1296 |   .brand-text strong {
1297 |     display: none;
1298 |   }
1299 |   
1300 |   .nav-link span:not(.icon) {
1301 |     display: none;
1302 |   }
1303 |   
1304 |   .nav-link {
1305 |     padding: 10px;
1306 |     min-width: 40px;
1307 |     justify-content: center;
1308 |   }
1309 |   
1310 |   .playlist-item span:last-child {
1311 |     display: none;
1312 |   }
1313 |   
1314 |   .main {
1315 |     padding: 20px 16px;
1316 |   }
1317 |   
1318 |   .player {
1319 |     bottom: 16px;
1320 |     left: 16px;
1321 |     right: 16px;
1322 |     height: 72px;
1323 |     padding: 8px 16px;
1324 |   }
1325 |   
1326 |   .player-left {
1327 |     min-width: 200px;
1328 |     gap: 12px;
1329 |   }
1330 |   
1331 |   .player-art img {
1332 |     width: 48px;
1333 |     height: 48px;
1334 |   }
1335 |   
1336 |   .track-info {
1337 |     font-size: 0.8rem;
1338 |   }
1339 |   
1340 |   .player-center {
1341 |     gap: 8px;
1342 |   }
1343 |   
1344 |   .controls {
1345 |     gap: 12px;
1346 |   }
1347 |   
1348 |   .ctrl.big {
1349 |     width: 40px;
1350 |     height: 40px;
1351 |   }
1352 |   
1353 |   .player-right {
1354 |     min-width: 120px;
1355 |     gap: 8px;
1356 |   }
1357 |   
1358 |   #volume {
1359 |     width: 60px;
1360 |   }
1361 |   
1362 |   .hero-title {
1363 |     font-size: 1.8rem;
1364 |   }
1365 |   
1366 |   .hero-sub {
1367 |     font-size: 1rem;
1368 |   }
1369 |   
1370 |   .btn {
1371 |     padding: 12px 24px;
1372 |     font-size: 0.9rem;
1373 |   }
1374 |   
1375 |   .card {
1376 |     min-width: 160px;
1377 |     width: 160px;
1378 |   }
1379 |   
1380 |   .card img {
1381 |     height: 160px;
1382 |   }
1383 |   
1384 |   .card.artist img {
1385 |     width: 120px;
1386 |     height: 120px;
1387 |   }
1388 | }
1389 | 
1390 | /* ===== LOADING ANIMATIONS ===== */
1391 | @keyframes shimmer {
1392 |   0% {
1393 |     background-position: -200px 0;
1394 |   }
1395 |   100% {
1396 |     background-position: calc(200px + 100%) 0;
1397 |   }
1398 | }
1399 | 
1400 | .loading {
1401 |   background: linear-gradient(90deg, var(--bg-card) 25%, var(--bg-hover) 50%, var(--bg-card) 75%);
1402 |   background-size: 200px 100%;
1403 |   animation: shimmer 1.5s infinite;
1404 | }
1405 | 
1406 | /* ===== CUSTOM SCROLLBAR ===== */
1407 | ::-webkit-scrollbar {
1408 |   width: 8px;
1409 | }
1410 | 
1411 | ::-webkit-scrollbar-track {
1412 |   background: var(--bg-secondary);
1413 | }
1414 | 
1415 | ::-webkit-scrollbar-thumb {
1416 |   background: var(--accent-green);
1417 |   border-radius: 4px;
1418 | }
1419 | 
1420 | ::-webkit-scrollbar-thumb:hover {
1421 |   background: var(--accent-green-hover);
1422 | }
1423 | 
1424 | /* ===== ACCESSIBILITY ===== */
1425 | @media (prefers-reduced-motion: reduce) {
1426 |   * {
1427 |     animation-duration: 0.01ms !important;
1428 |     animation-iteration-count: 1 !important;
1429 |     transition-duration: 0.01ms !important;
1430 |   }
1431 | }
1432 | 
1433 | /* ===== LOADING ANIMATIONS ===== */
1434 | @keyframes fadeInUp {
1435 |   from {
1436 |     opacity: 0;
1437 |     transform: translateY(30px);
1438 |   }
1439 |   to {
1440 |     opacity: 1;
1441 |     transform: translateY(0);
1442 |   }
1443 | }
1444 | 
1445 | @keyframes fadeInLeft {
1446 |   from {
1447 |     opacity: 0;
1448 |     transform: translateX(-30px);
1449 |   }
1450 |   to {
1451 |     opacity: 1;
1452 |     transform: translateX(0);
1453 |   }
1454 | }
1455 | 
1456 | @keyframes slideInRight {
1457 |   from {
1458 |     opacity: 0;
1459 |     transform: translateX(30px);
1460 |   }
1461 |   to {
1462 |     opacity: 1;
1463 |     transform: translateX(0);
1464 |   }
1465 | }
1466 | 
1467 | @keyframes scaleIn {
1468 |   from {
1469 |     opacity: 0;
1470 |     transform: scale(0.9);
1471 |   }
1472 |   to {
1473 |     opacity: 1;
1474 |     transform: scale(1);
1475 |   }
1476 | }
1477 | 
1478 | /* ===== ENTRANCE ANIMATIONS ===== */
1479 | .sidebar {
1480 |   animation: fadeInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
1481 | }
1482 | 
1483 | .hero {
1484 |   animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
1485 | }
1486 | 
1487 | .section {
1488 |   animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
1489 | }
1490 | 
1491 | .card {
1492 |   animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
1493 | }
1494 | 
1495 | /* ===== LOADING STATES ===== */
1496 | body:not(.loaded) .sidebar,
1497 | body:not(.loaded) .hero,
1498 | body:not(.loaded) .section {
1499 |   opacity: 0;
1500 |   transform: translateY(30px);
1501 | }
1502 | 
1503 | body.loaded .sidebar,
1504 | body.loaded .hero,
1505 | body.loaded .section {
1506 |   opacity: 1;
1507 |   transform: translateY(0);
1508 | }
1509 | 
1510 | /* ===== SLIDESHOW ENHANCEMENTS ===== */
1511 | .slide-bg {
1512 |   background-attachment: fixed;
1513 | }
1514 | 
1515 | .slide-bg::after {
1516 |   content: '';
1517 |   position: absolute;
1518 |   top: 0;
1519 |   left: 0;
1520 |   right: 0;
1521 |   bottom: 0;
1522 |   background: linear-gradient(
1523 |     45deg,
1524 |     rgba(0, 0, 0, 0.4) 0%,
1525 |     rgba(0, 0, 0, 0.2) 50%,
1526 |     rgba(0, 0, 0, 0.4) 100%
1527 |   );
1528 |   z-index: 1;
1529 | }
1530 | 
1531 | /* ===== PULSE ANIMATION ===== */
1532 | @keyframes pulse {
1533 |   0%, 100% {
1534 |     transform: scale(1);
1535 |     opacity: 1;
1536 |   }
1537 |   50% {
1538 |     transform: scale(1.05);
1539 |     opacity: 0.8;
1540 |   }
1541 | }
1542 | 
1543 | .hero-indicators .indicator.active {
1544 |   animation: pulse 2s ease-in-out infinite;
1545 | }
1546 | 
1547 | /* ===== GLOW EFFECTS ===== */
1548 | @keyframes glow {
1549 |   0%, 100% {
1550 |     box-shadow: 0 0 20px rgba(29, 185, 84, 0.3);
1551 |   }
1552 |   50% {
1553 |     box-shadow: 0 0 30px rgba(29, 185, 84, 0.6);
1554 |   }
1555 | }
1556 | 
1557 | .art-card:hover {
1558 |   animation: glow 2s ease-in-out infinite;
1559 | }
1560 | 
1561 | /* ===== RESPONSIVE SLIDESHOW ===== */
1562 | @media (max-width: 768px) {
1563 |   .hero-title-container {
1564 |     height: 60px;
1565 |   }
1566 |   
1567 |   .title-slide {
1568 |     font-size: 2.5rem;
1569 |   }
1570 |   
1571 |   .hero-sub-container {
1572 |     height: 50px;
1573 |   }
1574 |   
1575 |   .subtitle-slide {
1576 |     font-size: 1rem;
1577 |   }
1578 |   
1579 |   .hero-indicators {
1580 |     justify-content: center;
1581 |     margin-top: 20px;
1582 |   }
1583 | }
1584 | 
1585 | @media (max-width: 480px) {
1586 |   .hero-title-container {
1587 |     height: 50px;
1588 |   }
1589 |   
1590 |   .title-slide {
1591 |     font-size: 2rem;
1592 |   }
1593 |   
1594 |   .hero-sub-container {
1595 |     height: 40px;
1596 |   }
1597 |   
1598 |   .subtitle-slide {
1599 |     font-size: 0.9rem;
1600 |   }
1601 |   
1602 |   .hero-indicators {
1603 |     gap: 8px;
1604 |   }
1605 |   
1606 |   .indicator {
1607 |     width: 6px;
1608 |     height: 6px;
1609 |   }
1610 | }
1611 | 
1612 | /* ===== TOOLTIPS ===== */
1613 | .tooltip {
1614 |   position: absolute;
1615 |   background: rgba(0, 0, 0, 0.9);
1616 |   color: white;
1617 |   padding: 8px 12px;
1618 |   border-radius: 6px;
1619 |   font-size: 0.8rem;
1620 |   font-weight: 500;
1621 |   pointer-events: none;
1622 |   z-index: 10000;
1623 |   opacity: 0;
1624 |   transform: translateY(5px);
1625 |   transition: all 0.2s ease;
1626 |   backdrop-filter: blur(10px);
1627 |   border: 1px solid rgba(255, 255, 255, 0.1);
1628 |   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
1629 |   max-width: 200px;
1630 |   white-space: nowrap;
1631 | }
1632 | 
1633 | .tooltip.show {
1634 |   opacity: 1;
1635 |   transform: translateY(0);
1636 | }
1637 | 
1638 | .tooltip::before {
1639 |   content: '';
1640 |   position: absolute;
1641 |   top: 100%;
1642 |   left: 50%;
1643 |   transform: translateX(-50%);
1644 |   border: 5px solid transparent;
1645 |   border-top-color: rgba(0, 0, 0, 0.9);
1646 | }
1647 | 
1648 | /* Tooltip positioning variants */
1649 | .tooltip.tooltip-top::before {
1650 |   top: 100%;
1651 |   border-top-color: rgba(0, 0, 0, 0.9);
1652 |   border-bottom-color: transparent;
1653 | }
1654 | 
1655 | .tooltip.tooltip-bottom::before {
1656 |   top: -10px;
1657 |   border-bottom-color: rgba(0, 0, 0, 0.9);
1658 |   border-top-color: transparent;
1659 | }
1660 | 
1661 | .tooltip.tooltip-left::before {
1662 |   left: 100%;
1663 |   top: 50%;
1664 |   transform: translateY(-50%);
1665 |   border-left-color: rgba(0, 0, 0, 0.9);
1666 |   border-right-color: transparent;
1667 |   border-top-color: transparent;
1668 |   border-bottom-color: transparent;
1669 | }
1670 | 
1671 | .tooltip.tooltip-right::before {
1672 |   left: -10px;
1673 |   top: 50%;
1674 |   transform: translateY(-50%);
1675 |   border-right-color: rgba(0, 0, 0, 0.9);
1676 |   border-left-color: transparent;
1677 |   border-top-color: transparent;
1678 |   border-bottom-color: transparent;
1679 | }
1680 | 
1681 | /* ===== MODALS ===== */
1682 | .queue-modal,
1683 | .device-modal {
1684 |   position: fixed;
1685 |   top: 0;
1686 |   left: 0;
1687 |   right: 0;
1688 |   bottom: 0;
1689 |   background: rgba(0, 0, 0, 0.8);
1690 |   backdrop-filter: blur(10px);
1691 |   z-index: 10000;
1692 |   display: flex;
1693 |   align-items: center;
1694 |   justify-content: center;
1695 |   animation: fadeIn 0.3s ease;
1696 | }
1697 | 
1698 | .modal-content {
1699 |   background: var(--bg-card);
1700 |   border-radius: var(--border-radius);
1701 |   padding: 24px;
1702 |   max-width: 400px;
1703 |   width: 90%;
1704 |   max-height: 80vh;
1705 |   overflow-y: auto;
1706 |   border: 1px solid var(--border-subtle);
1707 |   box-shadow: var(--shadow-hover);
1708 |   animation: slideUp 0.3s ease;
1709 | }
1710 | 
1711 | .modal-content h3 {
1712 |   margin: 0 0 20px 0;
1713 |   color: var(--text-primary);
1714 |   font-size: 1.2rem;
1715 |   font-weight: 700;
1716 | }
1717 | 
1718 | .queue-list,
1719 | .device-list {
1720 |   display: flex;
1721 |   flex-direction: column;
1722 |   gap: 12px;
1723 |   margin-bottom: 20px;
1724 | }
1725 | 
1726 | .queue-item,
1727 | .device-item {
1728 |   display: flex;
1729 |   align-items: center;
1730 |   gap: 12px;
1731 |   padding: 12px;
1732 |   border-radius: 8px;
1733 |   background: var(--bg-secondary);
1734 |   transition: var(--transition-smooth);
1735 | }
1736 | 
1737 | .queue-item:hover,
1738 | .device-item:hover {
1739 |   background: var(--bg-hover);
1740 | }
1741 | 
1742 | .queue-item.current {
1743 |   background: rgba(29, 185, 84, 0.1);
1744 |   border: 1px solid rgba(29, 185, 84, 0.3);
1745 | }
1746 | 
1747 | .queue-item img {
1748 |   width: 40px;
1749 |   height: 40px;
1750 |   border-radius: 4px;
1751 |   object-fit: cover;
1752 | }
1753 | 
1754 | .device-icon {
1755 |   width: 40px;
1756 |   height: 40px;
1757 |   display: flex;
1758 |   align-items: center;
1759 |   justify-content: center;
1760 |   font-size: 20px;
1761 |   background: var(--bg-tertiary);
1762 |   border-radius: 50%;
1763 | }
1764 | 
1765 | .queue-info,
1766 | .device-info {
1767 |   flex: 1;
1768 | }
1769 | 
1770 | .queue-info strong,
1771 | .device-info strong {
1772 |   display: block;
1773 |   color: var(--text-primary);
1774 |   font-size: 0.9rem;
1775 |   margin-bottom: 2px;
1776 | }
1777 | 
1778 | .queue-info small,
1779 | .device-info small {
1780 |   color: var(--text-muted);
1781 |   font-size: 0.8rem;
1782 | }
1783 | 
1784 | .current-indicator {
1785 |   color: var(--accent-green);
1786 |   font-weight: bold;
1787 | }
1788 | 
1789 | .device-status {
1790 |   padding: 4px 8px;
1791 |   border-radius: 4px;
1792 |   font-size: 0.8rem;
1793 |   font-weight: 600;
1794 |   background: var(--bg-tertiary);
1795 |   color: var(--text-secondary);
1796 | }
1797 | 
1798 | .device-status.active {
1799 |   background: var(--accent-green);
1800 |   color: white;
1801 | }
1802 | 
1803 | .close-queue,
1804 | .close-device {
1805 |   width: 100%;
1806 |   padding: 12px;
1807 |   background: var(--gradient-primary);
1808 |   color: white;
1809 |   border: none;
1810 |   border-radius: 8px;
1811 |   font-weight: 600;
1812 |   cursor: pointer;
1813 |   transition: var(--transition-smooth);
1814 | }
1815 | 
1816 | .close-queue:hover,
1817 | .close-device:hover {
1818 |   transform: translateY(-2px);
1819 |   box-shadow: var(--shadow-card);
1820 | }
1821 | 
1822 | /* ===== ENHANCED INTERACTIONS ===== */
1823 | .playlist-item.active {
1824 |   background: rgba(29, 185, 84, 0.1);
1825 |   color: var(--accent-green);
1826 |   border-left: 3px solid var(--accent-green);
1827 | }
1828 | 
1829 | .nav-link {
1830 |   position: relative;
1831 |   overflow: hidden;
1832 | }
1833 | 
1834 | .nav-link::after {
1835 |   content: '';
1836 |   position: absolute;
1837 |   bottom: 0;
1838 |   left: 0;
1839 |   width: 0;
1840 |   height: 2px;
1841 |   background: var(--accent-green);
1842 |   transition: width 0.3s ease;
1843 | }
1844 | 
1845 | .nav-link.active::after {
1846 |   width: 100%;
1847 | }
1848 | 
1849 | /* ===== MODAL ANIMATIONS ===== */
1850 | @keyframes fadeIn {
1851 |   from { opacity: 0; }
1852 |   to { opacity: 1; }
1853 | }
1854 | 
1855 | @keyframes slideUp {
1856 |   from {
1857 |     opacity: 0;
1858 |     transform: translateY(30px) scale(0.95);
1859 |   }
1860 |   to {
1861 |     opacity: 1;
1862 |     transform: translateY(0) scale(1);
1863 |   }
1864 | }
1865 | 
1866 | /* ===== RESPONSIVE MODALS ===== */
1867 | @media (max-width: 768px) {
1868 |   .modal-content {
1869 |     margin: 20px;
1870 |     max-width: none;
1871 |     width: calc(100% - 40px);
1872 |   }
1873 |   
1874 |   .queue-item,
1875 |   .device-item {
1876 |     padding: 10px;
1877 |   }
1878 |   
1879 |   .queue-item img,
1880 |   .device-icon {
1881 |     width: 36px;
1882 |     height: 36px;
1883 |   }
1884 | }
1885 | 
1886 | /* ===== DARK MODE ENHANCEMENTS ===== */
1887 | @media (prefers-color-scheme: dark) {
1888 |   :root {
1889 |     --bg-primary: #000000;
1890 |     --bg-secondary: #0a0a0a;
1891 |     --bg-tertiary: #111111;
1892 |   }
1893 | }


--------------------------------------------------------------------------------
