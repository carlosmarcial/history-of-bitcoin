# Video Export Guide 🎥

Export your React Three Fiber scene as a high-quality MP4 video with perfect looping!

## Quick Start

### 1. Open the App
```bash
npm run dev
```

### 2. Press 'R' Key
This toggles the recording controls panel in the bottom-right corner.

### 3. Configure Recording
- **Duration**: Set to **60 seconds** for a perfect loop (matches camera animation)
- **Frame Rate**:
  - `30 FPS` - Smaller file size (~50-100 MB)
  - `60 FPS` - Butter-smooth animation (~100-200 MB)

### 4. Start Recording
Click "⏺ Start Recording" button

The recording will:
- ✅ Capture at high quality (8 Mbps bitrate)
- ✅ Show progress bar
- ✅ Auto-stop at duration
- ✅ Auto-download as `.webm` file

### 5. Convert to MP4 (Optional)

The browser outputs `.webm` format. To convert to MP4:

**Option A: Using FFmpeg (Command Line)**
```bash
ffmpeg -i bitcoin-art-*.webm -c:v libx264 -preset slow -crf 18 -c:a copy bitcoin-art-final.mp4
```

**Option B: Using HandBrake (GUI)**
1. Download [HandBrake](https://handbrake.fr/)
2. Open your `.webm` file
3. Select "H.264" preset
4. Quality: RF 18 (high quality)
5. Click "Start"

**Option C: Using CloudConvert (Online)**
1. Go to [cloudconvert.com](https://cloudconvert.com/webm-to-mp4)
2. Upload your `.webm` file
3. Convert to MP4
4. Download

## Perfect Looping Setup

### Why 60 Seconds?

The camera takes **exactly 60 seconds** to complete one full loop:
- Starts at `z = 720`
- Ends at `z = 600`
- Uses GSAP with linear easing
- Set to `repeat: -1` (infinite loop)

### How We Achieve Perfect Looping

The recorder automatically stops **1 frame before** the full duration:

**At 60 FPS:**
- Duration: 60 seconds = 3600 frames
- **Records: 3599 frames** (stops at 59.983s)
- Frame 3599 → Frame 0 = seamless loop ✅

**At 30 FPS:**
- Duration: 60 seconds = 1800 frames
- **Records: 1799 frames** (stops at 59.967s)
- Frame 1799 → Frame 0 = seamless loop ✅

This ensures the last frame naturally transitions to the first frame with no visible jump!

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `R` | Toggle recording controls |
| `Click` | Regenerate colors/language |

## Advanced: Custom Recording Duration

### 30-Second Teaser
Good for social media previews:
```
Duration: 30 seconds
FPS: 60
Result: Half-loop (not seamless)
```

### 120-Second Extended
For 2 complete loops:
```
Duration: 120 seconds
FPS: 30 (keeps file size reasonable)
Result: 2 perfect loops
```

## Browser Compatibility

### Supported Browsers
- ✅ **Chrome/Edge** - Best performance, VP9 codec
- ✅ **Firefox** - Good performance
- ⚠️ **Safari** - May need MP4 conversion

### Known Limitations
- Safari doesn't support VP9 codec (use MP4 conversion)
- Recording requires WebGL support
- Large files (60s @ 60fps ≈ 150-200 MB)

## Troubleshooting

### Recording Won't Start?
- Check browser console for errors
- Ensure WebGL is enabled
- Try refreshing the page

### File Too Large?
- Reduce FPS to 30
- Reduce duration
- Use lower quality setting (edit `useVideoRecorder.ts`)

### Video is Choppy?
- Close other applications
- Use Chrome for best performance
- Ensure GPU acceleration is enabled

### Video Doesn't Loop Seamlessly?
- **Must use 60-second duration** (or multiples: 120s, 180s)
- Any other duration won't loop perfectly
- The camera animation is timed to 60s

## Post-Processing Tips

### Add Background Music
```bash
ffmpeg -i bitcoin-art.mp4 -i music.mp3 -c copy -shortest bitcoin-art-with-audio.mp4
```

### Create GIF (for Twitter/Discord)
```bash
ffmpeg -i bitcoin-art.mp4 -vf "fps=15,scale=800:-1:flags=lanczos" -c:v gif bitcoin-art.gif
```

### Compress for Web
```bash
ffmpeg -i bitcoin-art.mp4 -c:v libx264 -crf 23 -preset medium bitcoin-art-compressed.mp4
```

### Perfect Loop Settings in Video Editors

**Adobe Premiere Pro:**
1. Import video
2. Set timeline to 60s
3. Enable "Loop" on clip
4. Export with "Match Source" settings

**DaVinci Resolve:**
1. Import clip
2. Timeline settings: 60 FPS
3. Enable "Loop Clip"
4. Render as H.264

**Final Cut Pro:**
1. Import video
2. Right-click → "Loop Clip"
3. Export with "Master File" settings

## File Size Reference

| Duration | FPS | Format | Size (approx) |
|----------|-----|--------|---------------|
| 30s | 30 | WebM | 40-60 MB |
| 60s | 30 | WebM | 80-120 MB |
| 60s | 60 | WebM | 150-200 MB |
| 60s | 60 | MP4 (H.264) | 100-150 MB |

## Quality Settings

Current settings in `useVideoRecorder.ts`:

```typescript
{
  videoBitsPerSecond: 8000000, // 8 Mbps
  quality: 0.95,               // 95% quality
  mimeType: 'video/webm;codecs=vp9'
}
```

To change quality, edit the values:
- Higher bitrate = larger file, better quality
- Lower bitrate = smaller file, lower quality
- Recommended range: 4-12 Mbps

## Export Checklist

- [ ] Press `R` to open controls
- [ ] Set duration to **60 seconds**
- [ ] Choose FPS (60 for smooth, 30 for smaller file)
- [ ] Click "Start Recording"
- [ ] Wait for progress bar to complete
- [ ] File auto-downloads
- [ ] Convert to MP4 if needed (optional)
- [ ] Test loop in video player
- [ ] Share your art! 🎨

## Next Steps

Once you have your video:
1. Upload to Vimeo/YouTube
2. Share on Twitter/Instagram
3. Embed on historyofbitcoin.io
4. Add to your portfolio

---

**Pro Tip:** Record at 60 FPS for maximum quality, then compress later if needed. It's easier to downscale than upscale!
