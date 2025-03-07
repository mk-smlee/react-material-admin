import { apiService } from '../../api';
import { useQuery } from 'react-query';
import { AgencyDropdownItem } from '../types/agency';

async function fetchAgenciesForDropdown(): Promise<AgencyDropdownItem[]> {
  return apiService.get<AgencyDropdownItem[]>('/agencies/dropdown');
}

export function useAgenciesForDropdown() {
  return useQuery('agenciesForDropdown', fetchAgenciesForDropdown);
}
