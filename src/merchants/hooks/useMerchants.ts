import { useQuery } from "react-query";
import { apiService } from "../../api";
import { Merchant } from "../types/merchants";

async function fetchMerchants(): Promise<Merchant[]> {
  return apiService.get<Merchant[]>('/merchants');
}

export function useMerchants() {
  return useQuery('merchants', fetchMerchants);
}
