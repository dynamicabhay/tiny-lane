// src/components/AuthManager.tsx

import React, { useState, useEffect } from 'react';
import {
  User, // Type for Firebase User object
  onAuthStateChanged, // Listener for auth state changes
  createUserWithEmailAndPassword, // For signing up
  signInWithEmailAndPassword, // For signing in
  signOut // For signing out
} from 'firebase/auth';
import { auth } from '../firebase'; // Adjust this path if your firebase.ts is elsewhere

const AuthManager: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // To show loading state

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Auth state determined, stop loading
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignUp = async () => {
    setError(null); // Clear previous errors
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User state will be updated by onAuthStateChanged listener
      setEmail('');
      setPassword('');
      console.log('User signed up successfully!');
    } catch (err: any) {
      console.error("Sign up error:", err.message);
      setError(err.message);
    }
  };

  const handleSignIn = async () => {
    setError(null); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User state will be updated by onAuthStateChanged listener
      setEmail('');
      setPassword('');
      console.log('User signed in successfully!');
    } catch (err: any) {
      console.error("Sign in error:", err.message);
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    setError(null); // Clear previous errors
    try {
      await signOut(auth);
      // User state will be updated by onAuthStateChanged listener (to null)
      console.log('User signed out successfully!');
    } catch (err: any) {
      console.error("Sign out error:", err.message);
      setError(err.message);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>Loading authentication status...</div>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '400px', margin: '20px auto', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>Firebase Authentication</h2>

      {user ? (
        // User is logged in
        <div>
          <p>Welcome, {user.email || 'User'}!</p>
          <p>User ID: {user.uid}</p>
          <button onClick={handleSignOut} style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>
      ) : (
        // User is not logged in
        <div>
          {error && <p style={{ color: 'red', marginBottom: '15px' }}>Error: {error}</p>}
          <div style={{ marginBottom: '15px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={handleSignUp} style={{ flex: 1, padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
              Sign Up
            </button>
            <button onClick={handleSignIn} style={{ flex: 1, padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthManager;
