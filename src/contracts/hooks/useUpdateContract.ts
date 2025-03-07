import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import { ContractDetailItem, UpdateContractPayload } from '../types/contract';

async function updateContract(contractId: string, payload: UpdateContractPayload) {
  return apiService.put<ContractDetailItem>(`/contracts/${contractId}`, payload);
}

export function useUpdateContract(contractId: string) {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: UpdateContractPayload) => updateContract(contractId, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contracts');
        queryClient.invalidateQueries(['contract', contractId]);
      },
    },
  );
}
