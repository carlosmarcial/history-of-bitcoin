# Embedding Guide: A Message Worth Repeating II

This guide shows how to embed your Three.js artwork into any website, including [historyofbitcoin.io](https://www.historyofbitcoin.io/).

## 🚀 Quick Start (Copy-Paste)

### Option 1: Responsive Full-Width Embed (Recommended)

Perfect for embedding in blog posts, timeline entries, or content pages.

```html
<!-- Responsive 16:9 container -->
<div style="position: relative; width: 100%; padding-bottom: 56.25%; margin: 2rem 0;">
  <iframe
    src="https://your-vercel-url.vercel.app/"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    title="A Message Worth Repeating II - Satoshi's Bitcoin Quote">
  </iframe>
</div>
```

### Option 2: Fixed Height Embed

For sidebars or specific layout requirements.

```html
<iframe
  src="https://your-vercel-url.vercel.app/"
  width="100%"
  height="600"
  style="border: none; border-radius: 8px;"
  allow="accelerometer; autoplay"
  title="A Message Worth Repeating II">
</iframe>
```

### Option 3: Full-Screen Hero Section

For featured placement at the top of a page.

```html
<div style="width: 100%; height: 100vh; margin: 0;">
  <iframe
    src="https://your-vercel-url.vercel.app/"
    style="width: 100%; height: 100%; border: none;"
    allow="accelerometer; autoplay"
    title="A Message Worth Repeating II">
  </iframe>
</div>
```

### Option 4: Custom Size with Border

```html
<div style="max-width: 800px; margin: 2rem auto;">
  <iframe
    src="https://your-vercel-url.vercel.app/"
    width="800"
    height="600"
    style="border: 2px solid #f7931a; border-radius: 12px; display: block;"
    allow="accelerometer; autoplay"
    title="A Message Worth Repeating II">
  </iframe>
</div>
```

## 📋 For Next.js / React Sites (Like historyofbitcoin.io)

### React Component Embed

```jsx
export default function BitcoinArtEmbed() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      margin: '2rem 0',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <iframe
        src="https://your-vercel-url.vercel.app/"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        allow="accelerometer; autoplay"
        title="A Message Worth Repeating II"
        loading="lazy"
      />
    </div>
  )
}
```

### Contentful Rich Text Integration

If historyofbitcoin.io uses Contentful's Rich Text renderer:

```jsx
import { BLOCKS } from '@contentful/rich-text-types'

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      if (node.data.target.sys.contentType.sys.id === 'bitcoinArt') {
        return (
          <div className="embedded-bitcoin-art">
            <iframe
              src="https://your-vercel-url.vercel.app/"
              style={{ width: '100%', height: '600px', border: 'none' }}
              title="A Message Worth Repeating II"
            />
          </div>
        )
      }
    }
  }
}
```

## 🎨 Customization Options

### Add a Caption

```html
<figure style="margin: 2rem 0;">
  <div style="position: relative; width: 100%; padding-bottom: 56.25%;">
    <iframe
      src="https://your-vercel-url.vercel.app/"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;">
    </iframe>
  </div>
  <figcaption style="text-align: center; margin-top: 1rem; color: #666; font-style: italic;">
    "If you don't believe me or don't get it, I don't have time to try to convince you, sorry."
    - Satoshi Nakamoto
  </figcaption>
</figure>
```

### Dark Mode Compatible

```html
<div style="
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  background: #1a1a1a; /* Fallback while loading */
  border-radius: 8px;
  overflow: hidden;
">
  <iframe
    src="https://your-vercel-url.vercel.app/"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;">
  </iframe>
</div>
```

### With Loading State

```html
<div id="bitcoin-art-container" style="position: relative; width: 100%; padding-bottom: 56.25%;">
  <!-- Loading indicator -->
  <div id="art-loader" style="
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #f7931a;
    font-family: system-ui;
  ">
    Loading Bitcoin Art...
  </div>

  <!-- iframe -->
  <iframe
    src="https://your-vercel-url.vercel.app/"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    onload="document.getElementById('art-loader').style.display='none'">
  </iframe>
</div>
```

## 🔧 Technical Specifications

**Performance:**
- Bundle size: 333 KB gzipped
- Initial load: ~1-2 seconds
- 60 FPS animation
- WebGL required

**Browser Support:**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers ✅

**Permissions Required:**
- `allow="accelerometer"` - Optional, improves mobile experience
- `allow="autoplay"` - Allows GSAP animation to start immediately

## 📱 Mobile Optimization

The artwork is fully responsive and touch-enabled. On mobile:
- Tap to regenerate colors/language
- Optimized pixel ratio for performance
- Adapts to portrait/landscape

## 🚀 Deployment Steps

1. **Deploy to Vercel:**
   ```bash
   npm run deploy
   ```

2. **Get your URL:**
   - Vercel will provide: `https://history-of-bitcoin-xyz.vercel.app/`
   - Or use custom domain

3. **Replace in embed code:**
   Change `https://your-vercel-url.vercel.app/` to your actual Vercel URL

4. **Send to webmaster:**
   Copy the HTML embed code from Option 1 or 2 above

## 📧 Email Template for Webmaster

```
Subject: Embedding "A Message Worth Repeating II" on historyofbitcoin.io

Hi [Webmaster Name],

I've created an interactive 3D art piece featuring Satoshi's famous quote
in 4 languages, and I'd love to embed it on the timeline page:
https://www.historyofbitcoin.io/timeline/satoshis-most-memorable-line

The artwork is:
- Fully responsive (works on mobile/desktop)
- Lightweight (333 KB gzipped)
- Self-hosted (no dependencies on your end)
- Click to regenerate colors/language

Here's the embed code (just drop it where you want it):

[Paste Option 1 code here with your Vercel URL]

Live demo: [Your Vercel URL]

Let me know if you need any customizations!

Thanks,
[Your name]
```

## 🎯 Recommended Placement

For **historyofbitcoin.io/timeline/satoshis-most-memorable-line**:

1. **Hero section** - Full viewport height at top of page
2. **After introduction** - Responsive embed after first paragraph
3. **Featured section** - Dedicated section with caption
4. **Sidebar** - Fixed height embed in sidebar (if exists)

## 🔒 Security & Privacy

- No tracking or analytics in embed
- No cookies set
- No external dependencies loaded
- CORS-friendly
- Works in sandboxed iframes

## ⚡ Performance Tips

1. **Lazy loading** - Add `loading="lazy"` to iframe for below-fold embeds
2. **Preconnect** - Add to page `<head>`:
   ```html
   <link rel="preconnect" href="https://your-vercel-url.vercel.app">
   ```
3. **Aspect ratio** - Use `padding-bottom` technique for no layout shift

## 🆘 Troubleshooting

**iframe not showing?**
- Check browser console for CORS errors
- Ensure Vercel deployment is live
- Try opening Vercel URL directly first

**Performance issues?**
- Add `loading="lazy"` attribute
- Reduce iframe height on mobile
- Check user's GPU/WebGL support

**Not responsive?**
- Use Option 1 (padding-bottom technique)
- Ensure no fixed width constraints on parent

---

**Questions?** Open an issue or contact [your email]
