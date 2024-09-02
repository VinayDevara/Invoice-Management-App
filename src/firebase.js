import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import{getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAZBGsM8Z8TvZgAC-2-MnWCp3uB-novOtA",
  authDomain: "invoice-management-app-6c3ec.firebaseapp.com",
  projectId: "invoice-management-app-6c3ec",
  storageBucket: "invoice-management-app-6c3ec.appspot.com",
  messagingSenderId: "523022684080",
  appId: "1:523022684080:web:5d79b00e5209a186911075",
  measurementId: "G-XZ16ZPRJC1"
};

export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage=getStorage();
export const db= getFirestore(app);