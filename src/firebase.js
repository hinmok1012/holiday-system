// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "你的API_KEY",
  authDomain: "你的AUTH_DOMAIN",
  projectId: "你的PROJECT_ID",
  storageBucket: "你的STORAGE_BUCKET",
  messagingSenderId: "你的MESSAGING_SENDER_ID",
  appId: "你的APP_ID",
  measurementId: "你的MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
