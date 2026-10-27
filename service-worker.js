const CACHE_NAME = 'mike-daily-v1';

const APP_FILES = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
];

// Save the app files for offline use
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(APP_FILES);
        })
    );
});

// Remove older versionsof the app cache
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames
                     .filter(function(name) {
                        return name !== CACHE_NAME;
                     })
                     .map(function(name) {
                        return caches.delete(name);
                     })
            );
        })
    );
});