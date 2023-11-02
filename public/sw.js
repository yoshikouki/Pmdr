let currentTimer;

self.addEventListener("message", (event) => {
  if (event.data.action === "startTimer") {
    const { duration, callback } = event.data;
    currentTimer = setTimeout(() => {
      self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage(callback);
        });
      });
    }, duration);
  } else if (event.data.action === "stopTimer") {
    clearTimeout(currentTimer);
  }
});
