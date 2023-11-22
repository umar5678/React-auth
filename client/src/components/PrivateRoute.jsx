import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currUser } = useSelector((state) => state.user);
  return currUser ? <Outlet /> : <Navigate to="/log-in" />;
};

export default PrivateRoute;
