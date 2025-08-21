// src/pages/AuthPage.tsx
import React from 'react';
import AuthManager from '../components/AuthManager'; // Adjust path if needed

const AuthPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <h1 style={{ color: '#333' }}>Welcome! Please Sign In or Sign Up</h1>
      <AuthManager />
    </div>
  );
};

export default AuthPage;
