import firebase from "firebase/compat/app"
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDFa2Pc-bj8yjTpCHB1iRbo1UvXUNKAa-U",
  authDomain: "new-big-baazar.firebaseapp.com",
  databaseURL: "https://new-big-baazar-default-rtdb.firebaseio.com",
  projectId: "new-big-baazar",
  storageBucket: "new-big-baazar.appspot.com",
  messagingSenderId: "1004388767000",
  appId: "1:1004388767000:web:0abf2114c7cb6aeb22fa6d",
  measurementId: "G-YHMEQSS5XN"
};
if(firebase.app.length === 0){
    firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();

