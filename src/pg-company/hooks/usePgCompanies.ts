import axios from "axios";
import { useQuery } from "react-query";
import { PgCompany } from "../types/pgCompany";

const fetchPgCompanies = async (): Promise<PgCompany[]> => {
  const { data } = await axios.get("http://localhost:8080/v1/pg-companies");
  return data;
};

export function usePgCompanies() {
  return useQuery("pgCompanies", () => fetchPgCompanies());
}
