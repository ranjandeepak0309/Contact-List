// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFYRdd0DqFzr6PeIJR2xw_dsW9LBmwmsA",
  authDomain: "contact-list-98a4e.firebaseapp.com",
  projectId: "contact-list-98a4e",
  storageBucket: "contact-list-98a4e.appspot.com",
  messagingSenderId: "290352357235",
  appId: "1:290352357235:web:525bbacf74f9f550a86f06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
