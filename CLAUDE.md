# Claude Rules for History of Bitcoin Project

This file provides guidance to Claude AI when working with code in this repository.

## Project Context

"A Message Worth Repeating II" is a React Three Fiber generative art installation displaying Satoshi Nakamoto's famous quote: "If you don't believe me or don't get it, I don't have time to try to convince you, sorry" in four languages (English, Spanish, French, Portuguese). The project creates a 3D tunnel effect with procedurally generated text using Bitcoin-themed orange and purple color palettes.

## Development Commands

- **Start dev server**: `npm run dev` (Vite dev server with HMR)
- **Build for production**: `npm run build` (TypeScript compilation + Vite build)
- **Preview production build**: `npm run preview`
- **Deploy**: `npm run deploy` (deploys to Vercel)
- **Lint**: `npm run lint` (ESLint)

## Project Architecture

### Build System
- **Vite 7.x** - Ultra-fast ES module-based build tool
- **TypeScript 5.9** - Type-safe development
- **React 19** - Latest React with concurrent features
- **Entry**: `index.html` → `src/main.tsx`
- **Output**: `dist/` directory with optimized bundles

### Directory Structure
```
src/
├── components/          # React Three Fiber components
│   ├── Scene.tsx       # Main Canvas wrapper with state management
│   ├── AnimatedCamera.tsx  # GSAP-animated camera
│   ├── Lights.tsx      # Scene lighting
│   ├── Tunnel.tsx      # Walls, floor, door frame geometry
│   └── TextTunnel.tsx  # 3D text with multilingual support
├── hooks/              # Custom React hooks
│   ├── useColorPalette.ts  # Color state + regeneration
│   └── useTextGenerator.ts # Language/text state
├── utils/              # Utilities and constants
│   ├── constants.ts    # Color palettes, scene config, text content
│   └── helpers.ts      # Random color/language helpers
├── types/              # TypeScript declarations
│   └── three-extensions.d.ts
├── App.tsx             # Root component
├── main.tsx            # React entry point
└── index.css           # Global styles
```

### Key Technologies
- **Three.js v0.181.0** - Latest 3D rendering engine
- **React Three Fiber v9.4** - Declarative Three.js in React
- **React Three Drei v10.7** - R3F helpers (Text3D, PerspectiveCamera, etc.)
- **GSAP v3.13** - Camera animation timeline
- **TypeScript** - Type-safe development

### Component Architecture

#### `<Scene />` (Main Component)
- Wraps `<Canvas>` from R3F
- Manages color palette state via `useColorPalette()`
- Manages text/language state via `useTextGenerator()`
- Handles click-to-regenerate scene functionality
- Sets background color dynamically

#### `<AnimatedCamera />`
- Uses `PerspectiveCamera` from drei
- GSAP timeline: z=720 → z=600 over 60 seconds
- Infinite repeat with linear easing
- FOV: 45°, aspect ratio: responsive

#### `<Lights />`
- Single `<ambientLight>` at 2.7 intensity
- Provides even illumination for all objects

#### `<TunnelClones />`
- Renders 40 cloned `<Tunnel>` components
- Spacing: 20 units along Z-axis
- Each tunnel contains walls, floor, and door frame

#### `<Tunnel />`
- 3 wall boxes (center, left, right)
- 1 floor plane (rotated -90° on X)
- 3 door frame boxes (left post, right post, top beam)
- Uses `<boxGeometry>` and `<meshStandardMaterial>`

#### `<TextTunnel />`
- Uses `<Text3D>` from drei for 3D text rendering
- Loads font from `/public/fonts/cabal_regular.json`
- Generates 40 text groups (one per tunnel segment)
- Each group contains 6 text lines (quote + signature)
- Language-specific positioning and sizing

### State Management

**Color Palette Hook** (`useColorPalette`)
- Returns: `{ colors, regenerateColors }`
- Colors: `wallColor`, `floorColor`, `frameColor`, `textColor`, `backgroundColor`
- All randomly selected on mount and regeneration
- Background color matches floor color

