import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Assuming you have an AuthContext

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <span className="loading-spinner"></span>; // Requirement: Loading spinner [cite: 229]
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;