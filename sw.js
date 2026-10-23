/* FormuNex service worker: app shell offline, file-reader libraries and fonts cached after first use */
const VERSION = "fx-v3";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png", "./icons/favicon-32.png", "./icons/icon.svg", "./cloud.js", "./config.js", "./vendor/supabase-2.118.0.js"];
const RUNTIME = /^https:\/\/(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // The app's own files: network first so updates arrive, cached copy when offline
  if (req.mode === "navigate" || url.origin === location.origin) {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put(req.mode === "navigate" ? "./index.html" : req, c)); return r; })
      .catch(() => caches.match(req.mode === "navigate" ? "./index.html" : req)));
    return;
  }
  // Pinned CDN libraries and fonts: cache first, they never change for a given URL
  if (RUNTIME.test(req.url)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); }
      return r;
    })));
  }
});
