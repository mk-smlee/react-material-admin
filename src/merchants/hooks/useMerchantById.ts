import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { MerchantDetailItem } from '../types/merchant';

async function fetchMerchantById(merchantId: string): Promise<MerchantDetailItem> {
  return apiService.get<MerchantDetailItem>(`/merchants/${merchantId}`);
}

export function useMerchantById(merchantId?: string) {
  return useQuery(
    ['merchantById', merchantId],
    () => {
      if (!merchantId) throw new Error('No merchantId provided');
      return fetchMerchantById(merchantId);
    },
    { enabled: !!merchantId },
  );
}
