// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4535c.firebaseapp.com",
  projectId: "mern-estate-4535c",
  storageBucket: "mern-estate-4535c.appspot.com",
  messagingSenderId: "195376160963",
  appId: "1:195376160963:web:f1d606e4efb85571688276"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// FIREBASE SETUP
// INSTALL NPM IN CLIENT FILE
// CREATE A FIREBASE.JS FILE IN CLIENT
// PASTE THE CONFIG FROM FIREBASE WEBSITE
// SETUP SPECIAL ENV FILE IN CLIENT WITH VITE
// GO TO CONSOLE ON FIREBASE
// AUTHENTICATION - Providers - Google
// Enable Providers you want
// Then in OAuth you add provider and getAuth