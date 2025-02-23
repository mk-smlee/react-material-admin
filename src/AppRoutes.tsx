import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './core/components/PrivateRoute';
import { useAuth } from './auth/contexts/AuthProvider';

// Admin
const Admin = lazy(() => import('./admin/pages/Admin'));
const Profile = lazy(() => import('./admin/pages/Profile'));
const ProfileInformation = lazy(
  () => import('./admin/pages/ProfileInformation'),
);

// Auth
const Login = lazy(() => import('./auth/pages/Login'));

// Core
const Forbidden = lazy(() => import('./core/pages/Forbidden'));
const NotFound = lazy(() => import('./core/pages/NotFound'));

// PgCompanies
const PgCompany = lazy(() => import('./pg-company/pages/PgCompany'));
const PgCompanyDetail = lazy(
  () => import('./pg-company/pages/PgCompanyDetail'),
);
const MonthlySettlement = lazy(
  // TODO: GPT가 구현해줄 페이지
  () => import('./pg-company/pages/MonthlySettlement'),
);

// Users
const UserManagement = lazy(() => import('./users/pages/UserManagement'));

const RedirectToAdmin = () => {
  const { userInfo } = useAuth();
  const isAuthenticated = Boolean(userInfo);
  return isAuthenticated ? <Navigate to="/admin" replace /> : <Login />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RedirectToAdmin />} />
      <PrivateRoute path="admin" element={<Admin />}>
        <PrivateRoute path="/" element={<PgCompany />} />
        <PrivateRoute path="pg-company" element={<PgCompany />} />
        <PrivateRoute path="pg-company/:id" element={<PgCompanyDetail />} />
        <PrivateRoute
          path="pg-company/:id/monthly-settlement/:month"
          element={<MonthlySettlement />}
        />
        <PrivateRoute path="profile" element={<Profile />}>
          <PrivateRoute path="/" element={<ProfileInformation />} />
        </PrivateRoute>
        <PrivateRoute path="user-management" element={<UserManagement />} />
      </PrivateRoute>
      <Route path="login" element={<Login />} />
      <Route path="403" element={<Forbidden />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
