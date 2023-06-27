// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyB97xOiPfRFcwSSM57phMp40X2_wiujpM8",
  authDomain: "auth-69433.firebaseapp.com",
  projectId: "auth-69433",
  storageBucket: "auth-69433.appspot.com",
  messagingSenderId: "207103054751",
  appId: "1:207103054751:web:21ffd1c3a76226fc0963aa",
  measurementId: "G-023WSB1ND0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app ;