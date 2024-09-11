self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('my-cache').then(cache => {
            return cache.addAll([
                'controleecom/',
                'controleecom/index.html',
                'controleecom/style.css',
                'controleecom/script.js'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
