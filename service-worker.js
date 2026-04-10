const CACHE_NAME = 'daily-tracker-v8';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only cache normal GET requests
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  // Skip non-http(s) requests just in case
  if (!request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache successful basic/http responses
        if (!response || response.status !== 200) {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache).catch(() => {});
        });

        return response;
      })
      .catch(() => caches.match(request))
  );
});