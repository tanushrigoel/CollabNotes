// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyCJifWwm8HM0OEWRl70TJF4HU8pMgJ-T9k",
  authDomain: "notes-app-113b9.firebaseapp.com",
  projectId: "notes-app-113b9",
  storageBucket: "notes-app-113b9.firebasestorage.app",
  messagingSenderId: "998461206104",
  appId: "1:998461206104:web:a2ffaec375452c4d3be42d",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export default app;
