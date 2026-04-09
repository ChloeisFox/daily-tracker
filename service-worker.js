const CACHE_NAME = 'daily-tracker-v1';
const ASSETS = [
  './',
  './index.html',
  './dashboard.html',
  './entry.html',
  './calendar.html',
  './progress.html',
  './settings.html',
  './css/styles.css',
  './css/themes.css',
  './js/app.js',
  './js/auth.js',
  './js/dashboard.js',
  './js/entry.js',
  './js/calendar.js',
  './js/progress.js',
  './js/settings.js',
  './js/firebase-config.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
