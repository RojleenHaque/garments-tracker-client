import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;