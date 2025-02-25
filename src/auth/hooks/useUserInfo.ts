// import axios from 'axios';
import { useQuery } from 'react-query';
import { UserInfo } from '../types/userInfo';

const fetchUserInfo = async (key?: string): Promise<UserInfo> => {
  // const { data } = await axios.get("/api/user-info", { params: { key } });
  // return data;
  return {
    id: '1',
    avatar: '',
    email: 'john@smith.com',
    firstName: 'John',
    lastName: 'Smith',
  };
};

export function useUserInfo(key?: string) {
  return useQuery(['user-info', key], () => fetchUserInfo(key), {
    enabled: !!key,
  });
}
