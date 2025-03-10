import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import { UpdatePenaltyDevicePayload, PenaltyDevice } from '../types/penalty-device';

async function updatePenaltyDevice(
  penaltyDeviceId: string,
  payload: UpdatePenaltyDevicePayload,
): Promise<PenaltyDevice> {
  return apiService.put<PenaltyDevice>(`/penalty-device/${penaltyDeviceId}`, payload);
}

export function useUpdatePenaltyDevice(penaltyDeviceId: string) {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: UpdatePenaltyDevicePayload) => updatePenaltyDevice(penaltyDeviceId, payload),
    {
      onSuccess: () => {
        // 수정 후 리스트 및 상세 캐시 무효화
        queryClient.invalidateQueries('penaltyDevices');
        queryClient.invalidateQueries(['penaltyDeviceById', penaltyDeviceId]);
      },
    },
  );
}
