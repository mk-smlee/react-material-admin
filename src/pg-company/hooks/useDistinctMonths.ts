import axios from 'axios';
import { useQuery } from 'react-query';

const fetchDistinctMonths = async (
  pgCompanyId: string,
): Promise<string[]> => {
  const { data } = await axios.get(
    `http://localhost:8080/v1/raw-settlement-files/distinct-months/${pgCompanyId}`,
  );
  return data;
};

export const useDistinctMonths = (pgCompanyId: string) => {
  return useQuery(['distinctMonths', pgCompanyId], () =>
    fetchDistinctMonths(pgCompanyId),
  );
};
