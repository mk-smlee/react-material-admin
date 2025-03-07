import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { MerchantsForDropdownItem } from '../types/merchant';

async function fetchMerchantsForDropdown(): Promise<MerchantsForDropdownItem[]> {
  // 백엔드에서 GET /merchants
  return apiService.get<MerchantsForDropdownItem[]>('/merchants/dropdown');
}

export function useMerchantsForDropdown() {
  return useQuery('merchantsForDropdown', fetchMerchantsForDropdown);
}
