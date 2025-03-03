import { useQuery } from 'react-query';
import { AgencyPenaltyItem } from '../types/penaltySales';
import { apiService } from '../../api';

/**
 * 특정 월(yyyy-MM)에 대한 매출 약정 패널티 정보를 조회
 * @param yearMonth ex) '2023-02'
 */
async function fetchPenaltySales(
  yearMonth: string,
): Promise<AgencyPenaltyItem[]> {
  const data = await apiService.get<AgencyPenaltyItem[]>(
    `/monthly-snapshot-penalty-sales/monthly/${yearMonth}`,
  );
  return data;
}

export function usePenaltySales(yearMonth: string) {
  return useQuery(
    ['penaltySales', yearMonth],
    () => fetchPenaltySales(yearMonth),
    {
      enabled: Boolean(yearMonth), // yearMonth가 유효할 때만 fetch
    },
  );
}
