const CACHE_NAME = 'portfolio-cache-v4'; // Perbarui versi cache
const urlsToCache = [
  './',
  './index.html',
  './assets/css/styles.css',
  './assets/css/swiper-bundle.min.css',
  './assets/img/albert.jpeg',
  './assets/img/apple-touch-icon.png',
  './assets/img/favicon-16x16.png',
  './assets/img/favicon-32x32.png',
  './assets/img/favicon.ico',
  './assets/img/Maya.jpeg',
  './assets/img/ogns1.jpg',
  './assets/img/ogns2.jpg',
  './assets/img/ogns3.jpg',
  './assets/img/profile.png',
  './assets/img/profile2.jpeg',
  './assets/img/site.webmanifest',
  './assets/img/ukm.jpg',
  './assets/img/android-chrome-192x192.png',
  './assets/img/android-chrome-512x512.png',
  './assets/js/main.js',
  './assets/js/mixitup.min.js',
  './assets/js/scrollreveal.min.js',
  './assets/js/swiper-bundle.min.js'
];

// Install Service Worker dan caching semua aset
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('[Service Worker] Caching failed:', err);
      })
  );
  self.skipWaiting(); // Aktifkan service worker baru langsung
});

// Activate Service Worker dan hapus cache lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Pastikan service worker langsung mengontrol halaman
});

// Fetch event handler dengan strategi berbeda untuk HTML dan aset statis
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Untuk file HTML, ambil dari jaringan dengan fallback ke cache
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            // Hanya cache permintaan dengan skema yang didukung
            if (event.request.url.startsWith('http')) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        })
        .catch(() => caches.match(event.request)) // Fallback ke cache jika jaringan gagal
    );
  } else {
    // Untuk aset statis, gunakan cache-first
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            // Hanya cache permintaan dengan skema yang didukung
            if (event.request.url.startsWith('http')) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
  }
});
