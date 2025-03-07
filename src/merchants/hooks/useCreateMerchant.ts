import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import { CreateMerchantPayload, MerchantDetailItem } from '../types/merchant';

async function createMerchant(
  payload: CreateMerchantPayload,
): Promise<MerchantDetailItem> {
  return apiService.post<MerchantDetailItem>('/merchants', payload);
}

export function useCreateMerchant() {
  const queryClient = useQueryClient();

  return useMutation(createMerchant, {
    onSuccess: () => {
      // 생성 성공 시 리스트 invalidate
      queryClient.invalidateQueries('merchants');
    },
  });
}
