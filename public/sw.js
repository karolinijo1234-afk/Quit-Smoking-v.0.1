self.addEventListener('install', event => {
  console.log('Service Worker installing.');
});
self.addEventListener('fetch', event => {
  // You can add caching logic here later
});
