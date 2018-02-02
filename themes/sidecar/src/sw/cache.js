import {CACHE_NAME} from './constants';

export default function cache() {
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(function(response) {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          var responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function(cache) {
            if (event.request.url.startsWith('http')) {
              cache.put(event.request, responseToCache);
            }
          });

          return response;
        });
      })
    );
  });
}
