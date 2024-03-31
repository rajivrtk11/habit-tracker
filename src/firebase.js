// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz0pB8D6OfUKB8doT-nlfWoumNdWTeOCU",
  authDomain: "habit-tracker-3c1aa.firebaseapp.com",
  projectId: "habit-tracker-3c1aa",
  storageBucket: "habit-tracker-3c1aa.appspot.com",
  messagingSenderId: "553277407243",
  appId: "1:553277407243:web:6e356b5052749c8142470e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);