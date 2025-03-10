import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import {
  UpdatePenaltySalesPayload,
  PenaltySales,
} from '../types/penalty-sales';

async function updatePenaltySales(
  penaltySalesId: string,
  payload: UpdatePenaltySalesPayload,
): Promise<PenaltySales> {
  return apiService.put<PenaltySales>(
    `/penalty-sales/${penaltySalesId}`,
    payload,
  );
}

export function useUpdatePenaltySales(penaltySalesId: string) {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: UpdatePenaltySalesPayload) =>
      updatePenaltySales(penaltySalesId, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('penaltySales');
        queryClient.invalidateQueries(['penaltySalesById', penaltySalesId]);
      },
    },
  );
}
