import { useContext } from "react";

import { Navigate } from "react-router";
import Loading from "./Loading";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    // const location = useLocation();

    if (loading) {
        return <Loading></Loading>;// Or a spinner
    }

    if (user) {
        return children;
    }
    // <Navigate to="/login" state={{ from: location }} replace />
    return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;