import {
  SettlementUser,
} from '../../settlement-users/types/user';

export interface AuthUser extends Omit<SettlementUser, 'password'> {}

export interface AuthState {
  accessToken?: string;
  user?: AuthUser;
  authInitialized: boolean;
}
