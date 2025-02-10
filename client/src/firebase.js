import { initializeApp } from "firebase/app"; // Your web app's Firebase configuration
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  updatePassword,
  getIdTokenResult,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD_n2xTXLSnLuDyQTf9ZkXdOvy-IXqSVOo",
  authDomain: "ecommerce-61806.firebaseapp.com",
  projectId: "ecommerce-61806",
  storageBucket: "ecommerce-61806.firebasestorage.app",
  messagingSenderId: "84827602990",
  appId: "1:84827602990:web:2254fd50d13b3eb200dfbf",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// export
export const auth = getAuth();
export const sendSignInLinkToEmailF = sendSignInLinkToEmail;
export const signInWithEmailLinkF = signInWithEmailLink;
export const isSignInWithEmailLinkF = isSignInWithEmailLink;
export const updatePasswordF = updatePassword;
export const getIdTokenResultF = getIdTokenResult;
// export const googleAuthProvider = new firebase.auth.googleAuthProvider();
