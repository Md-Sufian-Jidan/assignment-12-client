import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import Skeleton from '../../Skeleton'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation();
  const from = location;

  if (loading) return <Skeleton />;

  if (user) return children;
  return <Navigate to='/login' state={{ from }} replace='true' />
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
};
export default PrivateRoute;