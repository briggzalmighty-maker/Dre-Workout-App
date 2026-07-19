# Dre Mays Workout

Single-file workout app: 6-day split, nutrition guide, PR tracker by muscle group, daily log with per-exercise weights, weight-trend chart, session timer, liquid-glass UI.

## Deploy (GitHub + Vercel only)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new). Framework preset: **Other**. No build command.
3. **Enable Blob storage** (required for cross-device sync):
   - In your Vercel project dashboard → **Storage** tab → **Create Database / Store** → choose **Blob** → connect it to this project.
   - Vercel automatically adds the `BLOB_READ_WRITE_TOKEN` environment variable. Redeploy once after connecting.
4. Done. Open the deployed URL.

## Cross-device sync

- Tap the **sync chip** in the app header (says "Tap to set up sync").
- Create a passcode (6+ characters). Enter the **same passcode** on any other device and your logs, PRs, and weigh-ins appear there.
- Type `OFF` in the same prompt to stop syncing on a device.
- The passcode never leaves your device — only its SHA-256 hash is used as the storage key.
- Without a passcode the app still saves everything **on-device** (localStorage) — nothing is lost, it just doesn't travel.

## How data is stored

| Layer | When | Survives |
|---|---|---|
| localStorage | always | reloads, restarts, offline |
| Vercel Blob (via `/api/state`) | when a sync passcode is set | everything, on every device with the passcode |

Conflict rule: newest save wins (timestamped).

## Files

- `index.html` — the entire app
- `api/state.js` — serverless function that reads/writes state to Vercel Blob
- `package.json` — dependency for the function (`@vercel/blob`)
- `manifest.webmanifest` — PWA (Add to Home Screen on iOS)
- `vercel.json` — hosting config
