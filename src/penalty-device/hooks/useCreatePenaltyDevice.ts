import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import { CreatePenaltyDevicePayload, PenaltyDevice } from '../types/penalty-device';

async function createPenaltyDevice(payload: CreatePenaltyDevicePayload): Promise<PenaltyDevice> {
  return apiService.post<PenaltyDevice>('/penalty-device', payload);
}

export function useCreatePenaltyDevice() {
  const queryClient = useQueryClient();

  return useMutation(createPenaltyDevice, {
    onSuccess: () => {
      // 생성 후 리스트를 갱신
      queryClient.invalidateQueries('penaltyDevices');
    },
  });
}
