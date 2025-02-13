/* eslint-disable no-restricted-globals */
const CACHE_NAME = "offline-cache-v1";
const FILES_TO_CACHE: string[] = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  "/static/css/main.chunk.css",
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js"
];

// Ensure TypeScript recognizes `self` as a Service Worker
const sw = self as any;

// Install event: Cache files
sw.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  sw.skipWaiting();
});

// Fetch event: Serve files from cache
sw.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    }).catch(() => caches.match("/index.html")) // Fallback for SPA
  );
});

// Activate event: Remove old caches
sw.addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  sw.clients.claim();
});
