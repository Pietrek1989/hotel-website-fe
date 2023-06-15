// The files we want to cache
var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
  "/",
  "../src/styles/account.css",
  "../src/styles/admin.css",
  "../src/styles/calendar.css",
  "../src/styles/discover.css",
  "../src/styles/Footer.css",
  "../src/styles/galery.css",
  "../src/styles/hero.css",
  "../src/styles/hermobile.css",
  "../src/styles/loader.css",
  "../src/styles/main.css",
  "../src/styles/navbar.css",
  "../src/styles/testimonials.css",
  "../src/styles/weather.css",
];

// Set the callback for the install step
// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
