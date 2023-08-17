// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRxBmZgsOdh52CO5SoKKbE5qeRetAOSu8",
  authDomain: "hackathon-questionaire.firebaseapp.com",
  projectId: "hackathon-questionaire",
  storageBucket: "hackathon-questionaire.appspot.com",
  messagingSenderId: "74221697888",
  appId: "1:74221697888:web:2c3378b22bb36def3c3c05",
  measurementId: "G-NRG38HKCE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore=getFirestore(app);
export const auth=getAuth(app);
//const analytics = getAnalytics(app);