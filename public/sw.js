const CACHE_NAME = 'smoking-tracker-v1'; // bump this when you update files
const ASSETS_TO_CACHE = [
  '/',               // root
  '/index.html',
  '/manifest.json',
  '/icon192.png',
  '/icon512.png',
  '/favicon.ico'
];

// Install event — cache core assets
self.addEventListener('install', event => {
  console.log('[SW] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event — clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activate event');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch event — serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
