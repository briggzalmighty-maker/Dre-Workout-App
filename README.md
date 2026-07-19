# Dre Mays Workout

A single-file, offline-capable workout app. Strength / hypertrophy / fat-loss program with a 6-day split, nutrition guide, PR tracker (grouped by muscle), daily check-off log with per-exercise weight entry, weight-trend chart, a session timer, and a live clock.

## Hosting on Vercel

This is a static site — no build step, no framework.

1. Push this repo to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Other**. Build command: **none**. Output directory: **leave blank** (root).
4. Deploy. That's it.

## Data & saving

All logs, PRs, weigh-ins, custom exercises, and timer state are saved to the browser's **localStorage** on the device you use. This means:

- Data persists across reloads, closing the tab, and phone restarts.
- Data is **per-device and per-browser** — it does not sync between your phone and laptop.
- Clearing the browser's site data (or "Clear History and Website Data" on iOS Safari) erases it.

If you want cross-device sync later, that requires a small backend (e.g. Vercel KV or Supabase); ask and it can be added.

## Install to iPhone home screen

Open the deployed URL in Safari → Share → **Add to Home Screen**. It launches full-screen like a native app (PWA manifest included).

## Files

- `index.html` — the entire app (HTML, CSS, JS, images all inlined)
- `manifest.webmanifest` — PWA metadata
- `vercel.json` — static hosting config
