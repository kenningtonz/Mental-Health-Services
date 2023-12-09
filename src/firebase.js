// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD02l6QYxIhArwY8kp7Mb-pOOOHg_g3XJU",
    authDomain: "todo-51e7a.firebaseapp.com",
    projectId: "todo-51e7a",
    storageBucket: "todo-51e7a.appspot.com",
    messagingSenderId: "285488256767",
    appId: "1:285488256767:web:4d687369be7e1271c91eca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);