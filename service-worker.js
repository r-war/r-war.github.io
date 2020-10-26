importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox){
    console.log('workbox berhasil dimuat')
}else{
    console.log('workbox gagal dimuat')
}

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/lib/materialize.min.js', revision: '1' },
    { url: '/js/lib/idb.js', revision: '1' },
    { url: '/js/lib/moment.min.js', revision: '1' },
    { url: '/js/index.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },  
    { url: '/img/favicon-32x32.png', revision: '1' },  
    { url: '/img/favicon.ico', revision: '1' },  
    { url: '/img/icon-192x192.png', revision: '1' },  
    { url: '/img/icon-256x256.png', revision: '1' },  
    { url: '/img/icon-384x384.png', revision: '1' },  
    { url: '/img/icon-512x512.png', revision: '1' },  
    { url: '/img/premier-logo.png', revision: '1' },  
    { url: '/pages/home.html', revision: '1' },  
    { url: '/pages/match.html', revision: '1' },  
    { url: '/pages/savedmatch.html', revision: '1' },  
])

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName : 'pages'
    })
)

workbox.routing.registerRoute(
    /\.(?:png|svg|jpg|jpeg|gif|ico)$/,
    workbox.strategies.cacheFirst({
        cacheName : 'images'
    })
)

workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org\/v2/,
    workbox.strategies.staleWhileRevalidate({
        cacheName : 'football-api',
        plugins : [
            new workbox.expiration.Plugin({
                maxEntries : 20,
                maxAgeSeconds : 30 * 24 * 60 * 60
            })
        ]
    })
)

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName : 'google-font-stylesheet'
    })
)

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName : 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses : [0,200]
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds : 60 * 60 * 24 *365,
                maxEntries : 30
            })
        ],
    })
)

self.addEventListener("push", e =>{

    e.waitUntil(
        self.registration.showNotification("Notif", {
            body : e.data.text(),
            icon : "./icon-192x192.png"
        })
    )
})

// const CACHE_NAME ="PL Soccer";

// var urlsToCache = [
//     "/",
//     "/nav.html",
//     "/index.html",
//     "/pages/home.html",
//     "/pages/match.html",
//     "/pages/savedmatch.html",
//     "/css/materialize.min.css",
//     "/js/materialize.min.js",
//     "/js/nav.js",
//     "/js/api.js",
//     "/js/index.js",
//     "/js/db.js",
//     "/js/lib/moment.min.js",
//     "/js/lib/idb.js",
//     "/icon-192x192.png",
//     "/icon-256x256.png",
//     "/icon-384x384.png",
//     "/icon-512x512.png",
//     "/img/premier-logo.png",
//     "/manifest.json"
// ];

// self.addEventListener("install", function(e){
//     e.waitUntil(
//         caches.open(CACHE_NAME).then(function(cache){
//             return cache.addAll(urlsToCache);
//         })
//     )
// })

// self.addEventListener("fetch", function(event) {
//     const base_url = "https://api.football-data.org/v2";
  
//     if (event.request.url.indexOf(base_url) > -1) {
//       event.respondWith(caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       }));
//     } else {
//       event.respondWith(caches.match(event.request, {"ignoreSearch": true}).then(function(response) {
//         return response || fetch(event.request);
//       }))
//     }  
// });

// self.addEventListener("active", function(e){
//     e.waitUntil(
//         caches.keys().then(function(cacheNames){
//             return Promise.all(
//                 cacheNames.map(function(cacheName){
//                     if(cacheName != CACHE_NAME){
//                         console.log(`ServiceWorker : cache ${cacheName} dihapus`);
//                         return caches.delete(cacheName);
//                     }
//                 })
//             )
//         })
//     )
// })

