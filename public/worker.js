const fetchStorage = async () => await caches.open('fetch')

const cacheSources = async sources => {
  const storage = await fetchStorage()

  Promise.all(sources.map(async src => {
    const url = new URL(src, location)
    if(!await storage.match(url)) await storage.add(url)
  }))
}

const cacheableFetch = async request => {
  const storage = await fetchStorage()

  const cachedResponse = await storage.match(request)
  if (cachedResponse) return cachedResponse

  const response = await fetch(request)
  
  storage.put(request, response)

  return response
}

self.addEventListener('activate', event => {
  console.log('[worker] active')
})

self.addEventListener('install', event => {
  console.log('[worker] install')

  event.waitUntil(cacheSources([
    './',
    './index.html',
    './manifest.json',
    './scripts/app.js',
    './assets/icons/512.png',
    './assets/screenshots/screenshot-narrow.png',
    './assets/screenshots/screenshot-wide.png',
  ]))
})

self.addEventListener('fetch', event => {
  event.respondWith(cacheableFetch(event.request.clone()))
})
