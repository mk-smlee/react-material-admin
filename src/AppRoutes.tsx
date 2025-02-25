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
const PgCompanies = lazy(() => import('./pg-companies/pages/PgCompanies'));
const PgCompaniesDetail = lazy(
  () => import('./pg-companies/pages/PgCompanyDetail'),
);
const PgMonthlySettlement = lazy(
  () => import('./pg-companies/pages/PgMonthlySettlement'),
);

// Settlements
const Settlements = lazy(() => import('./settlements/pages/Settlements'));
const AgencySettlements = lazy(() => import('./settlements/pages/AgencySettlements'));
const PenaltySales = lazy(() => import('./settlements/pages/PenaltySales'));
const PenaltyDevice = lazy(() => import('./settlements/pages/PenaltyDevice'));

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
        <PrivateRoute path="/" element={<PgCompanies />} />
        <PrivateRoute path="pg-companies" element={<PgCompanies />} />
        <PrivateRoute path="pg-companies/:id" element={<PgCompaniesDetail />} />
        <PrivateRoute
          path="pg-companies/:id/monthly-settlement/:month"
          element={<PgMonthlySettlement />}
        />
        <PrivateRoute path="settlements" element={<Settlements />}>
          <PrivateRoute path="/" element={<AgencySettlements />} />
          <PrivateRoute path="/penalty/sales" element={<PenaltySales />} />
          <PrivateRoute path="/penalty/device" element={<PenaltyDevice />} />
        </PrivateRoute>
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
