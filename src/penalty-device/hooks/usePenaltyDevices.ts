import { useQuery } from 'react-query';
import { apiService } from '../../api';
import { PenaltyDevice } from '../types/penalty-device';

async function fetchPenaltyDevices(): Promise<PenaltyDevice[]> {
  return apiService.get<PenaltyDevice[]>('/penalty-device');
}

export function usePenaltyDevices() {
  return useQuery('penaltyDevices', fetchPenaltyDevices);
}
