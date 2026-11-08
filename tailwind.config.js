/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#090a0d',
        surface: '#111317',
        'surface-elevated': '#181a20',
        'surface-active': '#21242d',
        signal: {
          green: '#00e575',
          'green-hover': '#1eff8a',
          'green-glow': 'rgba(0, 229, 117, 0.25)',
          amber: '#f59e0b',
          crimson: '#ff334b'
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'vinyl': '0 24px 60px rgba(0, 0, 0, 0.75)',
        'elevated': '0 16px 40px rgba(0, 0, 0, 0.55)',
        'signal': '0 0 20px rgba(0, 229, 117, 0.35)'
      }
    },
  },
  plugins: [],
}
