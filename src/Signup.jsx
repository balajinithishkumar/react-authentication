import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const createUser = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setErrorMessage("Email is required.");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("Password is required.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      let message;
      switch (errorCode) {
        case "auth/email-already-in-use":
          message = "This email is already in use. Please try with a different email address.";
          break;
        case "auth/invalid-email":
          message = "Invalid email address format.";
          break;
        case "auth/weak-password":
          message = "Password should be at least 6 characters long.";
          break;
        default:
          message = error.message;
      }
      setErrorMessage(message);
      console.error(errorCode);
    }
  };

  return (
    <div className="signup-main">
      <div className="signupContent">
        <div className="signupContent1">
          <div className="signup">
            <div className="signup-text">Sign Up!</div>
            <p className="signupvalidation" style={{ color: "red" }}>
              {errorMessage}
            </p>
            <div className="name">
              <p>Name</p>
              <div className="input_svg">
                <input
                  className="name"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <img src="person.svg" alt="" />
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
                <img className="password_show" src="show.svg" alt="" />
              </div>
            </div>
            <div className="remember_forgot_password">
              <div className="checkbox_text">
                <input type="checkbox" />
                <p>Remember this device</p>
              </div>
              <p
                className="forgot_password"
                style={{ color: "red", fontWeight: 500 }}
              >
                Forgot password?
              </p>
            </div>
            <button className="signup_btn" onClick={createUser}>
              Signup
            </button>
            <p className="login_text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
          <div className="terms_privacy_policy">
            Terms and Conditions | Privacy Policy
          </div>
        </div>
        <div className="signup_content2">
          <div className="signupcontent">
            <p className="domain_name">www.curlsmanda.com</p>
            <div className="signupcontentchild">
              <div className="logo_and_name">
                <img style={{ width: "30px" }} src="circle.svg" alt="" />
                <p style={{ fontSize: "23px", fontWeight: "500" }}>
                  curlsmanda
                </p>
              </div>
              <h1>
                Smart and quick digital collaboration platform for startups &
                investors to validate and invest on deals
              </h1>
              <button style={{display:"flex",alignItems:"center", gap:"5px"}} className="watch_demo">
                <img className="playbutton" src="play-button-svgrepo-com 1.png" alt="" />
               <p>Watch Demo</p>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;