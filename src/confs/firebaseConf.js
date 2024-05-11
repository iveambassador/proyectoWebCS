import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
//import { getFirestore as getFirestore2 } from "firebase/firestore";
//import { getAuth as getAuth2 } from "firebase/auth";
//import { getStorage as getStorage2 } from "firebase/storage";
//import { getFirebase as getFirebase2 } from "firebase/firebase";
//import { getFunctions as getFunctions2 } from "firebase/functions";
//import "./firestore.indexes";


// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZLDfSkiAYzCTZyH5xWTlR0u_14Cr7RWs",
  authDomain: "proyectocenso-89145.firebaseapp.com",
  projectId: "proyectocenso-89145",
  storageBucket: "proyectocenso-89145.appspot.com",
  messagingSenderId: "242552493262",
  appId: "1:242552493262:web:bf4059e80661db63e1ac9f",
  measurementId: "G-4YS8HP8HCV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const firestore = getFirestore(app);

const getUrna = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "UrnaVoto"));
    return querySnapshot;
  } catch (error) {
    console.error("Error al obtener la colección de UrnaVoto:", error);
    throw error;
  }
};

const auth = getAuth(app);
const storage = getStorage(app);
export { storage, getUrna, auth};
