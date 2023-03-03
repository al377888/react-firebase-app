// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as authTools from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV1yIW0vY6_HEXUDOGteRWEZYIJfY5I-o",
  authDomain: "prueba-tfg-c2e89.firebaseapp.com",
  projectId: "prueba-tfg-c2e89",
  storageBucket: "prueba-tfg-c2e89.appspot.com",
  messagingSenderId: "112764973714",
  appId: "1:112764973714:web:fd385e52709fd0a4e22c4b",
  measurementId: "G-NX36EDX6BD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {authTools}