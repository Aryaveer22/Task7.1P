import React from 'react';
import './App.css';
import './Login.css'; 
import { signInWithGooglePopup } from './FirebaseConfig';  

const Login = () => {

  const logGoogleUser = async () => {
    try {
      const response = await signInWithGooglePopup();
      console.log(response); 
    } catch (error) {
      console.error("Google Sign-In Error", error); // Handle errors
    }
  };

  return (
    <div className="login-container">
      <h2>Login with Google</h2>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
};

export default Login;
