import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../../core/hooks/useLocalStorage';
// import { useLogin } from "../hooks/useLogin";
// import { useUserInfo } from "../hooks/useUserInfo";
import { UserInfo } from '../types/userInfo';
import { useUserInfo } from '../hooks/useUserInfo';
// import { useLogin } from '../hooks/useLogin';

interface AuthContextInterface {
  isLoggingIn: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  userInfo?: UserInfo;
}

export const AuthContext = createContext({} as AuthContextInterface);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authKey, setAuthKey] = useLocalStorage<string>("authkey", "");
  // const { isLoggingIn, login } = useLogin();
  const isLoggingIn = false; //로그인 없애기 위한 임시코드
  const { data: userInfo } = useUserInfo(authKey);

  const handleLogin = async (email: string, password: string) => {
    // return login({ email, password })
    //   .then((key: string) => {
    //     setAuthKey(key);
    //     return key;
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
    setAuthKey('authkey');
    return 'authkey'; //로그인 없애기 위한 임시코드
  };

  const handleLogout = async () => {
    return setAuthKey('authkey');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggingIn,
        login: handleLogin,
        logout: handleLogout,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
