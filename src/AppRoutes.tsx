import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './core/components/PrivateRoute';
import { useAuth } from './auth/contexts/AuthContext';
import { apiService } from './api';
import { AuthUser } from './auth/types/auth';
import Loader from './core/components/Loader';
// Admin
const Admin = lazy(() => import('./admin/pages/Admin'));
const ProfileDetail = lazy(() => import('./admin/pages/ProfileDetail'));

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
const AgencyCommission = lazy(
  () => import('./settlements/pages/AgencyCommission'),
);
const PenaltySales = lazy(() => import('./settlements/pages/PenaltySales'));
const PenaltyDevice = lazy(() => import('./settlements/pages/PenaltyDevice'));

// Contracts
const Contracts = lazy(() => import('./contracts/pages/Contracts'));
const ContractDetail = lazy(() => import('./contracts/pages/ContractDetail'));
const ContractCreatePage = lazy(
  () => import('./contracts/pages/ContractCreatePage'),
);
const ContractEditPage = lazy(
  () => import('./contracts/pages/ContractEditPage'),
);

// Merchants
const Merchants = lazy(() => import('./merchants/pages/Merchants'));
const MerchantDetail = lazy(() => import('./merchants/pages/MerchantDetail'));
const MerchantCreatePage = lazy(
  () => import('./merchants/pages/MerchantCreatePage'),
);
const MerchantEditPage = lazy(
  () => import('./merchants/pages/MerchantEditPage'),
);

// Agencies
const Agencies = lazy(() => import('./agencies/pages/Agencies'));
const AgencyDetail = lazy(() => import('./agencies/pages/AgencyDetail'));
const AgencyCreatePage = lazy(
  () => import('./agencies/pages/AgencyCreatePage'),
);
const AgencyEditPage = lazy(() => import('./agencies/pages/AgencyEditPage'));

// Users
const UserManagement = lazy(() => import('./settlement-users/pages/Users'));
const UserDetail = lazy(
  () => import('./settlement-users/pages/UserDetailPage'),
);
const UserCreatePage = lazy(
  () => import('./settlement-users/pages/UserCreatePage'),
);
const UserEditPage = lazy(
  () => import('./settlement-users/pages/UserEditPage'),
);

const AppRoutes = () => {
  const { user, setAuthData, authInitialized } = useAuth();

  useEffect(() => {
    if (!authInitialized) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        apiService.setAuthToken(token);
        apiService.get<AuthUser>('/settlement-users/me').then(
          (userInfo) => {
            setAuthData(token, userInfo);
          },
          () => {
            setAuthData(); // 실패 시 토큰 제거
          },
        );
      } else {
        setAuthData();
      }
    }
  }, [authInitialized, setAuthData]);

  if (!authInitialized) {
    return <Loader />;
  }

  const isAuthenticated = Boolean(user);

  const RedirectToAdmin = () => {
    return isAuthenticated ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<RedirectToAdmin />} />
      <PrivateRoute path="admin" element={<Admin />}>
        <PrivateRoute path="/" element={<PgCompanies />} />

        <PrivateRoute path="profile" element={<ProfileDetail />} />

        <PrivateRoute path="pg-companies" element={<PgCompanies />} />
        <PrivateRoute path="pg-companies/:id" element={<PgCompaniesDetail />} />
        <PrivateRoute
          path="pg-companies/:id/monthly-settlement/:month"
          element={<PgMonthlySettlement />}
        />
        <PrivateRoute path="settlements" element={<Settlements />}>
          <PrivateRoute path="/" element={<AgencyCommission />} />
          <PrivateRoute path="/penalty/sales" element={<PenaltySales />} />
          <PrivateRoute path="/penalty/device" element={<PenaltyDevice />} />
        </PrivateRoute>

        <PrivateRoute path="contracts" element={<Contracts />} />
        <PrivateRoute path="contracts/:id" element={<ContractDetail />} />
        <PrivateRoute
          path="contracts/create"
          element={<ContractCreatePage />}
        />
        <PrivateRoute
          path="contracts/:id/edit"
          element={<ContractEditPage />}
        />

        <PrivateRoute path="merchants" element={<Merchants />} />
        <PrivateRoute
          path="merchants/create"
          element={<MerchantCreatePage />}
        />
        <PrivateRoute path="merchants/:id" element={<MerchantDetail />} />
        <PrivateRoute
          path="merchants/:id/edit"
          element={<MerchantEditPage />}
        />

        <PrivateRoute path="agencies" element={<Agencies />} />
        <PrivateRoute path="agencies/:id" element={<AgencyDetail />} />
        <PrivateRoute path="agencies/create" element={<AgencyCreatePage />} />
        <PrivateRoute path="agencies/:id/edit" element={<AgencyEditPage />} />

        <PrivateRoute
          path="users"
          element={<UserManagement />}
          requiredRole={1}
        />
        <PrivateRoute
          path="users/:id"
          element={<UserDetail />}
          requiredRole={1}
        />
        <PrivateRoute
          path="users/create"
          element={<UserCreatePage />}
          requiredRole={1}
        />
        <PrivateRoute
          path="users/:id/edit"
          element={<UserEditPage />}
          requiredRole={1}
        />
      </PrivateRoute>
      <Route path="login" element={<Login />} />
      <Route path="403" element={<Forbidden />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
