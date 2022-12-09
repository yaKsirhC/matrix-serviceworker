const cacheName = "v2";

const cacheAssets = ["index.html", "styles.css", "script.js"];

self.addEventListener("install", (e) => {
    console.log('install');
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache.addAll(cacheAssets);
        console.log(cache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      console.log(cacheNames.filter((cache) => cache === cacheName));
      return cacheNames.forEach((cache) => {
        if (cache !== cacheName) {
          return caches.delete(cache);
        }
      });
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
