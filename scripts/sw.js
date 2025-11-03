const CACHE_NAME = 'thoush-v1';
const ASSETS = [
  '/',
  'index.html',
  'style.css',
  'scripts/darkmode.js',
  'fonts/InterVariable.woff2',
  'fonts/InterVariable-Italic.woff2',
  'images/desktop/desktop-2025-10-31.avif',
  'images/desktop/desktop-2025-10-31.webp',
  'images/desktop/desktop-2025-10-31.png',
  'images/stamps/stamp-aws/stamp-aws-small.png',
  'images/stamps/stamp-aws/stamp-aws-small.avif',
  'images/stamps/stamp-aws/stamp-aws-small.webp',
  'images/stamps/stamp-debian/stamp-debian.png',
  'images/stamps/stamp-thou/stamp-thou-new.png',
  'images/stamps/stamp-peak/peak-88x31.gif',
  'images/stamps/stamp-peak/peak-88x31.avif'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(networkRes => {
        const resClone = networkRes.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
        return networkRes;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

