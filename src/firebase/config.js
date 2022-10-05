import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOhmZEanImzMBvBdAJcnSoSoaPd5iMzzE",
  authDomain: "baza-zlecen.firebaseapp.com",
  projectId: "baza-zlecen",
  storageBucket: "baza-zlecen.appspot.com",
  messagingSenderId: "438321264133",
  appId: "1:438321264133:web:10f75758e9b8fe0038ce6c",
};

//init app
initializeApp(firebaseConfig);
//init services
const db = getFirestore();
const auth = getAuth();
//init timestamp

export { db, auth };