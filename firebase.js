// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCnbXIdrT1EBTgPokvq7vyk_EcVggzE7g",
  authDomain: "taka-679ba.firebaseapp.com",
  projectId: "taka-679ba",
  storageBucket: "taka-679ba.appspot.com",
  messagingSenderId: "366151771708",
  appId: "1:366151771708:web:d4c120910a7529a0fe0539"
};

// Initialize Firebase  
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
//const storage = getStorage(app);

export {
  app, db, //storage
}