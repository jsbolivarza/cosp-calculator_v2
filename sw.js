// Service worker for the Calculadora CPS PWA.
//
// Strategy: cache-first for the app shell (index.html, manifest, icons), so the tool works
// fully offline after the first successful load. Bump CACHE_NAME whenever index.html changes,
// so returning visitors get the new version instead of a stale cached one.

const CACHE_NAME = "cosp-fgd-blocks-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests for the app's own origin; let everything else (e.g. the
  // Google Fonts stylesheet) pass through to the network normally. Fonts simply won't
  // load offline, and the page falls back to a system font — not a functional problem.
  if(event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if(url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if(cached) return cached;
      return fetch(event.request)
        .then((response) => {
          // Cache newly seen same-origin assets for next time.
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached);
    })
  );
});