**Text Generator Hook** (`useTextGenerator`)
- Returns: `{ textConfig, regenerateText }`
- Randomly selects language (25% each: EN, ES, FR, PT)
- Randomly selects signature ("Satoshi" or "Nakamoto")
- Provides position offsets and text parts

### Materials & Colors

**Orange Palette** (6 shades) - `constants.ts:ORANGE_PALETTE`
- Used for walls, floor, frame, background
- Includes Bitcoin Orange (#F7931A)

**Purple Palette** (8 shades) - `constants.ts:PURPLE_PALETTE`
- Used exclusively for text elements
- Range from purple to near-black

### Text Generation System

**Multilingual Support** (`constants.ts:TEXT_CONTENT`)
- English: "If you don't believe me or don't get it..."
- Spanish: "Si no me crees o no lo entiendes..."
- French: "Si vous ne me croyez pas ou ne comprenez pas..."
- Portuguese: "Se não acredita em mim ou não entende..."

**Text Rendering**
- Font: Cabal Regular (JSON format in `/public/fonts/`)
- 40 repetitions along Z-axis (800 units total depth)
- 6 text lines per segment (5 quote lines + 1 signature)
- Each line has unique size, position, and scale

### Responsive Design
- Canvas automatically fills viewport (100vw × 100vh)
- Camera aspect ratio updates on window resize
- Pixel ratio capped at 2x for performance

## Code Style & Patterns

### React Three Fiber Patterns
```tsx
// Declarative geometry with props
<mesh position={[x, y, z]} scale={[sx, sy, sz]}>
  <boxGeometry args={[1, 1, 1, 10, 10]} />
  <meshStandardMaterial color={color} side={THREE.DoubleSide} />
</mesh>

// Using drei helpers
<Text3D font="/fonts/cabal_regular.json" size={0.4}>
  Text content
  <meshBasicMaterial color={color} />
</Text3D>
```

### TypeScript Conventions
- Use `type` imports for type-only imports
- Define component prop interfaces
- Use `const` assertions for readonly arrays
- Prefer function components over class components

### State Updates
- Use React hooks (`useState`, `useCallback`, `useMemo`)
- Regenerate colors/text via callback functions
- All state changes trigger React re-renders

## Development Workflow

1. **Start dev server**: `npm run dev` (Vite HMR on http://localhost:5173)
2. **Make changes**: Edit TypeScript/TSX files in `src/`
3. **Hot reload**: Changes appear instantly without refresh
4. **Build**: `npm run build` (TypeScript check + production bundle)
5. **Deploy**: `npm run deploy` (Vercel production deployment)

### Debugging
- React DevTools for component inspection
- Three.js DevTools browser extension
- TypeScript compiler for type checking
- Vite source maps for debugging

## Important Constraints

- **preserveDrawingBuffer**: Set to `true` in Canvas props (for future export features)
- **Pixel ratio**: Capped at 2x for performance (`Math.min(window.devicePixelRatio, 2)`)
- **Font dependency**: Project requires `/public/fonts/cabal_regular.json`
- **Randomization on mount**: Colors and language randomize on page load and click

## When Assisting

- Maintain the artistic intent: Bitcoin-themed generative art with multilingual messaging
- Preserve randomization systems that create variety
- Use React Three Fiber declarative patterns (avoid imperative Three.js code)
- Keep TypeScript type safety
- Respect the color palette constraints (orange for objects, purple for text)
- Maintain the text tunnel effect (40 clones, 20-unit spacing)
- Use GSAP for complex animations, R3F `useFrame` for per-frame updates

## Migration Notes

This project was migrated from vanilla Three.js + Webpack to React Three Fiber + Vite in November 2024. Key improvements:
- **10-100x faster** dev server (Vite vs Webpack)
- **Declarative 3D** - JSX instead of imperative `scene.add()`
- **Type safety** - TypeScript catches errors during development
- **React ecosystem** - Hooks, state management, component composition
- **Automatic cleanup** - R3F handles Three.js disposal/memory management
- **Three.js v0.181** - Updated from v0.163 (18 versions newer)

The old vanilla Three.js code is preserved in `old-vanilla-threejs-backup/` for reference.
