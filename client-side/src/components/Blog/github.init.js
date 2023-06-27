// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk_Wd9aKGOzRSdBtyAw0_gLz3sX6SELns",
  authDomain: "git-hub-authentication.firebaseapp.com",
  projectId: "git-hub-authentication",
  storageBucket: "git-hub-authentication.appspot.com",
  messagingSenderId: "775488965459",
  appId: "1:775488965459:web:471ae66cad0d021af32fa6",
  measurementId: "G-76ZFV451TN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app ;