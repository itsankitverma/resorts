import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD20Ai4hV9rkBg4HK9R8I6AHIxHB_cu0ww",
    authDomain: "firehose-d6680.firebaseapp.com",
    projectId: "firehose-d6680",
    storageBucket: "firehose-d6680.appspot.com",
    messagingSenderId: "322498163235",
    appId: "1:322498163235:web:7970971848eb4af3293796"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();