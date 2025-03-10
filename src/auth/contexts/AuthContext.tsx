import React, { createContext, useContext, useState } from 'react';
import { AuthState, AuthUser } from '../types/auth';
import { apiService } from '../../api';

/**
 * Context에 담길 값 타입
 */
interface AuthContextValue extends AuthState {
  setAuthData: (token?: string, user?: AuthUser) => void;
  logout: () => void;
}

/**
 * Context 생성
 */
const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Provider 컴포넌트
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // AuthState 기본값
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: undefined,
    user: undefined,
    authInitialized: false,
  });

  /**
   * 토큰 세팅 + 상태 갱신
   */
  const setAuthData = async (token?: string, user?: AuthUser) => {
    if (token) {
      setAuthState({
        accessToken: token,
        user,
        authInitialized: true,
      });
    } else {
      localStorage.removeItem('accessToken');
      apiService.setAuthToken(undefined);
      setAuthState({
        accessToken: undefined,
        user: undefined,
        authInitialized: true,
      });
    }
  };

  /**
   * 로그아웃
   */
  const logout = () => {
    setAuthData(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setAuthData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Context 접근용 훅
 * (다른 Context처럼 한 파일 안에서 useContext도 export)
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext가 없습니다. <AuthProvider>로 감싸주세요.');
  }
  return context;
};
