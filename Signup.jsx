import React, { useState } from 'react';
import { auth, db } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Reference to the user's document in Firestore
      const userDocRef = doc(db, "users", user.uid);
      
      // Check if the document already exists
      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot.exists());  
      if (!userSnapshot.exists()) {
        // If the document doesn't exist, create it
        const { displayName, email } = user;
        const createdAt = new Date();

        try {
          await setDoc(userDocRef, {
            displayName: displayName || firstName + " " + lastName,
            email,
            createdAt,
          });
        } catch (error) {
          console.log('Error in creating user document: ', error.message);  // Error handling
        }
      }
      
      navigate('/home');  // Redirect after successful registration
    } catch (err) {
      setError("Error creating account: " + err.message);  // Display error to the user
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="signup-error">{error}</p>}
      <form className="signup-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Signup;
