import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { SettlementUser } from '../types/user';

async function fetchUsers(): Promise<SettlementUser[]> {
  return await apiService.get('/settlement-users');
}

export function useUsers() {
  return useQuery('users', fetchUsers);
}
