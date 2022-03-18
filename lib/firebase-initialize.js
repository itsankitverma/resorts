import { firebaseConfig } from "./firebase-config";
import { initializeApp, getApp } from "firebase/app";

let app = null

if (getApp().length == 0) {
    app = initializeApp(firebaseConfig)
}

export default app