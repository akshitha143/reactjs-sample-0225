import { Navigate, useLocation, Outlet } from "react-router-dom";

export function PrivateRoute() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("User in PrivateRoute:", user);
  if(user=== null ) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <Outlet />;

}