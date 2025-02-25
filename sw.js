
const CACHE_NAME = 'super-pario-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/app-icon.png',
  '/Dead-Mario.png',
  '/question-mark.png',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('message', event => {
  if (event.data === 'check-update') {
    self.skipWaiting();
    clients.matchAll().then(clients => {
      clients.forEach(client => client.postMessage('new-content-available'));
    });
  }
});
