import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" replace />;
  }

  return children; // ✅ render the actual children
};

export default ProtectedRoute;
