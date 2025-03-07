import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import { AgencyDetailItem, UpdateAgencyPayload } from '../types/agency';

async function updateAgency(agencyId: string, payload: UpdateAgencyPayload): Promise<AgencyDetailItem> {
  return apiService.put<AgencyDetailItem>(`/agencies/${agencyId}`, payload);
}

export function useUpdateAgency(agencyId: string) {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: UpdateAgencyPayload) => updateAgency(agencyId, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('agencies');
        queryClient.invalidateQueries(['agencyById', agencyId]);
      },
    },
  );
}
