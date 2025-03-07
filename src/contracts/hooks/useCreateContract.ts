import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import { ContractDetailItem, CreateContractPayload } from '../types/contract';


async function createContract(payload: CreateContractPayload) {
  return apiService.post<ContractDetailItem>('/contracts', payload);
}

export function useCreateContract() {
  const queryClient = useQueryClient();

  return useMutation(createContract, {
    onSuccess: () => {
      queryClient.invalidateQueries('contracts');
    },
  });
}
