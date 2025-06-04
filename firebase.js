// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfKhawoA3Gjq9bfjYYLRgy6uViDs33zAs",
  authDomain: "task-ab49c.firebaseapp.com",
  projectId: "task-ab49c",
  storageBucket: "task-ab49c.firebasestorage.app",
  messagingSenderId: "765338101775",
  appId: "1:765338101775:web:fada729a1e6b8d1736db7a",
  measurementId: "G-PBWYXP4Y7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
