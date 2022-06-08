import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
//import "./firestore.indexes";


// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEnAfoWOUOWb3AcsCvME-NcaKl6Z9x6hQ",
  authDomain: "elecciones-electorales-tss.firebaseapp.com",
  projectId: "elecciones-electorales-tss",
  storageBucket: "elecciones-electorales-tss.appspot.com",
  messagingSenderId: "1066944497467",
  appId: "1:1066944497467:web:770945188614d294f2991e",
  measurementId: "G-QMWSSEMPLL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const firestore = getFirestore(app);

const getUrna = () => getDocs(collection(firestore, "UrnaVoto"));
const auth = getAuth(app);
export { getUrna, auth };
