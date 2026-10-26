'use strict';
const CACHE_NAME = 'cfmi-bible-offline-v3';
const CORE_FILES = [
  './', './index.html', './bible.html', './teachings.html',
  './assets/bible/kjv-data.js', './assets/js/reading-plan.js', './assets/js/bible-app.js',
  './assets/open-bible.svg', './assets/cfmi-logo-short.png', './favicon.svg', './community.html', './supabase-config.js'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('cfmi-bible-offline-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  const url = new URL(request.url);
  if (url.pathname.endsWith('/projector.html') || url.pathname.endsWith('/output.html')) return;
  const isCore = CORE_FILES.some(path => new URL(path, self.registration.scope).pathname === url.pathname);
  if (isCore) {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response && response.ok) caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
      return response;
    })));
    return;
  }
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      if (response && response.ok) caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
      return response;
    }).catch(() => caches.match(request).then(cached => cached || caches.match('./bible.html') || caches.match('./index.html'))));
  }
});
