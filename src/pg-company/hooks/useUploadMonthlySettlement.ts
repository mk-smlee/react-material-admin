import axios from 'axios';
import { useMutation } from 'react-query';

export const useUploadMonthlySettlement = (id: string) => {
  return useMutation((formData: FormData) =>
    axios.post(`http://localhost:8080/v1/raw-settlement-files/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  );
};
