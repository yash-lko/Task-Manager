// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPQGq-iDhAkESTdJ4dM-8nfw-50jH8xrg",
  authDomain: "crud-app-46bbf.firebaseapp.com",
  projectId: "crud-app-46bbf",
  storageBucket: "crud-app-46bbf.appspot.com",
  messagingSenderId: "55562272378",
  appId: "1:55562272378:web:1363efe0ad57b3f7c3c5c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services with types
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export default app;
