// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEnAfoWOUOWb3AcsCvME-NcaKl6Z9x6hQ",
  authDomain: "elecciones-electorales-tss.firebaseapp.com",
  projectId: "elecciones-electorales-tss",
  storageBucket: "elecciones-electorales-tss.appspot.com",
  messagingSenderId: "1066944497467",
  appId: "1:1066944497467:web:770945188614d294f2991e",
  measurementId: "G-QMWSSEMPLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export default firestore;