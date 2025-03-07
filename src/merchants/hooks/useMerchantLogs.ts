import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { MerchantAuditLog } from '../types/merchant';

async function fetchMerchantLogs(
  merchantId: string,
): Promise<MerchantAuditLog[]> {
  return apiService.get<MerchantAuditLog[]>(`/merchants/${merchantId}/logs`);
}

export function useMerchantLogs(merchantId?: string) {
  return useQuery(
    ['merchantLogs', merchantId],
    () => {
      if (!merchantId) throw new Error('No merchantId provided');
      return fetchMerchantLogs(merchantId);
    },
    { enabled: !!merchantId },
  );
}
