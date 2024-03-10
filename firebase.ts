import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC2MnrXqoCxvOmzIKWtPSsM-HMOjMZIs3s",
  authDomain: "bite-beb9d.firebaseapp.com",
  projectId: "bite-beb9d",
  storageBucket: "bite-beb9d.appspot.com",
  messagingSenderId: "731717772552",
  appId: "1:731717772552:web:43ca806224a495212c78bd",
  measurementId: "G-PS7FXN8NF2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }