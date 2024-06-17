import { useState, useEffect } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged , signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; 
import "./App.css";
import HomePage from "./HomePage";

function App() {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinname, setsigninName] = useState("");
  const [signinemail, setsigninEmail] = useState("");
  const [signinpassword, setsigninPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); 
      } else {
        setUser(null); 
      }
    });
    return () => unsubscribe();
  }, []);

  function createUser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  function signinUser() {
    signInWithEmailAndPassword(auth, signinemail, signinpassword)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  return (
    <div>
        <div className="app">
         
        </div>
    </div>
  );
}
export default App;
{/* <HomePage user={user} setuser={setUser} /> */}