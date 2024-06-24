import { useState } from "react";
import { auth } from "../firebase"; 
import { sendPasswordResetEmail } from "firebase/auth";
import "../Styles/ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Check your inbox.");
      setEmail(""); 
    } catch (error) {
      console.error("Error sending reset email:", error);
      alert("Error sending reset email");
    }
  };
  return (
    <div className="reset_password_wrapper">
      <div className="reset-password-container">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleResetPassword} className="reset-password-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="reset-password-input"
          />
          <button type="submit" className="reset-password-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;