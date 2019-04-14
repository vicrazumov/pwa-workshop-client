importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js')

if (workbox) {
  workbox.routing.registerRoute(
    '/',
    new workbox.strategies.StaleWhileRevalidate()
  )

  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'js-cache'
    })
  )
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}























// workbox.routing.registerRoute(
//   /\.css$/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'css-cache',
//   })
// )

// workbox.routing.registerRoute(
//   new RegExp('https://pwa-workshop-munich.herokuapp.com/rooms\/*'),
//   new workbox.strategies.NetworkFirst({
//     // you can set up requests here (headers, credentials, etc)
//     cacheName: 'api-cache'
//   })
// )

// workbox.routing.registerRoute(
//   /\.(?:png|jpg|jpeg|svg|gif)$/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'image-cache',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 20,
//         maxAgeSeconds: 7 * 24 * 60 * 60,
//       })
//     ],
//   })
// )