var CACHE = "tracker-v2";
var FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }));
});

self.addEventListener("fetch", function (e) {
  e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request); }));
});
