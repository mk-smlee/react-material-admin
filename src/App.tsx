import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './auth/contexts/AuthContext';
import Loader from './core/components/Loader';
import QueryWrapper from './core/components/QueryWrapper';
import SettingsProvider from './core/contexts/SettingsProvider';
import SnackbarProvider from './core/contexts/SnackbarProvider';
import {
  useErrorModal,
  ErrorModalProvider,
} from './core/contexts/ErrorModalContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true,
    },
  },
});

function ErrorHandler() {
  const { showError } = useErrorModal();

  React.useEffect(() => {
    // 전역 에러 핸들러 설정
    const handleGlobalError = (error: any) => {
      if (!error.handled) {
        showError(error.message || '알 수 없는 오류가 발생했습니다.');
      }
    };

    // QueryClient 재설정
    queryClient.setDefaultOptions({
      queries: {
        ...queryClient.getDefaultOptions().queries,
        onError: handleGlobalError,
      },
      mutations: {
        ...queryClient.getDefaultOptions().mutations,
        onError: handleGlobalError,
      },
    });
  }, [showError]);

  return null;
}

function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <ErrorModalProvider>
            <ErrorHandler />
            <QueryWrapper>
              <SnackbarProvider>
                <AuthProvider>
                  <AppRoutes />
                </AuthProvider>
              </SnackbarProvider>
            </QueryWrapper>
          </ErrorModalProvider>
        </SettingsProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </React.Suspense>
  );
}

export default App;
