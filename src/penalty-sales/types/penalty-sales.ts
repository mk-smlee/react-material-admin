import { AgencyDetailItem } from '../../agencies/types/agency';

export interface PenaltySales {
  penaltySalesId: string;
  agencyId: string;
  monthlyCommittedSales: number;
  monthlyPenaltyRate: number;
  remarks?: string;
  createdAt: Date;
  agency: AgencyDetailItem;
}

export interface CreatePenaltySalesPayload {
  agencyId: string;
  monthlyCommittedSales: number;
  monthlyPenaltyRate: number;
  remarks?: string;
}

export interface UpdatePenaltySalesPayload {
  monthlyCommittedSales?: number;
  monthlyPenaltyRate?: number;
  remarks?: string;
}

export const PENALTY_SALES_FIELD_LABELS: Record<string, string> = {
  agencyName: '대리점명',
  monthlyCommittedSales: '월 약정 매출',
  monthlyPenaltyRate: '월 패널티 율',
  remarks: '비고',
  createdAt: '생성 일시',
};
