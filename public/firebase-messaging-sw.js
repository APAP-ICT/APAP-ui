importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyD1IxQLJtB1SPUGoWTyrkZiu6451c8Dd50",
    authDomain: "apap-back.firebaseapp.com",
    projectId: "apap-back",
    storageBucket: "apap-back.appspot.com",
    messagingSenderId: "912822043359",
    appId: "1:912822043359:web:df51d49796efcfaf5c1f6a",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(({notification}) => {
    const {title, body} = notification
    const options = {
        body
    };

    self.registration.showNotification(title, options);
});
