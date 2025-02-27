import { useQuery } from 'react-query';
import api from '../../api';

const fetchDistinctMonths = async (
  pgCompanyId: string,
): Promise<string[]> => {
  const { data } = await api.get(
    `/raw-settlement-files/distinct-months/${pgCompanyId}`,
  );
  return data;
};

export const useDistinctMonths = (pgCompanyId: string) => {
  return useQuery(['distinctMonths', pgCompanyId], () =>
    fetchDistinctMonths(pgCompanyId),
  );
};
