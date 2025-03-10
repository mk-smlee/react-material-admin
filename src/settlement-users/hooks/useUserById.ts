import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { SettlementUser } from '../types/user';

async function fetchUserById(userId: string): Promise<SettlementUser> {
  return apiService.get<SettlementUser>(`/settlement-users/${userId}`);
}

export function useUserById(userId?: string) {
  return useQuery(
    ['userById', userId],
    () => {
      if (!userId) throw new Error('No userId provided');
      return fetchUserById(userId);
    },
    { enabled: !!userId },
  );
}
