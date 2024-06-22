import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
function Login() {
  const [user, setUser] = useState(null);
  const [signinemail, setsigninEmail] = useState("");
  const [signinpassword, setsigninPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function signinUser(data) {
    signInWithEmailAndPassword(auth, data.Email, data.password)
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signinUser(data);
  };
  console.log(errors);
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
                    onChange={(e) => setsigninPassword(e.target.value)}
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
                    style={{ cursor: "pointer",display:"flex", alignItems:"center" }}
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
              <input
                type="submit"
                style={{ fontWeight: 500, color: "white" }}
                className="signup_btn"
                onClick={handleSubmit(onSubmit)}
              />
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
