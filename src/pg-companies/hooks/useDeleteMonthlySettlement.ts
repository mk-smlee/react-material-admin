import { useMutation } from 'react-query';
import { apiService } from '../../api';

export const useDeleteMonthlySettlement = (
  id: string,
  monthToDelete: string,
) => {
  return useMutation(() =>
    apiService.delete(`/raw-settlement-files/${id}/${monthToDelete}`),
  );
};
