import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import history from './api/history.js'

const firebaseConfig = {
    apiKey: "AIzaSyD1IxQLJtB1SPUGoWTyrkZiu6451c8Dd50",
    authDomain: "apap-back.firebaseapp.com",
    projectId: "apap-back",
    storageBucket: "apap-back.appspot.com",
    messagingSenderId: "912822043359",
    appId: "1:912822043359:web:df51d49796efcfaf5c1f6a",
    measurementId: "G-LH8BW0HFXL"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "denied") {
        return;
    }

    const token = await getToken(messaging);
    if (token) {
        history.registerPushToken(token);
    }

    onMessage(messaging, (payload) => {
        //TODO 구현 필요
        console.log("메시지가 도착했습니다.", payload);
    });
}

export default requestPermission;
