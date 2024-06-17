import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCt76y7JjztJF9A18m8GMOoXi-SODxTggs",
  authDomain: "react-authentication-7c79a.firebaseapp.com",
  projectId: "react-authentication-7c79a",
  storageBucket: "react-authentication-7c79a.appspot.com",
  messagingSenderId: "778101977877",
  appId: "1:778101977877:web:a1ef118cfd971afc0aaf1c"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };