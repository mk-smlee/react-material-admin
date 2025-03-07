import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { ContractAuditLog } from '../../contracts/types/contract'; // 이미 AuditLog가 공통으로 있으므로 재사용

async function fetchAgencyLogs(agencyId: string): Promise<ContractAuditLog[]> {
  return apiService.get<ContractAuditLog[]>(`/agencies/${agencyId}/logs`);
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
