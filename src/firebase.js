import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAIwOVIw_KJeuO9mOLqKGoG7G6wbH5kpxY",
  authDomain: "ccdb-be3cd.firebaseapp.com",
  databaseURL: "https://ccdb-be3cd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ccdb-be3cd",
  storageBucket: "ccdb-be3cd.appspot.com",
  messagingSenderId: "898792482465",
  appId: "1:898792482465:web:2b2a631326747b5a86b2e0",
  measurementId: "G-C087642KN2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();
const db = getDatabase(app)

export {db, auth, database};
