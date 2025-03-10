import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { PenaltySales } from '../types/penalty-sales';

const fetchPenaltySales = async (): Promise<PenaltySales[]> => {
  const data = await apiService.get<PenaltySales[]>('/penalty-sales');
  return data;
};

export function usePenaltySales() {
  return useQuery('penaltySales', () => fetchPenaltySales());
}
