// Minimal Service Worker — no offline caching

self.addEventListener('install', event => {
  console.log('[SW] Installed');
  // Skip waiting so the new SW activates immediately
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activated');
  // Claim clients so the SW starts controlling pages right away
  event.waitUntil(self.clients.claim());
});
