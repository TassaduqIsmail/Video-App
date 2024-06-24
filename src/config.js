
import { initializeApp } from "firebase/app";

import{getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDxSJClB5WwWgzebx6bIGuqDhwNuCV2qJE",
  authDomain: "vinedo-510c9.firebaseapp.com",
  projectId: "vinedo-510c9",
  storageBucket: "vinedo-510c9.appspot.com",
  messagingSenderId: "824074538963",
  appId: "1:824074538963:web:7e9c98ea70d6f3eae22926",
  measurementId: "G-D0XSR5V7KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
