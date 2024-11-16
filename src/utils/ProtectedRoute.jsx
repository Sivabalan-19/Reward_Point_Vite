import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Authcontext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Display a spinner or loader
  }

  if (!isAuthenticated || parseInt(userRole) !== requiredRole) {
    return <Navigate to="/" />; // Redirect to login if not authenticated or role mismatch
  }

  return children;
};

export default ProtectedRoute;
