var cacheName = 'chilliapple';
var filesToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache).then(function () {
        self.skipWaiting();
      })
      .catch(function (err){
        console.error("Error occured during cache file", err)
      })
    })
  );
});

// when the browser fetches a url
self.addEventListener('fetch', function (event) {
  // either respond with the cached object or go ahead and fetch the actual url
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        // retrieve from cache
        return response;
      }
      // fetch as normal
      return fetch(event.request);
    })
    .catch(function (err){
      console.error("Error occured during getting file from cache", err)
    })
  );
});

