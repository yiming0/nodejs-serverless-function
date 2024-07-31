const fetchStorage = async () => await caches.open('fetch')

const cacheResources = async () => {
  const storage = await fetchStorage()

  storage.addAll([
    './',
    './index.html',
    './scripts/app.js',
    './icons/512.png',
  ])
}

const cacheableFetch = async ({ request }) => {

  const cachedResponse = await caches.match(request)
  if (cachedResponse) return cachedResponse

  const response = await fetch(request.clone())
  
  const storage = await fetchStorage()
  storage.put(request, response)

  return response
}

self.addEventListener('activate', (event) => {
  console.log('[worker] active')
})

self.addEventListener('install', (event) => {
  console.log('[worker] install')

  event.waitUntil(cacheResources())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheableFetch(event))
})
