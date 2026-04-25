/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          subtle: 'var(--accent-subtle)',
          it: '#00FF94',
          itSubtle: 'var(--accent-it-subtle)',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['IBM Plex Mono', 'monospace'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      typography: {
        display: {
          fontSize: ['clamp(3rem, 10vw, 10rem)', { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '800' }],
        },
        huge: {
          fontSize: ['clamp(2rem, 6vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)',
        'dotted-pattern': 'radial-gradient(var(--border) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '60px 60px',
        'dotted': '20px 20px',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
