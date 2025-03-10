import { useMutation } from 'react-query';
import { apiService } from '../../api';
import { AuthUser } from '../types/auth';
import { useAuth } from '../contexts/AuthContext';
interface LoginPayload {
  email: string;
  password: string;
}

// 실제 로그인 API 요청
async function loginRequest(
  payload: LoginPayload,
): Promise<{ accessToken: string }> {
  return apiService.post('/auth/login', payload);
}

export function useLogin() {
  const { setAuthData } = useAuth();
  return useMutation(loginRequest, {
    onSuccess: ({ accessToken }) => {
      localStorage.setItem('accessToken', accessToken);
      apiService.setAuthToken(accessToken);
      apiService.get<AuthUser>('/settlement-users/me').then(
        (userInfo) => {
          setAuthData(accessToken, userInfo);
        },
        () => {
          setAuthData();
        },
      );
    },
  });
}
