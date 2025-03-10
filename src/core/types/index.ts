import { SettlementUser } from "../../settlement-users/types/user";

export type headerCellType = {
  id: string;
  label: string;
  align?: 'center' | 'left' | 'right';
  isPercentage?: boolean;
};

export interface auditLog {
  auditLogId: string;
  entityName: string;
  entityId: string; // 계약ID
  fieldName: string; // 변경된 필드 이름
  oldValue: string;
  newValue: string;
  changedAt: string; // 수정 일시
  changedByUser: SettlementUser;
}