import { apiService } from "../../api";
import { useQuery } from "react-query";
import { Agency } from "../types/agencies";

async function fetchAgencies(): Promise<Agency[]> {
  return apiService.get<Agency[]>('/agencies');
}

export function useAgencies() {
  return useQuery('agencies', fetchAgencies);
}