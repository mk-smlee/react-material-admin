import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import { AuthUser } from '../types/auth';

async function updateProfile(payload: { name?: string; password?: string }): Promise<AuthUser> {
  return apiService.put<AuthUser>('/settlement-users/me', payload);
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation(updateProfile, {
    onSuccess: (updatedUser) => {
      // 캐시된 me 쿼리를 무효화하여 최신 user정보 재조회
      queryClient.invalidateQueries('me');
    },
  });
}
