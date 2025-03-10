import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import {
  CreatePenaltySalesPayload,
  PenaltySales,
} from '../types/penalty-sales';

async function createPenaltySales(
  payload: CreatePenaltySalesPayload,
): Promise<PenaltySales> {
  return apiService.post<PenaltySales>('/penalty-sales', payload);
}

export function useCreatePenaltySales() {
  const queryClient = useQueryClient();

  return useMutation(createPenaltySales, {
    onSuccess: () => {
      queryClient.invalidateQueries('penaltySales');
    },
  });
}
