// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,FacebookAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl8x18jJdWaeTUukeWifJFr_P8nZElxi4",
  authDomain: "venideo1.firebaseapp.com",
  projectId: "venideo1",
  storageBucket: "venideo1.appspot.com",
  messagingSenderId: "625882383209",
  appId: "1:625882383209:web:186d3bac5cf765b5c4f3f8",
  measurementId: "G-S3GF7LHZ3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "venideo1"); 
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

export {auth,provider,fbProvider}