import { useQuery } from 'react-query';
import { MonthlySettlement } from '../types/monthlySettlement';
import { apiService } from '../../api';

const fetchMonthlySettlements = async (
  pgCompanyId: string,
  month: string
): Promise<MonthlySettlement[]> => {
  const data = await apiService.get<MonthlySettlement[]>(
    `/monthly-settlements/pg-settlement/${pgCompanyId}/${month}`
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
