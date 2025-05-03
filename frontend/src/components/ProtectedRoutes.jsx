import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children, requiredRole, currentRole }) => {
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  if (requiredRole && currentRole !== requiredRole) {
    console.log(`Access denied for role: ${currentRole}. Required: ${requiredRole}`);
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default ProtectedRoute;
