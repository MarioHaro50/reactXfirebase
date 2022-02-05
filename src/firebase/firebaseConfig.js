// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdtmIRn1qZSIBQWTQBGFtRYCGDxmGkmAk",
  authDomain: "react-crud-92442.firebaseapp.com",
  projectId: "react-crud-92442",
  storageBucket: "react-crud-92442.appspot.com",
  messagingSenderId: "573246317015",
  appId: "1:573246317015:web:4bb8b58b22277a5857ab92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);