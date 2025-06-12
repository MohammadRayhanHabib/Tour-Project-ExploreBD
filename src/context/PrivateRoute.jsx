import { useContext } from "react";

import { Navigate } from "react-router";
import { AuthContext } from "./AuthContext";
import Loading from "../components/Loading";


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