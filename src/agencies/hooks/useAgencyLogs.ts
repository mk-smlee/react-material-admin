import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { auditLog } from '../../core/types';

async function fetchAgencyLogs(agencyId: string): Promise<auditLog[]> {
  return apiService.get<auditLog[]>(`/agencies/${agencyId}/logs`);
}

export function useAgencyLogs(agencyId?: string) {
  return useQuery(
    ['agencyLogs', agencyId],
    () => {
      if (!agencyId) throw new Error('No agencyId provided');
      return fetchAgencyLogs(agencyId);
    },
    { enabled: !!agencyId },
  );
}
