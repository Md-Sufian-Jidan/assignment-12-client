import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from 'prop-types'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (user) {
        return children
    }
    if (loading) return <span className="loading loading-bars w-full h-full flex justify-center"></span>

    return <Navigate to="/sign-up" state={{ from: location }} replace />
};

PrivateRoute.propTypes = {
    children: PropTypes.object
}
export default PrivateRoute;