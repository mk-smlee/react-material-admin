import { Navigate, Route, RouteProps } from "react-router";
import { useAuth } from "../../auth/contexts/AuthProvider";

type PrivateRouteProps = {
  roles?: string[];
} & RouteProps;

const PrivateRoute = ({
  children,
  roles,
  ...routeProps
}: PrivateRouteProps) => {
  const { userInfo } = useAuth();

  if (userInfo) {
    return <Route {...routeProps} />;
  } else {
    return <Navigate to={`/login`} />;
  }
};

export default PrivateRoute;
