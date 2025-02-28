import { useMutation } from 'react-query';
import api from '../../api';

export const useUploadMonthlySettlement = (id: string) => {
  return useMutation((formData: FormData) =>
    api.post(`/raw-settlement-files/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  );
};
