importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js')

if (workbox) {
  workbox.setConfig({ debug: false })

  workbox.precaching.precacheAndRoute([
    'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.slim.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
  ])

  // npm install workbox-cli --global
  // workbox wizard --injectManifest
  // workbox injectManifest
  workbox.precaching.precacheAndRoute([
  {
    "url": "android-chrome-192x192.png",
    "revision": "186c6fbb9d5ab547581992f75362c823"
  },
  {
    "url": "android-chrome-512x512.png",
    "revision": "ea7fa2466ea31505ffb99b55cfc1598d"
  },
  {
    "url": "apple-launch-1125x2436.png",
    "revision": "924a96aeb7b36eed95342a44c2776aaf"
  },
  {
    "url": "apple-launch-1242x2208.png",
    "revision": "1aed3d5ffbb6198e37770faa0e3e9dcb"
  },
  {
    "url": "apple-launch-1242x2688.png",
    "revision": "831b149e717ef0d75da1ec4ce26ceba6"
  },
  {
    "url": "apple-launch-750x1334.png",
    "revision": "7eb15c4ab912d0c1f802157c9ee964bd"
  },
  {
    "url": "apple-launch-828x1792.png",
    "revision": "480df0b7f4c2ed9e4a47adebf5f87dc5"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "df6726e1074f0f3389a793d8a2a68a17"
  },
  {
    "url": "core/dom-api.js",
    "revision": "4810eecb9bd8b2cfd9dfcf4cd1940318"
  },
  {
    "url": "core/router.js",
    "revision": "0278b95f7e5a659ee022d0dbb9781c5f"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "a19b1dd72097d42a3b5dc88165f97b6d"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "590e3c99cf5ddd2e93578673d9d39eeb"
  },
  {
    "url": "favicon.ico",
    "revision": "d74a3c2385d2d1676442666feb659f4d"
  },
  {
    "url": "index.html",
    "revision": "c559e56a240bf12cb6cea65a5aa587c1"
  },
  {
    "url": "index.js",
    "revision": "693bbe59d255a48608ce4ede6f3c38e1"
  },
  {
    "url": "manifest.json",
    "revision": "964fbdaca37644c02fb51f7ed5328ac3"
  },
  {
    "url": "pages/chat.js",
    "revision": "5757510f0589f5d89e33ce80db43e8c2"
  },
  {
    "url": "pages/roomInfo.js",
    "revision": "2f6ce3e29af2d6693e1a8539cbec7488"
  },
  {
    "url": "pages/rooms.js",
    "revision": "c1a9debfd9436f822ed5243cbd59eaa6"
  },
  {
    "url": "service-worker-template.js",
    "revision": "13341e0cb33d5f756b8cceeebdc84500"
  },
  {
    "url": "styles.css",
    "revision": "5ee1826b28805c15ba7db0cb7a664290"
  },
  {
    "url": "utils/loadExternalLib.js",
    "revision": "4e764c6039be85f984003611659f411e"
  },
  {
    "url": "utils/showJoinModal.js",
    "revision": "2bc7fca0ecda99b163727b279f8888c9"
  },
  {
    "url": "utils/showModal.js",
    "revision": "750a5a4a06ac6c4d6d03d448316110ff"
  },
  {
    "url": "utils/urls.js",
    "revision": "d8f236483fd5d62f169be22f4bb07cba"
  },
  {
    "url": "workbox-config.js",
    "revision": "2ac937caff661023bfa06bac9aef8909"
  }
])

  workbox.routing.registerRoute(
    new RegExp('https://pwa-workshop-munich.herokuapp.com/rooms\/*'),
    new workbox.strategies.NetworkFirst({
      // you can set up requests here (headers, credentials, etc)
      cacheName: 'api-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 10,
          maxAgeSeconds: 60 * 60, // 1 hour
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
      ],
    })
  )
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}