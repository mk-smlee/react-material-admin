import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { auditLog } from '../../core/types';

async function fetchPenaltySalesLogs(penaltySalesId: string): Promise<auditLog[]> {
  return apiService.get<auditLog[]>(`/penalty-sales/${penaltySalesId}/logs`);
}

export function usePenaltySalesLogs(penaltySalesId?: string) {
  return useQuery(
    ['penaltySalesLogs', penaltySalesId],
    () => {
      if (!penaltySalesId) throw new Error('No penaltySalesId provided');
      return fetchPenaltySalesLogs(penaltySalesId);
    },
    {
      enabled: Boolean(penaltySalesId),
    },
  );
}
