import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import { SettlementUser } from '../../settlement-users/types/user';

interface UpdateMyProfilePayload {
  name: string;
  password: string;
}

async function updateMyProfile(payload: UpdateMyProfilePayload): Promise<SettlementUser> {
  return apiService.put<SettlementUser>('/settlement-users/me', payload);
}

export function useUpdateMyProfile() {
  const queryClient = useQueryClient();
  return useMutation(updateMyProfile, {
    onSuccess: (updatedUser) => {
      // 캐시('myProfile') 갱신
      queryClient.setQueryData('myProfile', updatedUser);
    },
  });
}
