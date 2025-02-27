import axios from 'axios';
import { useMutation } from 'react-query';

export const useUploadMonthlySettlement = (id: string) => {
  return useMutation((formData: FormData) =>
    axios.post(`/raw-settlement-files/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  );
};
