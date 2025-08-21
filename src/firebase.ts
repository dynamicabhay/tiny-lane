
import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxr7y-xyox8qBjjqOQl-C4cnFcVsgmjAg",
  authDomain: "tiny-lane.firebaseapp.com",
  projectId: "tiny-lane",
  storageBucket: "tiny-lane.firebasestorage.app",
  messagingSenderId: "1056298513760",
  appId: "1:1056298513760:web:7f3b9f366b6a9a1cfe9a05"
};

// Initialize Firebase
// This checks if an app is already initialized to avoid errors in development (e.g., hot reloading)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
// You can also export the app instance if needed elsewhere
export default app;