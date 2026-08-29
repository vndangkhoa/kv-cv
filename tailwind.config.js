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
          elevated: 'var(--bg-elevated)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: '#00FF87',
          mint: '#00FF87',
          cyan: '#00E5FF',
          purple: '#D0B2FF',
          peach: '#FFEEB8',
          subtle: 'var(--accent-subtle)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          glass: 'var(--glass-border)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
        pixel: ['basis33', 'monospace'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'shimmer': 'shimmer 2.2s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(0, 255, 135, 0.3)',
        'glow-md': '0 0 35px -5px rgba(0, 255, 135, 0.4)',
        'glow-lg': '0 0 60px -10px rgba(0, 255, 135, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(0, 229, 255, 0.4)',
        'glow-purple': '0 0 35px -5px rgba(208, 178, 255, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}
