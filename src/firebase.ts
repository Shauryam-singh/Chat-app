import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set, onDisconnect, serverTimestamp } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Firestore Database
export const db = getFirestore(app);

// Realtime Database (for online status)
export const rtdb = getDatabase(app);

/**
 * Updates user online status in Realtime Database
 * @param {User | null} user - Firebase user object
 * @param {boolean} isOnline - Online status
 */
export const updateUserStatus = (user: User | null, isOnline: boolean): void => {
    if (!user) return;

    const statusRef = ref(rtdb, `users/${user.uid}/status`);

    set(statusRef, {
        state: isOnline ? "online" : "offline",
        lastChanged: serverTimestamp(),
    });

    if (isOnline) {
        onDisconnect(statusRef).set({
            state: "offline",
            lastChanged: serverTimestamp(),
        });
    }
};