import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import "../Styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RoleSelect from "./RoleSelect";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useSelector } from "react-redux";
import { setRole } from "../ReduxFunctions/store";

function Signup() {
  const [name, setName] = useState("");
  const [user_auth, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const [selectedRole, setSelectedRole] = useState(""); // State to store selected role
  console.log(selectedRole);
  const navigate = useNavigate();
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const { user, role, loading } = useSelector((state) => state.user);
  console.log(user, role, loading);

  const createUser = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.Email,
        data.password
      );

      setUser(userCredential.user);
      setErrorMessage("");
      setRole(selectedRole)
      localStorage.setItem("role", selectedRole); // Store selected role in localStorage
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      let message;
      switch (errorCode) {
        case "auth/email-already-in-use":
          message =
            "This email is already in use. Please try with a different email address.";
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

  function signinwithgoogle() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        setErrorMessage("");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const message = error.message;
        setErrorMessage(message);
        console.error(errorCode, message);
      });
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createUser(data);
  };
  console.log(errors);

  return (
    <div className="signup-main">
      <div className="signupContent">
        <div className="signupContent1">
          <div className="signup">
            <div className="signup-text">Sign Up!</div>
            <p className="signupvalidation" style={{ color: "red" }}>
              {errorMessage}
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="name">
                <p>Name</p>
                <div className="input_svg">
                  <input
                    className="name"
                    placeholder="Enter Name"
                    onChange={(e) => setName(e.target.value)}
                    {...register("Name", {
                      required: "Name is required",
                      minLength: {
                        value: 6,
                        message: "Name must be at least 10 characters long",
                      },
                      maxLength: {
                        value: 20,
                        message: "Name cannot exceed 20 characters",
                      },
                    })}
                  />
                  <PermIdentityOutlinedIcon />
                </div>
                {errors.Name && <p className="error">{errors.Name.message}</p>}
              </div>
              <div className="email">
                <p>Email address</p>
                <div className="input_svg">
                  <input
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
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
                <p>Create password</p>
                <div className="input_svg">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create Password"
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
              <RoleSelect
                control={control}
                errors={errors}
                setSelectedRole={setSelectedRole} // Pass setSelectedRole to RoleSelect
              />

              <input
                type="submit"
                style={{ fontWeight: 500, color: "white" }}
                value={"Sign Up"}
                className="signup_btn"
                onClick={handleSubmit(onSubmit)}
              />

              <div className="btLine">
                {" "}
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

export default Signup;