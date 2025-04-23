// === Updated service-worker.js ===
self.addEventListener('install', (event) => {
  // Skip waiting so new SW becomes active immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim control immediately
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
