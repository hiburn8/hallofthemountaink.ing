// sw.js
//game needs to be <5MB to safely store in cache
const cacheName = 'cachemeifyoucan';
const filesToCache = [
    'start.mp3',
    'success.mp3',
    'finish.mp3',
    'abort.mp3',
    'failure.mp3',
    'kevin-macleod-hall-of-the-mountain-king.mp3',

    //We are not ready to fully offline ourselves yet.
    //'index.html',
    //'sw.js',
    //'panels.js',
    //'validation.js',
    //'drawing.js',
    //'main.js',
    //'sidebar.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
            //console.log('king hit');
            return response; // Serve cached version
        }

        return fetch(event.request); // Fetch from network
      })
  );
});