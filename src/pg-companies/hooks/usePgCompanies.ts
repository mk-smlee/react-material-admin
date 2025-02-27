import { useQuery } from "react-query";
import { PgCompany } from "../types/pgCompany";
import api from "../../api";

const fetchPgCompanies = async (): Promise<PgCompany[]> => {
  const { data } = await api.get("/pg-companies");
  return data;
};

export function usePgCompanies() {
  return useQuery("pgCompanies", () => fetchPgCompanies());
}
