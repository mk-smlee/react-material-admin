import { ContractListItem } from "../../contracts/types/contract";

export interface PenaltyDevice {
  penaltyDeviceId: string;
  contractId: string;
  windowCount: number;
  androidCount: number;
  posCount: number;
  contractAmount: number;
  monthlyPenaltyRate: number;
  remarks?: string;
  createdAt: Date;
  contract: ContractListItem
}

export interface CreatePenaltyDevicePayload {
  contractId: string;
  windowCount: number;
  androidCount: number;
  posCount: number;
  contractAmount: number;
  monthlyPenaltyRate: number;
  remarks?: string;
}

export interface UpdatePenaltyDevicePayload {
  windowCount?: number;
  androidCount?: number;
  posCount?: number;
  contractAmount?: number;
  monthlyPenaltyRate?: number;
  remarks?: string;
}

// 실제로 테이블, 상세 페이지 등에 보일 라벨들
export const PENALTY_DEVICE_FIELD_LABELS: Record<string, string> = {
  contractMerchantName: '가맹점명',
  mid: 'MID',
  windowCount: '윈도우 단말 수',
  androidCount: '안드로이드 단말 수',
  posCount: 'POS 단말 수',
  contractAmount: '약정 금액',
  monthlyPenaltyRate: '월 패널티율',
  remarks: '비고',
  createdAt: '생성 일시',
};
