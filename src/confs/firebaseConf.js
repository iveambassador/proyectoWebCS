// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAeXLJOj4oTSFOsYTs123DVvDmz_MVSc4",
  authDomain: "elecciones-tss.firebaseapp.com",
  projectId: "elecciones-tss",
  storageBucket: "elecciones-tss.appspot.com",
  messagingSenderId: "344787203266",
  appId: "1:344787203266:web:c98972e3b915807714775b",
  measurementId: "G-8T2VLWTKNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export default firestore;