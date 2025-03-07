import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { ContractListItem } from '../types/contract';

const fetchContracts = async (): Promise<ContractListItem[]> => {
  // 백엔드 GET /contracts 호출
  const data = await apiService.get<ContractListItem[]>('/contracts');
  return data;
};

export function useContracts() {
  return useQuery('contracts', fetchContracts);
}
