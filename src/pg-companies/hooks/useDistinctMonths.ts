import { useQuery } from 'react-query';
import { apiService } from '../../api';

const fetchDistinctMonths = async (
  pgCompanyId: string,
): Promise<string[]> => {
  const data = await apiService.get<string[]>(
    `/raw-settlement-files/distinct-months/${pgCompanyId}`,
  );
  return data;
};

export const useDistinctMonths = (pgCompanyId: string) => {
  return useQuery(['distinctMonths', pgCompanyId], () =>
    fetchDistinctMonths(pgCompanyId),
  );
};
