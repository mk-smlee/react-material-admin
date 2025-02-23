import axios from "axios";
import { useQuery } from "react-query";
import { PgCompany } from "../types/pgCompany";

const fetchPgCompanyById = async (id: string): Promise<PgCompany> => {
  const { data } = await axios.get(`http://localhost:8080/v1/pg-companies/${id}`);
  return data;
};

export function usePgCompanyById(id: string) {
  return useQuery(["pgCompanyById", id], () => fetchPgCompanyById(id));
}
