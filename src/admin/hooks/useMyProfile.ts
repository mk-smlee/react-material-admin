import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { SettlementUser } from '../../settlement-users/types/user';

async function fetchMyProfile(): Promise<SettlementUser> {
  return apiService.get<SettlementUser>('/settlement-users/me');
}

export function useMyProfile() {
  return useQuery('myProfile', fetchMyProfile);
}
