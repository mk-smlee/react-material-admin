import { Navigate, Route, RouteProps } from 'react-router';
import { useAuth } from '../../auth/contexts/AuthContext';

type PrivateRouteProps = {
  requiredRole?: number;
} & RouteProps;

const PrivateRoute = ({
  children,
  requiredRole,
  ...routeProps
}: PrivateRouteProps) => {
  const { user } = useAuth();

  if (user) {
    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to={`/403`} />;
    }
    return <Route {...routeProps} />;
  } else {
    return <Navigate to={`/login`} />;
  }
};

export default PrivateRoute;
