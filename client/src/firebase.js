// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-4fcfa.firebaseapp.com",
  projectId: "mern-auth-4fcfa",
  storageBucket: "mern-auth-4fcfa.appspot.com",
  messagingSenderId: "1011258379849",
  appId: "1:1011258379849:web:ffa5aad48d6471823f3998",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
