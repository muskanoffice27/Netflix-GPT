// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB49n25TQNyAUIlZEU4z-Nq08NyzqwovA",
  authDomain: "netflixgpt-f5cbb.firebaseapp.com",
  projectId: "netflixgpt-f5cbb",
  storageBucket: "netflixgpt-f5cbb.firebasestorage.app",
  messagingSenderId: "565660792941",
  appId: "1:565660792941:web:8d439871507b753667e764",
  measurementId: "G-E7H6S352WN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();