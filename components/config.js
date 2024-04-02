// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCnRn7xvpw_EeWkCe4edqAjyHIWe18F3MI",
    authDomain: "assignment4-f1d8e.firebaseapp.com",
    projectId: "assignment4-f1d8e",
    storageBucket: "assignment4-f1d8e.appspot.com",
    messagingSenderId: "539777676248",
    appId: "1:539777676248:web:a51c8b3cdf3a340a8338ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);