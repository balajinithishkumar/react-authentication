import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function createUser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log(userCredential);
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
            <div className="signup-text">Sign Up!</div>
            <div className="name">
              <p>Name</p>
              <div className="input_svg">
                <input
                  className="name"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <img src=".svg" alt="" />
              </div>
            </div>
            <div className="email">
              <p>Email address</p>
              <div className="input_svg">
                <input
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <img src="email.svg" alt="" />
              </div>
            </div>
            <div className="create-password">
              <p>Create password</p>
              <div className="input_svg">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create Password"
                />
                <img src="show.svg" alt="" />
              </div>
            </div>
            <button className="signup_btn" onClick={createUser}>
              Signup
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
            <h1>Smart and quick digital collaboration platform for startups & investors to validate and invest on deals</h1>
           <button className="watch_demo">Watch Demo</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;