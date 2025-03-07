import { useMutation, useQueryClient } from 'react-query';
import { apiService } from '../../api';
import { UpdateMerchantPayload, MerchantDetailItem } from '../types/merchant';

async function updateMerchant(merchantId: string, payload: UpdateMerchantPayload) {
  return apiService.put<MerchantDetailItem>(`/merchants/${merchantId}`, payload);
}

export function useUpdateMerchant(merchantId: string) {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: UpdateMerchantPayload) => updateMerchant(merchantId, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('merchants');
        queryClient.invalidateQueries(['merchantById', merchantId]);
      },
    },
  );
}
