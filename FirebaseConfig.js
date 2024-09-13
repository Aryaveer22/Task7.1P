import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup as firebaseSignInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8UgEPTLebq218PXFwEgu4_tDvDYBmsxU",
  authDomain: "task-sit313.firebaseapp.com",
  projectId: "task-sit313",
  storageBucket: "task-sit313.appspot.com",
  messagingSenderId: "443294983837",
  appId: "1:443294983837:web:52a6578958b90131a15674",
  measurementId: "G-HKVGB8DMSD"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const db = getFirestore();
export const signInWithGooglePopup = () => firebaseSignInWithPopup(auth, provider);

