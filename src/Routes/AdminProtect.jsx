import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminProtect = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) return <span className="loading loading-bars w-20 flex justify-center text-success min-h-screen mx-auto"></span>;

    if (user && isAdmin) return children;

    return <Navigate to='/' state={{ from: location }} replace />
};
AdminProtect.propTypes = {
    children: PropTypes.object
}
export default AdminProtect;