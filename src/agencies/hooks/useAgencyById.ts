import { useQuery } from 'react-query';
import { AgencyDetailItem } from '../types/agency';
import { apiService } from '../../api';

async function fetchAgencyById(id: string): Promise<AgencyDetailItem> {
  return apiService.get<AgencyDetailItem>(`/agencies/${id}`);
}

export function useAgencyById(id?: string) {
  return useQuery(
    ['agencyById', id],
    () => {
      if (!id) throw new Error('No agencyId provided');
      return fetchAgencyById(id);
    },
    { enabled: !!id },
  );
}
