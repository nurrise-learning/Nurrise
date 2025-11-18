# Nurrise — Offline PWA

This repository contains a small PWA demo combining motivation, learning, videos, healing and design templates.

## Files
- `index.html` — main app UI
- `style.css` — styling
- `script.js` — app logic
- `manifest.webmanifest` — PWA manifest
- `service-worker.js` — offline caching
- `icon-192.png`, `icon-512.png` — app icons (upload)
- `designs/` — add design images here
- `videos/` — optional local video files

## How to publish
1. Put all files into the repository root (or configure GitHub Pages to use the root).
2. Upload icons `icon-192.png` and `icon-512.png`.
3. On GitHub: go to Settings → Pages → Source: branch `main` and folder `/ (root)` then save. Wait a minute and open `https://<your-user>.github.io/<repo>/`.
4. If you change files, commit & push. The service worker caches assets — clear site data in browser to see updates quickly.

## Extend
- Add course files to `/courses` and list them in `script.js`.
- Add thumbnails to `/designs` and update the `designs` array in `script.js`.
- Add audio files and implement a player for healing section.
