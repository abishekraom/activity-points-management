import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { getData } from '../context/userContext.jsx';

const ProtectedRoute = ({ requiredRole }) => {
  const { user, loading } = getData();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const isAuthorized = Array.isArray(requiredRole) 
      ? requiredRole.includes(user.role) 
      : user.role === requiredRole;

    if (!isAuthorized) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;