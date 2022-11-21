// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBSat7oDhvV0T2fDF3zvdP41ZDZAHmnB8",
  authDomain: "retudylms.firebaseapp.com",
  projectId: "retudylms",
  storageBucket: "retudylms.appspot.com",
  messagingSenderId: "487438105918",
  appId: "1:487438105918:web:b688c068a2ca83f6e6406f",
  measurementId: "G-GXNGWX4ZWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
export { auth, db , storage};



