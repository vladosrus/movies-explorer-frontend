import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, redirectTo, loggedIn }) {
  return loggedIn ? children : <Navigate to={redirectTo} />;
}
