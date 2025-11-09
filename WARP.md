# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Three.js-based generative art project titled "A Message Worth Repeating II" that creates a 3D scene displaying Satoshi Nakamoto's famous quote in multiple languages (English, Spanish, French, Portuguese). The scene features procedurally generated geometry with randomized materials from orange and purple color palettes.

## Development Commands

### Development Server
```bash
npm run dev
```
Starts webpack-dev-server on port 8080 (or next available port). Includes hot reloading and watches `src/` and `static/` directories.

### Production Build
```bash
npm run build
```
Builds the project for production using webpack. Output is generated in the `dist/` directory with hashed filenames for cache busting.

### Deployment
```bash
npm run deploy
```
Deploys to Vercel production environment. Project is configured for Next.js export mode with `output: export`.

## Project Architecture

### Build System
- **Webpack-based**: Custom webpack configuration split into:
  - `bundler/webpack.common.js` - Shared configuration (entry point, loaders, plugins)
  - `bundler/webpack.dev.js` - Development server configuration
  - `bundler/webpack.prod.js` - Production build configuration with CleanWebpackPlugin
- **Entry Point**: `src/script.js`
- **Output**: Bundled to `dist/` with content hashing

### Key Dependencies
- **Three.js** (v0.163.0) - Core 3D rendering library
- **GSAP** - Animation library for timeline-based animations
- **CCapture.js** - Canvas capture library for recording animations
- **Tone.js** - Audio synthesis (potentially for future audio features)
- **lil-gui** - Debug UI controls

### Asset Pipeline
Webpack handles:
- **HTML**: `html-loader` processes templates
- **CSS**: `mini-css-extract-plugin` + `css-loader` extracts CSS
- **Images**: SVG, PNG, JPG, GIF → `assets/images/[hash][ext]`
- **Fonts**: TTF, WOFF, WOFF2 → `assets/fonts/[hash][ext]`
- **Shaders**: GLSL files loaded as raw source via `asset/source`

### Core Architecture

#### Scene Structure
The Three.js scene is organized into groups:
- **`group`**: Main scene group containing walls, floor, and frame
- **`frameGroup`**: Door frame geometry (3 boxes)
- **`textClonerGroup`**: Dynamically generated 3D text meshes

#### Materials System
- **Standard Materials**: Uses `MeshStandardMaterial` with colors from predefined palettes
- **Orange Palette**: 6 shades for warm tones (Bitcoin Orange #F7931A as key color)
- **Purple Palette**: 8 shades for text and accents
- **Random Selection**: `createStandardMaterial()` randomly picks from orange palette for scene objects

#### Text Generation System
The `createTextGroup()` function:
1. Randomly selects language (25% English, 25% Spanish, 25% French, 25% Portuguese)
2. Creates 3D text geometry using Three.js `TextGeometry` and FontLoader
3. Clones text 40 times along Z-axis with 20-unit increments (800 units total depth)
4. Each text line has custom position offsets, sizes, and scaling

#### Shader System
Custom shader files organized by object type in `src/shaders/`:
- `wall/` - Wall shader programs
- `ceiling/` - Ceiling shader programs
- `floor/` - Floor shader programs
- `frame/` - Frame shader programs
- `rug/` - Rug shader programs

Each contains vertex and fragment shaders (though currently using standard materials in main code).

### Static Assets
- **Fonts**: Located in `static/fonts/` (specifically `cabal_regular.json` for TextGeometry)
- Static files are copied to dist via `CopyWebpackPlugin`

## Important Configuration Notes

### Next.js Export Mode
This project is configured with `output: export` for static export to Vercel. When adding dynamic routes, ensure `generateStaticParams()` is exported.

### Rendering Configuration
- **Renderer**: WebGLRenderer with `preserveDrawingBuffer: true` enabled for CCapture.js canvas recording
- **Pixel Ratio**: Capped at 2x for performance (`Math.min(window.devicePixelRatio, 2)`)
- **Camera**: PerspectiveCamera with 45° FOV, positioned at z=720 to view the text tunnel

### Randomization
Multiple randomization systems control scene variety:
- Ceiling, rug, and floor geometry have randomized scale parameters
- Material colors randomly selected from palettes on each load
- Text language randomly chosen (4 options)
- Scene background color matches floor material color for cohesion

## Development Workflow

When modifying the 3D scene:
1. Edit `src/script.js` for scene logic
2. Modify shader files in `src/shaders/` for custom visual effects
3. Update `src/style.css` for UI styling (minimal usage - canvas-based)
4. Place static assets (fonts, images) in `static/` directory
5. Dev server auto-reloads on file changes in `src/` and `static/`

### Debugging
- Three.js development tools work in browser console
- `lil-gui` is available for creating debug UI panels
- Source maps enabled via `devtool: 'source-map'` in webpack config
- `stats.js` included for FPS monitoring

## Code Organization Patterns

- **Geometry Creation**: Box geometries and plane geometries defined inline with position/scale transformations
- **Group Management**: Related objects grouped together (e.g., door frame components)
- **Cloning Pattern**: Reusable `cloneGroup()` function for repeating geometry along axes
- **Responsive Design**: Window resize handler updates camera aspect ratio and renderer size
