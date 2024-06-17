import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Signup.css";

function Login() {
  const [user, setUser] = useState(null);
  const [signinemail, setsigninEmail] = useState("");
  const [signinpassword, setsigninPassword] = useState("");

  function signinUser() {
    signInWithEmailAndPassword(auth, signinemail, signinpassword)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
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
            <div className="signup-text" >Login!</div>
<p>New user? <span style={{color:"red", paddingLeft:"10px"}}>Sign up</span></p>
            </div>
            </div>
           
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
              <p>Create password</p>
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