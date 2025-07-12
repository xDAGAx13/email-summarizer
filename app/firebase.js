// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEzw72Ceri5CUW5pA7Q35XgTqAzTtUrIg",
  authDomain: "email-summarizer-485c8.firebaseapp.com",
  projectId: "email-summarizer-485c8",
  storageBucket: "email-summarizer-485c8.firebasestorage.app",
  messagingSenderId: "824315888740",
  appId: "1:824315888740:web:63858213640e0795b1cb71"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export default auth