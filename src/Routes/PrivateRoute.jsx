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
    // if (loading) return <div className="w-16 h-16 border-4 border-dashed border-red-800 rounded-full animate-spin border-default-600 flex justify-center"></div>

    return <Navigate to="/sign-up" state={{ from: location }} replace />
};

PrivateRoute.propTypes = {
    children: PropTypes.object
}
export default PrivateRoute;