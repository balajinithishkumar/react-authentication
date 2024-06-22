// src/components/ResetPassword.js
import { useState } from "react";
import { auth } from "./firebase"; // Adjust the path as per your project structure
import { sendPasswordResetEmail } from "firebase/auth";
import "./ResetPassword.css"; // Import CSS file for styling

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Check your inbox.");
      setEmail(""); // Clear email input after sending email
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