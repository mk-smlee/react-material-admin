import { useMutation } from "react-query";
import api from "../../api";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> => {
  const { data } = await api.post("/api/login", { email, password });
  return data;
};

export function useLogin() {
  const { isLoading, mutateAsync } = useMutation(login);

  return { isLoggingIn: isLoading, login: mutateAsync };
}
