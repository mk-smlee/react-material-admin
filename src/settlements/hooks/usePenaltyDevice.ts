import { useQuery } from 'react-query';
import { AgencyDeviceItem } from '../types/penaltyDevice';
import { apiService } from '../../api';

/**
 * 특정 월(yyyy-MM)에 대한 기기약정 패널티 정보를 조회
 * @param yearMonth 예) '2023-02'
 */
async function fetchPenaltyDevice(yearMonth: string): Promise<AgencyDeviceItem[]> {
  const data = await apiService.get<AgencyDeviceItem[]>(
    `/monthly-settlements/device-penalty/${yearMonth}`,
  );
  return data;
}

export function usePenaltyDevice(yearMonth: string) {
  return useQuery(
    ['penaltyDevice', yearMonth],
    () => fetchPenaltyDevice(yearMonth),
    {
      enabled: Boolean(yearMonth),
    },
  );
}
