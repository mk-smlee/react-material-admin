import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import { CreateUserPayload, SettlementUser } from '../types/user';

async function createUser(payload: CreateUserPayload): Promise<SettlementUser> {
  return apiService.post<SettlementUser>('/settlement-users', payload);
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
}
