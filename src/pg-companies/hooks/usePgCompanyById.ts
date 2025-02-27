import { useQuery } from "react-query";
import { PgCompany } from "../types/pgCompany";
import api from "../../api";

const fetchPgCompanyById = async (id: string): Promise<PgCompany> => {
  const { data } = await api.get(`/pg-companies/${id}`);
  return data;
};

export function usePgCompanyById(id: string) {
  return useQuery(["pgCompanyById", id], () => fetchPgCompanyById(id));
}
