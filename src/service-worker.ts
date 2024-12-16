/* eslint-disable no-restricted-globals */

// self.addEventListener('install', (event: any) => {
//     console.log('Service Worker installing.');
//     event.waitUntil(
//       caches.open('static-v1').then((cache) => {
//         return cache.addAll([
//           '/',
//           '/index.html',
//           '/static/js/bundle.js', // Include other static files to cache
//         ]);
//       })
//     );
//   });
  
//   // Fetch cached assets when offline
//   self.addEventListener('fetch', (event: any) => {
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return response || fetch(event.request);
//       })
//     );
//   });




// src/service-worker.ts

// Add an export to make this a module
export {};

// Caching static assets during installation
self.addEventListener('install', (event: any) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open('static-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/bundle.js', // Include other static files to cache
      ]);
    })
  );
});

// Fetch cached assets when offline
self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
