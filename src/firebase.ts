import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBQfk-U9OoHWH4WbjmkKHI7W3FJ7cnBvLc",
    authDomain: "chat-app-386be.firebaseapp.com",
    projectId: "chat-app-386be",
    storageBucket: "chat-app-386be.firebasestorage.app",
    messagingSenderId: "240614613544",
    appId: "1:240614613544:web:404e531d0f7a4563818b1d",
    measurementId: "G-73RF6E4N3N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
