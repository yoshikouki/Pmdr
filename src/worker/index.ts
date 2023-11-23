/// <reference lib="webworker" />
const sw = self as unknown as ServiceWorkerGlobalScope; // we still need to override the "self" variable

sw.addEventListener("install", (event) => {
  console.log("Installing Service Worker...", new Date().toLocaleTimeString());
  sw.skipWaiting();
  event.waitUntil(sw.skipWaiting());
});
sw.addEventListener("activate", (event) => {
  console.log("Activating Service Worker.", new Date().toLocaleTimeString());
  event.waitUntil(sw.clients.claim());
});
sw.addEventListener("fetch", (event) => {
  console.log("Fetching something...", new Date().toLocaleTimeString());
  return fetch(event.request);
});

sw.addEventListener("message", (event) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log(
    "Received message, ",
    event?.data,
    new Date().toLocaleTimeString()
  );
});
