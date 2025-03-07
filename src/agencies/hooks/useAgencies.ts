import { useQuery } from 'react-query';
import { AgencyListItem } from '../types/agency';
import { apiService } from '../../api';

async function fetchAgencies(): Promise<AgencyListItem[]> {
  return apiService.get<AgencyListItem[]>('/agencies'); 
}

export function useAgencies() {
  return useQuery('agencies', fetchAgencies);
}
