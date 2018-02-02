import {CACHE_NAME} from './constants';

export default function cache() {
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(cacheResponse) {
        var fetchRequest = event.request.clone();

        var fetchedResponse = fetch(fetchRequest).then(function(networkResponse) {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse;
          }

          var responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then(function(cache) {
            if (event.request.url.startsWith('http')) {
              cache.put(event.request, responseToCache);
            }
          });

          return networkResponse;
        });

        return cacheResponse || fetchedResponse;
      })
    );
  });
}
