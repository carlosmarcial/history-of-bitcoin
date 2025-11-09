# A Message Worth Repeating II

Bitcoin-themed generative art installation built with React Three Fiber, displaying Satoshi Nakamoto's famous quote in four languages.

## 🚀 Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run deploy       # Deploy to Vercel
```

## 🎨 Features

- **Multilingual**: Displays in English, Spanish, French, and Portuguese
- **Generative**: Random colors and language on each load
- **Interactive**: Click to regenerate scene with new colors/language
- **Animated**: GSAP-powered camera animation through 3D tunnel
- **Responsive**: Adapts to any screen size

## 🛠 Tech Stack

- **React 19** - UI framework
- **TypeScript 5.9** - Type safety
- **Three.js 0.181** - 3D rendering
- **React Three Fiber 9.4** - Declarative Three.js
- **React Three Drei 10.7** - R3F helpers
- **GSAP 3.13** - Animation
- **Vite 7** - Build tool

## 📂 Project Structure

```
src/
├── components/       # React Three Fiber components
│   ├── Scene.tsx    # Main Canvas wrapper
│   ├── AnimatedCamera.tsx
│   ├── Lights.tsx
│   ├── Tunnel.tsx   # Walls, floor, frame
│   └── TextTunnel.tsx  # 3D multilingual text
├── hooks/           # Custom React hooks
│   ├── useColorPalette.ts
│   └── useTextGenerator.ts
├── utils/           # Constants and helpers
│   ├── constants.ts
│   └── helpers.ts
└── App.tsx
```

## 🎯 How It Works

1. **Color System**: Bitcoin-themed orange palette (walls/floor) + purple palette (text)
2. **Text Generation**: Randomly selects 1 of 4 languages with language-specific positioning
3. **Tunnel Effect**: 40 cloned segments spaced 20 units apart (800 units total depth)
4. **Camera**: Animated from z=720 to z=600 over 60 seconds (infinite loop)
5. **Interaction**: Click canvas to regenerate colors and language

## 📖 Documentation

- **CLAUDE.md** - Complete project documentation for AI assistants
- **MIGRATION.md** - Details on vanilla Three.js → R3F migration

## 🌐 Deployment

Configured for Vercel with SPA routing:

```bash
npm run deploy
```

Or connect your GitHub repo to Vercel for automatic deployments.

## ⚡ Performance

- **Dev server**: Vite starts in ~88ms
- **Build time**: ~2 seconds
- **Bundle size**: 333 KB gzipped
- **Frame rate**: 60 FPS (capped at 2x pixel ratio)

## 🎨 Customization

### Change Colors
Edit `src/utils/constants.ts`:
```typescript
export const ORANGE_PALETTE = [0xffa500, 0xff8c00, ...];
export const PURPLE_PALETTE = [0x800080, 0x9932cc, ...];
```

### Add Languages
Edit `src/utils/constants.ts`:
```typescript
export const TEXT_CONTENT = {
  // Add new language here
  german: {
    parts: ["Wenn", "Sie mir nicht glauben", ...],
    xOffsets: [...],
    additionalXOffsets: [...],
    additionalYOffsets: [...]
  }
}
```

### Adjust Animation
Edit `src/utils/constants.ts`:
```typescript
export const SCENE_CONFIG = {
  camera: {
    animationDuration: 60, // Change duration in seconds
    initialZ: 720,         // Starting position
    targetZ: 600           // Ending position
  }
}
```

## 📜 License

UNLICENSED - Private project

## 🙏 Credits

Inspired by Satoshi Nakamoto's vision for Bitcoin.

---

**Built with ❤️ using React Three Fiber**
