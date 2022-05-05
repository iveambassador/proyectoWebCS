import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEnAfoWOUOWb3AcsCvME-NcaKl6Z9x6hQ",
  authDomain: "elecciones-electorales-tss.firebaseapp.com",
  projectId: "elecciones-electorales-tss",
  storageBucket: "elecciones-electorales-tss.appspot.com",
  messagingSenderId: "1066944497467",
  appId: "1:1066944497467:web:f5b7d116ace8d46bf2991e",
  measurementId: "G-8EJ3JYQ5HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export default firestore;