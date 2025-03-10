import { apiService } from '../../api';
import { useQuery } from 'react-query';
import { ContractDropdownItem } from '../types/contract';

async function fetchContractsForDropdown(): Promise<ContractDropdownItem[]> {
  return apiService.get<ContractDropdownItem[]>('/contracts/dropdown');
}

export function useContractsForDropdown() {
  return useQuery('contractsForDropdown', fetchContractsForDropdown);
}