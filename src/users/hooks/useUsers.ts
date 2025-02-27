import { useQuery } from "react-query";
import { User } from "../types/user";
import api from "../../api";

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/api/users");
  return data;
};

export function useUsers() {
  return useQuery("users", () => fetchUsers());
}
