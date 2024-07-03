import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import "../Styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import urls from "../utils/urls"
function Login() {
  const [signinemail, setsigninEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function signinUser(data) {
    setsigninEmail(data.Email)
    signInWithEmailAndPassword(auth, data.Email, data.password)
      .then((result) => {
        setErrorMessage("");
        const formattedTime = new Date()
        axios
        .post(urls.userStatus, {
          Name: result.user.email,
          Time: formattedTime, 
          Status: "Sign in",
        })
        .then((response) => {
          console.log(response);
        });
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
  function signinwithgoogle() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setErrorMessage("");
        const formattedTime = new Date()
        axios
        .post(urls.userStatus, {
          Name: result.user.email,
          Time: formattedTime, 
          Status: "Sign in",
        })
        .then((response) => {
          console.log(response);
        });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        let message;

        switch (errorCode) {
          case "auth/popup-closed-by-user":
            message = "The popup was closed before completing the sign in. Please try again.";
            break;
          case "auth/cancelled-popup-request":
            message = "Popup request was cancelled. Please try again.";
            break;
          default:
            message = error.message;
        }

        setErrorMessage(message);
        console.error(errorCode, message);
      });
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signinUser(data);
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="email">
                <p>Email address</p>
                <div className="input_svg">
                  <input
                    placeholder="Enter Email"
                    onChange={(e) => setsigninEmail(e.target.value)}
                    {...register("Email", {
                      required: "Email is required",
                      minLength: {
                        value: 15,
                        message: "Email must be at least 15 characters long",
                      },
                      maxLength: {
                        value: 67,
                        message: "Email cannot exceed 67 characters",
                      },
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Email is not valid",
                      },
                    })}
                  />
                  <EmailOutlinedIcon />
                </div>
                {errors.Email && (
                  <p className="error">{errors.Email.message}</p>
                )}
              </div>
              <div className="create-password">
                <p>Password</p>
                <div className="input_svg">
                  <input
                    type={!showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      maxLength: {
                        value: 14,
                        message: "Password cannot exceed 14 characters",
                      },
                    })}
                  />
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={toggleShowPassword}
                  >
                    {!showPassword ? (
                      <RemoveRedEyeOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </div>
              <div className="remember_forgot_password">
                <div className="checkbox_text">
                  <input type="checkbox" />
                  <p>Remember this device</p>
                </div>
                <p
                  className="forgot_password"
                  style={{ color: "red", fontWeight: 500 }}
                  onClick={() => {
                   navigate("/resetpassword")
                  }}
                >
                  Forgot password?
                </p>
              </div>
              <input
                type="submit"
                style={{ fontWeight: 500, color: "white" }}
                className="signup_btn"
                onClick={handleSubmit(onSubmit)}
              />
              <div className="btLine">
                <line></line> <p>or Sign in with Email</p>
                <line></line>
              </div>
              <div
                type="submit"
                style={{ fontWeight: 500, color: "white" }}
                className="signinwithgoogle"
                onClick={signinwithgoogle}
              >
                <img className="googleLogo" src="Google_logo.svg" alt="" /> Sign
                in with Google
              </div>
            </form>
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
                <img style={{ width: "170px" }} src="logo.svg" alt="" />
              </div>
              <h1>
                Smart and quick digital collaboration platform for startups &
                investors to validate and invest on deals.
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