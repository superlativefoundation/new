import firebase from "firebase/compat/app"
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA8r12I3iMr-7RiXnt-sgVqsACZhcwvCcM",
  authDomain: "d-mart-3e115.firebaseapp.com",
  databaseURL: "https://d-mart-3e115-default-rtdb.firebaseio.com",
  projectId: "d-mart-3e115",
  storageBucket: "d-mart-3e115.appspot.com",
  messagingSenderId: "48597374159",
  appId: "1:48597374159:web:7d879b44d2be28721793ba",
  measurementId: "G-S63JVVBFR5"
};
if(firebase.app.length === 0){
    firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();

