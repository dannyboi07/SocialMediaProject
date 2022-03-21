/*eslint-disable */
const CACHE_NAME = "social_media";
const urlsToCache = [
    "/"
];

self.addEventListener("install", e => {
    console.log("Service worker installed");

    self.skipWaiting();
});

self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push received...", data);
    const options = {
        body: "Check it out!",
        icon: data.icon,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: data.pstId,
            url: data.url
        }
    }
    e.waitUntil(
        self.registration.showNotification(data.title, options)
    );
})

self.addEventListener('notificationclick', e => {
    const notification = e.notification;
    const primaryKey = notification.data.primaryKey;
    const action = e.action;
    console.log(notification);

    if (action === "close") {
        console.log("clicked close");
        notification.close();
    } else {
        console.log("clicked");
        clients.openWindow(notification.data.url);
        notification.close();
    }
  
    console.log('Closed notification: ' + primaryKey);
  });

// self.addEventListener("register", (e) => {
//     console.log("Service worker registered");
// });