import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { PenaltyDevice } from '../types/penalty-device';

async function fetchPenaltyDeviceById(penaltyDeviceId: string): Promise<PenaltyDevice> {
  return apiService.get<PenaltyDevice>(`/penalty-device/${penaltyDeviceId}`);
}

export function usePenaltyDeviceById(penaltyDeviceId: string) {
  return useQuery(['penaltyDeviceById', penaltyDeviceId], () =>
    fetchPenaltyDeviceById(penaltyDeviceId),
  );
}
