// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7phs5fDXaoCVPe1l9Sk4T-axuhPtXGe0",
  authDomain: "prise-main.firebaseapp.com",
  projectId: "prise-main",
  storageBucket: "prise-main.firebasestorage.app",
  messagingSenderId: "88522884488",
  appId: "1:88522884488:web:dc406fecaac978f13fa63d"
};

  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// export { storage };
export { db, storage, auth };