import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute
} from 'workbox-precaching'
import { NavigationRoute, registerRoute, setDefaultHandler } from 'workbox-routing'
import { clientsClaim } from 'workbox-core'
import { NetworkFirst, NetworkOnly, Strategy } from 'workbox-strategies'
import { BackgroundSyncPlugin } from 'workbox-background-sync'

declare let self: ServiceWorkerGlobalScope

const data = {
  race: false,
  debug: false,
  credentials: 'same-origin',
  networkTimeoutSeconds: 0,
  fallback: 'index.html'
}

const cacheName = 'api-cache'

function buildStrategy(): Strategy {
  if (data.networkTimeoutSeconds > 0)
    return new NetworkFirst({
      cacheName: cacheName,
      networkTimeoutSeconds: data.networkTimeoutSeconds
    })
  else return new NetworkFirst({ cacheName })
}

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')), buildStrategy())
// clean old assets
cleanupOutdatedCaches()

const allowlist: undefined | RegExp[] = [/^\/$/]

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist }))

setDefaultHandler(new NetworkFirst())

const bgSyncPlugin = new BackgroundSyncPlugin('api-retry-queue', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
})

registerRoute(
  /\/api\/.*/,
  new NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
)

registerRoute(
  /\/api\/.*/,
  new NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'PUT'
)

registerRoute(
  /\/api\/.*/,
  new NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'DELETE'
)

// this is necessary, since the new service worker will keep on skipWaiting state
// and then, caches will not be cleared since it is not activated
self.skipWaiting()
clientsClaim()
