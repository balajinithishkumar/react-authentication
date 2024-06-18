import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [user, setUser] = useState(null);
  const [signinemail, setsigninEmail] = useState("");
  const [signinpassword, setsigninPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  function signinUser() {
    signInWithEmailAndPassword(auth, signinemail, signinpassword)
      .then((userCredential) => {
        setUser(userCredential.user);
        setErrorMessage("");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log;
        let message;
        switch (errorCode) {
          case "auth/wrong-password":
            message = "Incorrect password. Please try again.";
            break;
          case "auth/user-not-found":
            message = "No user found with this email address.";
            break;
          case "auth/invalid-email":
            message = "Invalid email address format.";
            break;
          case "auth/invalid-credential":
            message = "Invalid credentials. Please try again.";
            break;
          case "auth/missing-password":
            message = "Password is missing. Please enter your password.";
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
              <p className="welcome_text" style={{ paddingBottom: "15px" }}>
                Welcome back
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div className="signup-text">Login!</div>
                <p className="newUser_text">
                  New user?{" "}
                  <span style={{ color: "red", paddingLeft: "10px" }}>
                    <Link to="/signup">Sign up</Link>
                  </span>
                </p>
              </div>
            </div>
            <p className="signupvalidation" style={{ color: "red" }}>
              {errorMessage}
            </p>
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
              <button
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
                className="watch_demo"
              >
                <img
                  className="playbutton"
                  src="play-button-svgrepo-com 1.png"
                  alt=""
                />
                <p>Watch Demo</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;