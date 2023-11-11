self.addEventListener("install", (event) => {
  console.log("Installing Service Worker...", new Date().toLocaleTimeString());
  event.waitUntil(() => {
    self.skipWaiting();
    console.log("Installed Service Worker.", new Date().toLocaleTimeString());
  });
});

self.addEventListener("activate", (event) => {
  console.log("Activated Service Worker.", new Date().toLocaleTimeString());
  event.waitUntil(() => {
    clients.claim();
    console.log("Activated Service Worker.", new Date().toLocaleTimeString());
  });
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching something...", new Date().toLocaleTimeString());
  return fetch(event.request);
});
