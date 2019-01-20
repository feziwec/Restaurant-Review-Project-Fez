var staticCacheName = 'restaurant-static-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll([
        '/',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/dbhelper.js',
        '/css/styles.css',
        '/css/responsive.css',
        '/data/restaurants.json',
        'restaurant.html',
        'index.html',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/img/1_small.jpg',
        '/img/2_small.jpg',
        '/img/3_small.jpg',
        '/img/4_small.jpg',
        '/img/5_small.jpg',
        '/img/6_small.jpg',
        '/img/7_small.jpg',
        '/img/8_small.jpg',
        '/img/9_small.jpg',
        '/img/10_small.jpg'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('restaurant-') &&
                 cacheName != staticCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

//https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(staticCacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});