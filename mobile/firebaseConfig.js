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
    apiKey: "AIzaSyDY6A8MwMbVWJO8eACEEj3HslsXYZRt7qM",
    authDomain: "mini-projet-mobile-e1088.firebaseapp.com",
    databaseURL: "https://mini-projet-mobile-e1088-default-rtdb.firebaseio.com",
    projectId: "mini-projet-mobile-e1088",
    storageBucket: "mini-projet-mobile-e1088.firebasestorage.app",
    messagingSenderId: "73466862451",
    appId: "1:73466862451:web:b20e6ec2d02b8fec360306"
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