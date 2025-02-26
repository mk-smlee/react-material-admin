import axios from 'axios';
import { useQuery } from 'react-query';
import { AgencyDeviceItem } from '../types/penaltyDevice';

/**
 * 특정 월(yyyy-MM)에 대한 기기약정 패널티 정보를 조회
 * @param yearMonth 예) '2023-02'
 */
async function fetchPenaltyDevice(yearMonth: string): Promise<AgencyDeviceItem[]> {
  const { data } = await axios.get(
    `http://localhost:8080/v1/penalty-device/monthly/${yearMonth}`,
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
