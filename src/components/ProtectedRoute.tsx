// src/components/ProtectedRoute.tsx

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust path if needed
import { useAuth } from '@/auth/AuthProvider';
import AuthLoader from './ui/auth-loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  

    const {user,loading} = useAuth();
  

  if (loading) {
    return <AuthLoader/>
}
  // If user is null (not logged in), redirect to the /auth page
  if (!user) {
    return <Navigate to="/SignIn" replace />;
  }

  // If user is logged in, render the child components (the protected content)
  return <>{children}</>;
};

export default ProtectedRoute;
