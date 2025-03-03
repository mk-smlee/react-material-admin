import { useQuery } from 'react-query';
import { AgencyCommissionItem } from '../types/agencyCommission';
import { apiService } from '../../api';

/**
 * 특정 월(yyyy-MM)에 대한 대리점 수수료 정산 정보를 조회
 * @param month 예: '2023-02'
 */
async function fetchAgencyCommission(month: string): Promise<AgencyCommissionItem[]> {
  const data = await apiService.get<AgencyCommissionItem[]>(
    `/monthly-settlements/agency-commission/${month}`,
  );
  return data;
}

export function useAgencyCommission(month: string) {
  return useQuery(['agencyCommission', month], () => fetchAgencyCommission(month), {
    enabled: Boolean(month),
  });
}
