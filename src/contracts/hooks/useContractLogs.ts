import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { ContractAuditLog } from '../types/contract';

async function fetchContractLogs(
  contractId: string,
): Promise<ContractAuditLog[]> {
  return apiService.get<ContractAuditLog[]>(`/contracts/${contractId}/logs`);
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
