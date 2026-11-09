import { Track } from '../types/music';

// Curated live streaming audio tracks (Method 1: Headless YouTube CDN Stream)
// 0 MB stored on server, full-length audio streamed on-demand at zero bandwidth cost
export const STREAM_CHANNELS: { id: string; name: string; description: string; tracks: Track[] }[] = [
  {
    id: 'highway-radio',
    name: 'Late-Night Highway & Cassette Radio',
    description: 'Nostalgic long-drive classics, tape hiss, and roadside melodies',
    tracks: [
      {
        id: 'yt-chaiyya',
        title: 'Chaiyya Chaiyya',
        artist: 'Sukhwinder Singh, Sapna Awasthi',
        album: 'Dil Se (A.R. Rahman)',
        duration: 398,
        src: 'https://www.youtube.com/watch?v=YOYN9qNXmAw',
        art: 'https://img.youtube.com/vi/YOYN9qNXmAw/hqdefault.jpg',
        source: 'youtube',
        youtubeId: 'YOYN9qNXmAw',
        qualityBadge: 'STREAM 256k'
      },
      {
        id: 'yt-kunfaya',
        title: 'Kun Faya Kun',
        artist: 'A.R. Rahman, Javed Ali, Mohit Chauhan',
        album: 'Rockstar',
        duration: 472,
        src: 'https://www.youtube.com/watch?v=0RZZkZzKeq0',
        art: 'https://img.youtube.com/vi/0RZZkZzKeq0/hqdefault.jpg',
        source: 'youtube',
        youtubeId: '0RZZkZzKeq0',
        qualityBadge: 'STREAM 256k'
      },
      {
        id: 'yt-kalhonaho',
        title: 'Kal Ho Naa Ho (Heartbeat)',
        artist: 'Sonu Nigam, Shankar-Ehsaan-Loy',
        album: 'Kal Ho Naa Ho',
        duration: 321,
        src: 'https://www.youtube.com/watch?v=g0eO74UmRBs',
        art: 'https://img.youtube.com/vi/g0eO74UmRBs/hqdefault.jpg',
        source: 'youtube',
        youtubeId: 'g0eO74UmRBs',
        qualityBadge: 'STREAM 256k'
      }
    ]
  },
  {
    id: 'lofi-ambient',
    name: '24/7 Lofi & Chillhop Radio',
    description: 'Gentle beats, vinyl dust, and study rhythms',
    tracks: [
      {
        id: 'yt-lofi-beats',
        title: 'Lofi Hip Hop Study Stream',
        artist: 'Lofi Girl / ChilledCow',
        album: 'Beats to Relax / Study to',
        duration: 3600,
        src: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
        art: 'https://img.youtube.com/vi/jfKfPfyJRdk/hqdefault.jpg',
        source: 'youtube',
        youtubeId: 'jfKfPfyJRdk',
        qualityBadge: 'LIVE STREAM'
      },
      {
        id: 'yt-resonance',
        title: 'Resonance',
        artist: 'HOME',
        album: 'Odyssey',
        duration: 212,
        src: 'https://www.youtube.com/watch?v=8GW6sLrK40k',
        art: 'https://img.youtube.com/vi/8GW6sLrK40k/hqdefault.jpg',
        source: 'youtube',
        youtubeId: '8GW6sLrK40k',
        qualityBadge: 'STREAM 256k'
      }
    ]
  },
  {
    id: 'synthwave-night',
    name: 'Midnight Synthwave & Cyber Drive',
    description: 'Analog synthesizers, neon highways, and futuristic basslines',
    tracks: [
      {
        id: 'yt-midnight-city',
        title: 'Midnight City',
        artist: 'M83',
        album: "Hurry Up, We're Dreaming",
        duration: 243,
        src: 'https://www.youtube.com/watch?v=dX3k_QDnzHE',
        art: 'https://img.youtube.com/vi/dX3k_QDnzHE/hqdefault.jpg',
        source: 'youtube',
        youtubeId: 'dX3k_QDnzHE',
        qualityBadge: 'STREAM 256k'
      },
      {
        id: 'yt-after-dark',
        title: 'After Dark',
        artist: 'Mr.Kitty',
        album: 'Time',
        duration: 259,
        src: 'https://www.youtube.com/watch?v=sVx1mJDeUj8',
        art: 'https://img.youtube.com/vi/sVx1mJDeUj8/hqdefault.jpg',
        source: 'youtube',
        youtubeId: 'sVx1mJDeUj8',
        qualityBadge: 'STREAM 256k'
      },
      {
        id: 'yt-starboy',
        title: 'Starboy',
        artist: 'The Weeknd, Daft Punk',
        album: 'Starboy',
        duration: 230,
        src: 'https://www.youtube.com/watch?v=dqt8Z1k0oWQ',
        art: 'https://img.youtube.com/vi/dqt8Z1k0oWQ/hqdefault.jpg',
        source: 'youtube',
        youtubeId: 'dqt8Z1k0oWQ',
        qualityBadge: 'STREAM 256k'
      }
    ]
  }
];

export const ALL_STREAM_TRACKS: Track[] = STREAM_CHANNELS.flatMap(c => c.tracks);
