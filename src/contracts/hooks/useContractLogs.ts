import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { auditLog } from '../../core/types';

async function fetchContractLogs(contractId: string): Promise<auditLog[]> {
  return apiService.get<auditLog[]>(`/contracts/${contractId}/logs`);
}

export function useContractLogs(contractId?: string) {
  return useQuery(
    ['contractLogs', contractId],
    () => {
      if (!contractId) throw new Error('No contractId provided');
      return fetchContractLogs(contractId);
    },
    {
      enabled: Boolean(contractId),
    },
  );
}
