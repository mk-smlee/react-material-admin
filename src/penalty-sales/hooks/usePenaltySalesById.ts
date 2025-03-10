import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { PenaltySales } from '../types/penalty-sales';

async function fetchPenaltySalesById(
  penaltySalesId: string,
): Promise<PenaltySales> {
  return apiService.get<PenaltySales>(`/penalty-sales/${penaltySalesId}`);
}

export function usePenaltySalesById(penaltySalesId: string) {
  return useQuery(['penaltySalesById', penaltySalesId], () =>
    fetchPenaltySalesById(penaltySalesId),
  );
}
