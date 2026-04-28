# KHOA.VO Portfolio

Personal portfolio website featuring dual personas (Creative & IT), with animated scroll-based branding experience.

## Live Site

- **Main**: https://khoavo.myds.me
- **Creative Works**: https://portfolio.khoavo.myds.me (redirects to main)

## Features

### Creative Side
- **Animated VNDK Logo**: Flying letters that deconstruct/reconstruct during scroll
- **Scroll-triggered animation**: Letters appear while scrolling, disappear when stopped
- **2.5D floating effect**: Letters wave and spread during scroll
- **Reconstructed footer**: Full logo appears centered at bottom
- **Three viewing modes**: Grid, List, Minimal
- **Image effects**: Grayscale + pixelated + blur → Full color on hover
- **Enhanced project modal**: Keyboard navigation (ESC, Arrow keys)

### IT Side  
- **Retro desktop UI**: Draggable windows
- **CRT screen effects**: Scanlines, vignette
- **Idle screensaver**: 10s timeout with animated logo

### Design
- **Dual persona**: Creative Portfolio & IT Developer modes
- **Dark/light theme**: Toggle between modes
- **Grid patterns**: Subtle background textures
- **Phosphor green accents**: #00FF94 signature color

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

The site deploys automatically via Forgejo CI/CD to:
- **Frontend**: https://khoavo.myds.me
- **Git**: https://git.khoavo.myds.me/vndangkhoa/kv-cv

## License

MIT