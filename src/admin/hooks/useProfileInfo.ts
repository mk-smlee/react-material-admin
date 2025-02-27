import { useQuery } from "react-query";
import { ProfileInfo } from "../types/profileInfo";
import api from "../../api";

const fetchProfileInfo = async (): Promise<ProfileInfo> => {
  const { data } = await api.get("/api/profile-info");
  return data;
};

export function useProfileInfo() {
  return useQuery("profile-info", () => fetchProfileInfo());
}
