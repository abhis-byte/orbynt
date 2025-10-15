import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import './SignIn.css';

export default function SignIn() {
  const handleGoogle = () => signInWithPopup(auth, provider);

  return (
    <div className="signin-container">
      <img src="/logo.png" alt="Orbnyt" className="logo" />
      <h2>SIGN IN</h2>
      <input type="email" placeholder="Email Address" />
      <input type="password" placeholder="Password" />
      <button className="continue-btn">CONTINUE</button>
      <div className="or-divider">OR</div>
      <button className="google-btn" onClick={handleGoogle}>
        <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" />
        Sign in with Google
      </button>
    </div>
  );
}