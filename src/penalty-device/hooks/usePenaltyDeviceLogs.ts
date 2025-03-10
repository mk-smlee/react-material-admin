import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { auditLog } from '../../core/types';

async function fetchPenaltyDeviceLogs(penaltyDeviceId: string): Promise<auditLog[]> {
  return apiService.get<auditLog[]>(`/penalty-device/${penaltyDeviceId}/logs`);
}

export function usePenaltyDeviceLogs(penaltyDeviceId?: string) {
  return useQuery(
    ['penaltyDeviceLogs', penaltyDeviceId],
    () => {
      if (!penaltyDeviceId) throw new Error('No penaltyDeviceId provided');
      return fetchPenaltyDeviceLogs(penaltyDeviceId);
    },
    {
      enabled: Boolean(penaltyDeviceId),
    },
  );
}
