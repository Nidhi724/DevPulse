import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If initial authentication checking is active, display the premium spinner page
  if (loading) {
    return <Loading fullScreen={true} message="Authenticating DevPulse session..." />;
  }

  // Redirect to sign-in page if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
