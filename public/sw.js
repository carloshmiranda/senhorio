// Senhorio Service Worker - PWA Caching Strategy
const CACHE_NAME = 'senhorio-v1';
const STATIC_CACHE = 'senhorio-static-v1';
const DYNAMIC_CACHE = 'senhorio-dynamic-v1';

// Core app resources to cache immediately
const STATIC_RESOURCES = [
  '/',
  '/dashboard',
  '/calculadora',
  '/recibos',
  '/simulador-irs',
  '/aimi',
  '/offline',
  // Add core CSS/JS files that Next.js generates
  // Note: These will be auto-discovered at runtime
];

// Install event - cache core resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      })
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { url } = request;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests and API routes (except for static assets)
  if (!url.startsWith(self.location.origin) || url.includes('/api/')) {
    return;
  }

  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful page responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Serve from cache if network fails
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fallback to offline page
            return caches.match('/offline');
          });
        })
    );
    return;
  }

  // Handle static assets
  if (request.destination === 'script' ||
      request.destination === 'style' ||
      request.destination === 'image' ||
      url.includes('/_next/static/')) {

    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => {
          // Cache successful static asset responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
  }
});

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'background-sync-receipts') {
    event.waitUntil(syncOfflineReceipts());
  }
});

// Sync offline receipts when connection is restored
async function syncOfflineReceipts() {
  try {
    const offlineActions = await getStoredOfflineActions();
    for (const action of offlineActions) {
      await fetch('/api/receipts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.data)
      });
    }
    await clearStoredOfflineActions();
    console.log('[SW] Successfully synced offline receipts');
  } catch (error) {
    console.error('[SW] Failed to sync offline receipts:', error);
  }
}

// Helper functions for offline storage
async function getStoredOfflineActions() {
  return new Promise((resolve) => {
    // This would integrate with IndexedDB in a full implementation
    resolve([]);
  });
}

async function clearStoredOfflineActions() {
  // Clear stored offline actions after successful sync
  return Promise.resolve();
}

// Handle push notifications (placeholder for future implementation)
self.addEventListener('push', (event) => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'senhorio-notification',
      data: {
        url: '/dashboard'
      }
    };

    event.waitUntil(
      self.registration.showNotification('Senhorio', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.openWindow(event.notification.data.url || '/dashboard')
  );
});