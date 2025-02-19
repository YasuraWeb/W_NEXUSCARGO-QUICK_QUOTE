import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isDataFilled, redirectPath = "/" }) => {
  if (!isDataFilled) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
