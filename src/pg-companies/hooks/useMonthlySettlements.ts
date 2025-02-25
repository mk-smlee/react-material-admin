import axios from 'axios';
import { useQuery } from 'react-query';
import { MonthlySettlement } from '../types/monthlySettlement';

const fetchMonthlySettlements = async (
  pgCompanyId: string,
  month: string
): Promise<MonthlySettlement[]> => {
  const { data } = await axios.get(
    `http://localhost:8080/v1/monthly-settlements/${pgCompanyId}/${month}`
  );
  return data;
};

export const useMonthlySettlements = (
  pgCompanyId: string,
  month: string
) => {
  return useQuery(
    ['monthlySettlements', pgCompanyId, month],
    () => fetchMonthlySettlements(pgCompanyId, month)
  );
};
