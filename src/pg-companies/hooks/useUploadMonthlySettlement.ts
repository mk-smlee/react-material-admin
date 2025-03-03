import { useMutation } from 'react-query';
import { apiService } from '../../api';

export const useUploadMonthlySettlement = (id: string) => {
  return useMutation((formData: FormData) =>
    apiService.post(`/raw-settlement-files/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  );
};
