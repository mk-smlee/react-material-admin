import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { auditLog } from '../../core/types';

async function fetchMerchantLogs(merchantId: string): Promise<auditLog[]> {
  return apiService.get<auditLog[]>(`/merchants/${merchantId}/logs`);
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
