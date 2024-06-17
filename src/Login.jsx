import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Signup.css";

function Login() {
  const [user, setUser] = useState(null);
  const [signinemail, setsigninEmail] = useState("");
  const [signinpassword, setsigninPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function signinUser() {
    signInWithEmailAndPassword(auth, signinemail, signinpassword)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log(userCredential);
        setErrorMessage(""); 
      })
      .catch((error) => {
        const errorCode = error.code;
        let message;
        switch (errorCode) {
          case 'auth/wrong-password':
            message = "Incorrect password. Please try again.";
            break;
          case 'auth/user-not-found':
            message = "No user found with this email address.";
            break;
          case 'auth/invalid-email':
            message = "Invalid email address format.";
            break;
          case 'auth/invalid-credential':
            message = "Invalid credentials. Please try again.";
            break;
          default:
            message = error.message;
        }
        setErrorMessage(message);
        console.error(errorCode, message);
      });
  }

  return (
    <div className="signup-main">
      <div className="signupContent">
        <div className="signupContent1">
          <div className="signup">
            <div>
              <p style={{paddingBottom:"15px"}}>Welcome back</p>
              <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                <div className="signup-text">Login!</div>
                <p>New user? <span style={{color:"red", paddingLeft:"10px"}}>Sign up</span></p>
              </div>
            </div>
            <p className="signupvalidation" style={{color: "red"}}>{errorMessage}</p>
            <div className="email">
              <p>Email address</p>
              <div className="input_svg">
                <input
                  placeholder="Enter Email"
                  onChange={(e) => setsigninEmail(e.target.value)}
                />
                <img src="email.svg" alt="" />
              </div>
            </div>
            <div className="create-password">
              <p>Password</p>
              <div className="input_svg">
                <input
                  type="password"
                  onChange={(e) => setsigninPassword(e.target.value)}
                  placeholder="Password"
                />
                <img src="show.svg" alt="" />
              </div>
            </div>
            <button className="signup_btn" onClick={signinUser}>
              Login
            </button>
          </div>
          <div className="terms_privacy_policy">
            Terms and Conditions | Privacy Policy
          </div>
        </div>
        <div className="signup_content2">
          <div className="signupcontent">
            <p className="domain_name">www.curlsmanda.com</p>
            <div className="signupcontentchild">
              <p>curlsmanda</p>
              <h1>
                Smart and quick digital collaboration platform for startups &
                investors to validate and invest on deals
              </h1>
              <button className="watch_demo">Watch Demo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
