// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { get } from "react-hook-form";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: "mern-blog-1d395.firebaseapp.com",
  projectId: "mern-blog-1d395",
  storageBucket: "mern-blog-1d395.firebasestorage.app",
  messagingSenderId: "469606769797",
  appId: "1:469606769797:web:13c973ca52b528605d75ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider };