import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { ContractDetailItem } from '../types/contract';

const fetchContractById = async (id: string): Promise<ContractDetailItem> => {
  // 백엔드 GET /contracts/:id 호출
  const data = await apiService.get<ContractDetailItem>(`/contracts/${id}`);
  return data;
};

export function useContractById(id?: string) {
  return useQuery(
    ['contract', id],
    () => {
      if (!id) throw new Error('Contract ID is required');
      return fetchContractById(id);
    },
    {
      enabled: Boolean(id), // id가 있어야 API 호출
    },
  );
}
