import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children, requiredRole, currentRole }) => {
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole) {
    const isAllowed = Array.isArray(requiredRole)
      ? requiredRole.includes(currentRole)
      : currentRole === requiredRole;

    if (!isAllowed) {
      console.log(`Access denied for role: ${currentRole}. Required: ${Array.isArray(requiredRole) ? requiredRole.join(',') : requiredRole}`);
      return <Navigate to="/home" replace />; // Or a dedicated "Access Denied" page
    }
  }

  return children;
};

export default ProtectedRoute;
