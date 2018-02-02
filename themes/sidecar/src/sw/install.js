import {CACHE_NAME} from './constants';

var urlsToCache = ['/', '/css/style.css', '/drinks/'];

export default function install() {
  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
      })
    );
  });
}
