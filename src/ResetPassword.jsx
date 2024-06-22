// src/components/ResetPassword.js
import { useState } from 'react';
import { auth } from './firebase'; // Adjust the path as per your project structure
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Check your inbox.');
      setEmail(''); // Clear email input after sending email
    } catch (error) {
      console.error('Error sending reset email:', error);
      alert('Error sending reset email');
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;