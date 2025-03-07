import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import { AgencyDetailItem, CreateAgencyPayload } from '../types/agency';

async function createAgency(data: CreateAgencyPayload): Promise<AgencyDetailItem> {
  return apiService.post<AgencyDetailItem>('/agencies', data);
}

export function useCreateAgency() {
  const queryClient = useQueryClient();
  return useMutation(createAgency, {
    onSuccess: () => {
      queryClient.invalidateQueries('agencies');
    },
  });
}
