import { useQuery } from 'react-query';
import { PgCompany } from '../types/pgCompany';
import { apiService } from '../../api';

const fetchPgCompanies = async (): Promise<PgCompany[]> => {
  const data = await apiService.get<PgCompany[]>('/pg-companies');
  return data;
};

export function usePgCompanies() {
  return useQuery('pgCompanies', () => fetchPgCompanies());
}
