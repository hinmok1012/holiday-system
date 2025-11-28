// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK95G2zUxZF_UePoGJLTcfNOuRjrjZUAM",
  authDomain: "holiday-system-b7e66.firebaseapp.com",
  projectId: "holiday-system-b7e66",
  storageBucket: "holiday-system-b7e66.appspot.com",
  messagingSenderId: "454041427438",
  appId: "1:454041427438:web:3feb3974ae284c6f5982ff",
  measurementId: "G-3XPCJ1WEK6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 匯出 Auth 和 Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
