import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import { SettlementUser, UpdateUserPayload } from '../types/user';

async function updateUser(
  userId: string,
  payload: UpdateUserPayload,
): Promise<SettlementUser> {
  return apiService.put<SettlementUser>(`/settlement-users/${userId}`, payload);
}

export function useUpdateUser(userId: string) {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: UpdateUserPayload) => updateUser(userId, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        queryClient.invalidateQueries(['userById', userId]);
      },
    },
  );
}
