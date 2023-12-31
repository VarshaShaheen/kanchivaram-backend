import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig ={
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "kanchivaram-4f387.firebaseapp.com",
    projectId: "kanchivaram-4f387",
    storageBucket: "kanchivaram-4f387.appspot.com",
    messagingSenderId: "87195945574",
    appId: "1:87195945574:web:2250ba5b68260fb73a7ba7",
    measurementId: "G-JYNGNN19CX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

