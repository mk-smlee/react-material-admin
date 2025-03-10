import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { AuthUser } from '../types/auth';

async function fetchMe(): Promise<AuthUser> {
  return apiService.get<AuthUser>('/settlement-users/me');
}

/**
 * 내 정보(me) 가져오는 useQuery 훅
 */
export function useFetchMe() {
  return useQuery('me', fetchMe);
}
