import { Navigate, useNavigate } from "react-router-dom";
import { hasRole } from "../../utils/auth";

const ProtectedRoutes = ({children,allowedRoles}) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token || !userRole) {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    return <Navigate to='/' replace/>;
  }
  if(!hasRole(token,allowedRoles)){
    return <Navigate to='/' replace/>;
  }
  return children
};

export default ProtectedRoutes