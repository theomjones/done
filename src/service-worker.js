const CACHE_NAME = "state-cache-v0.1.0";

self.addEventListener("install", event => {
  console.log("installed SW.");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache
        .addAll(["/", "/index.html", "/index.js"])
        .catch(e => console.error(e));
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response ? response : fetch(event.request);
    })
  );
});
