// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// ضع هنا قيم مشروعك من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAnD3IoUQKh4UYcDjmD0DWSkxgNowjO4GQ",
  authDomain: "mamaty-ae559.firebaseapp.com",
  projectId: "mamaty-ae559",
  storageBucket: "mamaty-ae559.firebasestorage.app",
  messagingSenderId: "1009199521959",
  appId: "1:1009199521959:web:b3dac9c8478bd1ab633b82"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// تهيئة Firebase Auth و Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber, db, collection, addDoc, serverTimestamp };