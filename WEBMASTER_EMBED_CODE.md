# Copy-Paste Embed Code for Webmaster

## 🎯 Recommended Code (Responsive, Full-Width)

After you deploy to Vercel, send this to the webmaster:

---

### Embed Code

```html
<!-- A Message Worth Repeating II - Satoshi's Bitcoin Quote -->
<div style="position: relative; width: 100%; padding-bottom: 56.25%; margin: 2rem 0; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
  <iframe
    src="https://YOUR-VERCEL-URL.vercel.app/"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    allow="accelerometer; autoplay"
    allowfullscreen
    title="A Message Worth Repeating II - Interactive 3D Bitcoin Art"
    loading="lazy">
  </iframe>
</div>
```

**Instructions for webmaster:**
1. Replace `YOUR-VERCEL-URL.vercel.app` with your actual Vercel deployment URL
2. Insert this HTML where you want the artwork to appear on the page
3. Works on mobile and desktop (fully responsive)
4. Click the artwork to regenerate colors and change language

---

## 🚀 How to Deploy & Get Your URL

**Step 1: Deploy to Vercel**
```bash
npm run deploy
```

**Step 2: Copy your Vercel URL**
It will look like: `https://history-of-bitcoin-abc123.vercel.app/`

**Step 3: Replace in embed code above**
Change `YOUR-VERCEL-URL.vercel.app` to your actual URL

**Step 4: Send to webmaster**
Copy the entire HTML block and send via email

---

## 📧 Email Template

```
Subject: Embed Code for "A Message Worth Repeating II"

Hi [Webmaster],

Here's the embed code for the interactive 3D Bitcoin artwork:

<!-- A Message Worth Repeating II - Satoshi's Bitcoin Quote -->
<div style="position: relative; width: 100%; padding-bottom: 56.25%; margin: 2rem 0; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
  <iframe
    src="https://YOUR-VERCEL-URL.vercel.app/"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    allow="accelerometer; autoplay"
    allowfullscreen
    title="A Message Worth Repeating II - Interactive 3D Bitcoin Art"
    loading="lazy">
  </iframe>
</div>

Features:
✅ Fully responsive (mobile/desktop)
✅ Lightweight (333 KB)
✅ Click to regenerate
✅ 4 languages (EN/ES/FR/PT)

Live demo: https://YOUR-VERCEL-URL.vercel.app/

Just drop this HTML wherever you'd like it on:
https://www.historyofbitcoin.io/timeline/satoshis-most-memorable-line

Let me know if you need any adjustments!

Thanks,
[Your Name]
```

---

## Alternative: Custom Domain (Optional)

If you want a cleaner URL like `art.historyofbitcoin.io`:

1. Ask webmaster if they can create a subdomain
2. Point subdomain CNAME to your Vercel deployment
3. Add custom domain in Vercel dashboard
4. Use custom domain in embed code

---

## That's It!

**Next steps:**
1. `npm run deploy` → Get Vercel URL
2. Replace `YOUR-VERCEL-URL.vercel.app` in code above
3. Send email to webmaster with embed code
4. Done! ✅
