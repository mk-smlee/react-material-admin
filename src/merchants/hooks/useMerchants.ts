import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { MerchantListItem } from '../types/merchant';

async function fetchMerchants(): Promise<MerchantListItem[]> {
  // 백엔드에서 GET /merchants
  return apiService.get<MerchantListItem[]>('/merchants');
}

export function useMerchants() {
  return useQuery('merchants', fetchMerchants);
}
