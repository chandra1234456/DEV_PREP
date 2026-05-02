import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase config
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

// Export auth
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ ADD THIS