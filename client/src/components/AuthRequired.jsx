import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

const AuthRequired = ({ allowedRoles }) => {
  const location = useLocation();

  const { roles } = useAuthUser();

  // this some function test if the added function passes the test
  // returns true if that happens; else false
  return roles.some((role) =>
    allowedRoles.includes(role)) ? (
      <Outlet />
    ) : (
      // you are redirected to the login page
      // from page location
      <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default AuthRequired;
