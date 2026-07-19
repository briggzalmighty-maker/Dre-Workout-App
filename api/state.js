import { put, list } from '@vercel/blob';

// Key = SHA-256 hash of the user's sync passcode (computed client-side).
// One blob per key: state-<hash>.json
// Server never sees the passcode itself.

const KEY_RE = /^[a-f0-9]{64}$/;

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const k = (req.query && req.query.k) || '';
      if (!KEY_RE.test(k)) return res.status(400).json({ error: 'bad key' });
      const { blobs } = await list({ prefix: `state-${k}.json`, limit: 1 });
      if (!blobs.length) return res.status(404).json({ error: 'not found' });
      const r = await fetch(blobs[0].url, { cache: 'no-store' });
      const state = await r.json();
      return res.status(200).json({ state });
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);
      const k = body && body.k;
      const state = body && body.state;
      if (!KEY_RE.test(k || '')) return res.status(400).json({ error: 'bad key' });
      if (!state || typeof state !== 'object') return res.status(400).json({ error: 'bad state' });
      const json = JSON.stringify(state);
      if (json.length > 1_000_000) return res.status(413).json({ error: 'too large' });
      await put(`state-${k}.json`, json, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json'
      });
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'server error', detail: String(e && e.message || e) });
  }
}
