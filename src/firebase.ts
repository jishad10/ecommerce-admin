// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import getStorage to access Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-social-app2.firebaseapp.com",
  projectId: "next-social-app2",
  storageBucket: "next-social-app2.appspot.com",
  messagingSenderId: "645948828088",
  appId: "1:645948828088:web:07aef8024b7b094b97074d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app); // Initialize storage

// Export the storage object for use in other parts of the app
export { storage };
