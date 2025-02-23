import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzOZRgIhllG-Fc4jXH48vcYfEQ-VOZitk",
  authDomain: "marketpulse-ee556.firebaseapp.com",
  projectId: "marketpulse-ee556",
  storageBucket: "marketpulse-ee556.firebasestorage.app",
  messagingSenderId: "766308934149",
  appId: "1:766308934149:web:4ebc9a40b6d4214e50f26c",
  measurementId: "G-7ZZWQVZQ95"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);




