// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn9sf9xFqvwOB62KsUvXKy3d1Cf_2NOWA",
  authDomain: "cs473-hdr-project.firebaseapp.com",
  projectId: "cs473-hdr-project",
  storageBucket: "cs473-hdr-project.appspot.com",
  messagingSenderId: "989015061465",
  appId: "1:989015061465:web:5031a7b27b3702e9035fc8",
  measurementId: "G-W9NS1619GP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
