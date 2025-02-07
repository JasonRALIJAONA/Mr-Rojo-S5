// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔹 Configuration Firebase (remplace avec ta propre config)
const firebaseConfig = {
    apiKey: "AIzaSyA7phs5fDXaoCVPe1l9Sk4T-axuhPtXGe0",
    authDomain: "prise-main.firebaseapp.com",
    projectId: "prise-main",
    storageBucket: "prise-main.firebasestorage.app",
    messagingSenderId: "88522884488",
    appId: "1:88522884488:web:dc406fecaac978f13fa63d"
};

// 🔥 Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// 🔑 Modules Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const firebase_url = "https://firestore.googleapis.com/v1/projects/prise-main/databases/(default)/documents";
export { app, auth, db, storage };
