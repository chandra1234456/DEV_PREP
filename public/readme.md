// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMiLqbzCUL1tQkpGbtJw01gt85NFoHfPY",
  authDomain: "dev-preparation.firebaseapp.com",
  projectId: "dev-preparation",
  storageBucket: "dev-preparation.firebasestorage.app",
  messagingSenderId: "134921868733",
  appId: "1:134921868733:web:bc4311546790d32d2eaed4",
  measurementId: "G-PYKB0QN67R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);