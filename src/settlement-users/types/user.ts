export interface SettlementUser {
  settlementUserId: string;
  email: string;
  password: string;
  name: string;
  status: SettlementUserStatus;
  role: SettlementUserRole;
  createdAt: string;
}

export enum SettlementUserRole {
  ADMIN = 1,
  USER = 2,
}

export enum SettlementUserStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export interface CreateUserPayload
  extends Omit<SettlementUser, 'settlementUserId' | 'createdAt'> {}

export interface UpdateUserPayload
  extends Partial<Omit<SettlementUser, 'settlementUserId' | 'createdAt'>> {}
